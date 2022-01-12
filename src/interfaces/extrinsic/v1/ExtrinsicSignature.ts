// Copyright 2019-2020 Centrality Investments Limited
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {
  Address,
  Balance,
  Call,
  EcdsaSignature,
  Ed25519Signature,
  ExtrinsicEra,
  ExtrinsicSignature,
  Index,
  MultiSignature,
  Sr25519Signature,
} from '@polkadot/types/interfaces';
import { Compact, Struct } from '@polkadot/types';
import { ExtrinsicPayloadValue, IExtrinsicSignature, IKeyringPair, Registry } from '@polkadot/types/types';
import { EMPTY_U8A, IMMORTAL_ERA } from '@polkadot/types/extrinsic/constants';
import { assert, isU8a, isUndefined, objectProperties, objectSpread, stringify, u8aConcat, u8aToHex } from '@polkadot/util';

import { ExtrinsicSignatureOptions } from '@polkadot/types/extrinsic/types';
import { expandExtensionTypes, defaultExtensions } from '../signedExtensions';
import { ChargeTransactionPayment } from '../../transactionPayment';
import { SignatureOptions } from '../types';
import ExtrinsicPayloadV4 from './ExtrinsicPayload';
import { CodecRegistry } from '@polkadot/types-codec/types';
import { HexString } from '@polkadot/util/types';

// Ensure we have enough data for all types of signatures
const FAKE_SIGNATURE = new Uint8Array(256).fill(1);

function toAddress (registry: CodecRegistry, address: Address | Uint8Array | string): Address {
  return registry.createTypeUnsafe('Address', [isU8a(address) ? u8aToHex(address) : address]);
}

/**
 * @name CENNZnetExtrinsicSignatureV1
 * @description
 * A container for the [[Signature]] associated with a specific [[Extrinsic]]
 */
export default class CENNZnetExtrinsicSignatureV1 extends Struct implements IExtrinsicSignature {
  #signKeys: string[];

  constructor(
    registry: CodecRegistry,
    value: CENNZnetExtrinsicSignatureV1 | Uint8Array | undefined,
    { isSigned }: ExtrinsicSignatureOptions = {}
  ) {
    super(
      registry,
      objectSpread(
        { signer: 'Address', signature: 'ExtrinsicSignature' },
        registry.getSignedExtensionTypes(),
      ),
      CENNZnetExtrinsicSignatureV1.decodeExtrinsicSignature(value, isSigned)
    );

    this.#signKeys = Object.keys(registry.getSignedExtensionTypes());

    objectProperties(this, this.#signKeys, (k) => this.get(k));
  }

  /** @internal */
  static decodeExtrinsicSignature(
    value: CENNZnetExtrinsicSignatureV1 | Uint8Array | undefined,
    isSigned = false
  ): CENNZnetExtrinsicSignatureV1 | Uint8Array {
    if (!value) {
      return EMPTY_U8A;
    } else if (value instanceof CENNZnetExtrinsicSignatureV1) {
      return value;
    }

    return isSigned ? value : EMPTY_U8A;
  }

  /**
   * @description The length of the value when encoded as a Uint8Array
   */
  public get encodedLength(): number {
    return this.isSigned ? super.encodedLength : 0;
  }

  /**
   * @description `true` if the signature is valid
   */
  public get isSigned(): boolean {
    return !this.signature.isEmpty;
  }

  public override get registry (): Registry {
    return super.registry as Registry;
  }

  /**
   * @description The [[ExtrinsicEra]] (mortal or immortal) this signature applies to
   */
  public get era(): ExtrinsicEra {
    return this.get('era') as ExtrinsicEra;
  }

  /**
   * @description The [[Index]] for the signature
   */
  public get nonce(): Compact<Index> {
    return this.get('nonce') as Compact<Index>;
  }

  /**
   * @description The actual [[EcdsaSignature]], [[Ed25519Signature]] or [[Sr25519Signature]]
   */
  public get signature(): EcdsaSignature | Ed25519Signature | Sr25519Signature {
    return (this.multiSignature.value ||  this.multiSignature) as Sr25519Signature;
  }

  /**
   * @description The [[Address]] that signed
   */
  public get signer(): Address {
    return this.getT('signer');
  }

  /**
   * @description tip [[Balance]] (here for compatibility with [[IExtrinsic]] definition)
   */
  public get tip(): Compact<Balance> {
    return this.transactionPayment.tip as Compact<Balance>;
  }

  /**
   * @description The transaction fee metadata e.g tip, fee exchange
   */
  public get transactionPayment(): ChargeTransactionPayment {
    return this.get('transactionPayment') as ChargeTransactionPayment;
  }

  protected _injectSignature(
    signer: Address,
    signature: MultiSignature,
    payload: ExtrinsicPayloadV4
  ): IExtrinsicSignature {

    // use the fields exposed to guide the getters
    for (let i = 0; i < this.#signKeys.length; i++) {
      const k = this.#signKeys[i];
      const v = payload.get(k);

      if (!isUndefined(v)) {
        this.set(k, v);
      }
    }

    // additional fields (exposed in struct itself)
    this.set('signer', signer);
    this.set('signature', signature);

    return this;
  }

  /**
  * @description The raw [[ExtrinsicSignature]]
  */
  public get multiSignature (): ExtrinsicSignature {
    return this.getT('signature');
  }

  /**
   * @description Adds a raw signature
   */
   public addSignature (signer: Address | Uint8Array | string, signature: Uint8Array | HexString, payload: ExtrinsicPayloadValue | Uint8Array | HexString): IExtrinsicSignature {
    return this._injectSignature(
      toAddress(this.registry, signer),
      this.registry.createTypeUnsafe('ExtrinsicSignature', [signature]),
      new ExtrinsicPayloadV4(this.registry, payload)
    );
  }

  /**
   * @description Creates a payload from the supplied options
   */
  createPayload(
    method: Call,
    {
      blockHash,
      era,
      genesisHash,
      nonce,
      runtimeVersion: { specVersion, transactionVersion },
      transactionPayment,
    }: SignatureOptions
  ): ExtrinsicPayloadV4 {
    return new ExtrinsicPayloadV4(this.registry, {
      blockHash,
      era: era || IMMORTAL_ERA,
      genesisHash,
      method: method.toHex(),
      nonce,
      specVersion,
      // [[tip]] is now set inside [[transactionPayment]]
      // This doesn't do anything, just signalling our intention not to use it.
      //@ts-ignore
      tip: null,
      transactionVersion: transactionVersion || 0,
      transactionPayment,
    });
  }

  /**
   * @description Generate a payload and applies the signature from a keypair
   */
  sign(method: Call, account: IKeyringPair, options: SignatureOptions): IExtrinsicSignature {
    assert(account && account.addressRaw, () => `Expected a valid keypair for signing, found ${stringify(account)}`);

    const payload = this.createPayload(method, options);
    console.log(payload);

    return this._injectSignature(
      toAddress(this.registry, account.addressRaw),
      this.registry.createTypeUnsafe('ExtrinsicSignature', [payload.sign(account)]),
      payload
    );
  }

  /**
   * @description Generate a payload and applies a fake signature
   */
   public signFake (method: Call, address: Address | Uint8Array | string, options: SignatureOptions): IExtrinsicSignature {
    assert(address, () => `Expected a valid address for signing, found ${stringify(address)}`);

    const payload = this.createPayload(method, options);

    return this._injectSignature(
      toAddress(this.registry, address),
      this.registry.createTypeUnsafe('ExtrinsicSignature', [FAKE_SIGNATURE]),
      payload
    );
  }

  /**
   * @description Encodes the value as a Uint8Array as per the SCALE specifications
   * @param isBare true when the value has none of the type-specific prefixes (internal)
   */
  toU8a(isBare?: boolean): Uint8Array {
    return this.isSigned ? super.toU8a(isBare) : EMPTY_U8A;
  }
}
