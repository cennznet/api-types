// Copyright 2017-2020 @polkadot/types authors & contributors & Centrality Investments Limited 2020
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Address, Balance, Call, EcdsaSignature, Ed25519Signature, ExtrinsicEra, MultiSignature, Sr25519Signature } from '@polkadot/types/interfaces';
import { IExtrinsicSignature, IKeyringPair, Registry } from '@polkadot/types/types';
import { ExtrinsicPayloadValue, ExtrinsicSignatureOptions } from '../types';

import { u8aConcat } from '@polkadot/util';

import { SignatureOptions } from '../types';
import { ChargeTransactionPayment, Index } from '../../runtime';
import Doughnut from '../../Doughnut';
import { createType } from '@polkadot/types/codec/create';
import Compact from '@polkadot/types/codec/Compact';
import Option from '@polkadot/types/codec/Option';
import Struct from '@polkadot/types/codec/Struct';
import { EMPTY_U8A, IMMORTAL_ERA } from '../constants';
import ExtrinsicPayloadV4 from './ExtrinsicPayload';

/**
 * @name GenericExtrinsicSignatureV4
 * @description
 * A container for the [[Signature]] associated with a specific [[Extrinsic]]
 */
export default class ExtrinsicSignatureV4 extends Struct implements IExtrinsicSignature {
  constructor (registry: Registry, value: ExtrinsicSignatureV4 | Uint8Array | undefined, { isSigned }: ExtrinsicSignatureOptions = {}) {
    super(registry, {
      signer: 'Address',
      signature: 'MultiSignature',
      ...registry.getSignedExtensionTypes()
    }, ExtrinsicSignatureV4.decodeExtrinsicSignature(value, isSigned));
  }

  /** @internal */
  public static decodeExtrinsicSignature (value: ExtrinsicSignatureV4 | Uint8Array | undefined, isSigned = false): ExtrinsicSignatureV4 | Uint8Array {
    if (!value) {
      return EMPTY_U8A;
    } else if (value instanceof ExtrinsicSignatureV4) {
      return value;
    }

    return isSigned
      ? value
      : EMPTY_U8A;
  }

  /**
   * @description The length of the value when encoded as a Uint8Array
   */
  public get encodedLength (): number {
    return this.isSigned
      ? super.encodedLength
      : 0;
  }

  /**
   * @description `true` if the signature is valid
   */
  public get isSigned (): boolean {
    return !this.signature.isEmpty;
  }

  /**
   * @description The [[ExtrinsicEra]] (mortal or immortal) this signature applies to
   */
  public get era (): ExtrinsicEra {
    return this.get('era') as ExtrinsicEra;
  }

  /**
   * @description The [[Index]] for the signature
   */
  public get nonce (): Compact<Index> {
    return this.get('nonce') as Compact<Index>;
  }

  /**
   * @description The actual [[EcdsaSignature]], [[Ed25519Signature]] or [[Sr25519Signature]]
   */
  public get signature (): EcdsaSignature | Ed25519Signature | Sr25519Signature {
    return this.multiSignature.value as Sr25519Signature;
  }

  /**
   * @description The raw [[MultiSignature]]
   */
  public get multiSignature (): MultiSignature {
    return this.get('signature') as MultiSignature;
  }

  /**
   * @description The [[Address]] that signed
   */
  public get signer (): Address {
    return this.get('signer') as Address;
  }

  /**
   * @description tip [[Balance]] (here for compatibility with [[IExtrinsic]] definition)
   */
  get tip(): Compact<Balance> {
    return this.transactionPayment.tip as Compact<Balance>;
  }

  /**
   * @description The transaction fee metadata e.g tip, fee exchange
   */
  get transactionPayment(): ChargeTransactionPayment {
    return this.get('transactionPayment') as ChargeTransactionPayment;
  }

  /**
   * @description The [[Doughnut]]
   */
  get doughnut(): Option<Doughnut> {
    return this.get('doughnut') as Option<Doughnut>;
  }
  

  protected injectSignature (signer: Address, signature: MultiSignature, { era, nonce, doughnut, transactionPayment }: ExtrinsicPayloadV4): IExtrinsicSignature {
    this.set('era', era);
    this.set('nonce', nonce);
    this.set('signer', signer);
    this.set('signature', signature);
    this.set('doughnut', doughnut);
    this.set('transactionPayment', transactionPayment);

    return this;
  }

  /**
   * @description Adds a raw signature
   */
  public addSignature (signer: Address | Uint8Array | string, signature: Uint8Array | string, payload: ExtrinsicPayloadValue | Uint8Array | string): IExtrinsicSignature {
    return this.injectSignature(
      createType(this.registry, 'Address', signer),
      createType(this.registry, 'MultiSignature', signature),
      new ExtrinsicPayloadV4(this.registry, payload)
    );
  }

  /**
   * @description Creates a payload from the supplied options
   */
  public createPayload (method: Call, { blockHash, era, genesisHash, nonce, runtimeVersion: { specVersion }, tip, doughnut, transactionPayment }: SignatureOptions): ExtrinsicPayloadV4 {
    return new ExtrinsicPayloadV4(this.registry, {
      blockHash,
      era: era || IMMORTAL_ERA,
      doughnut: doughnut || createType(this.registry, 'Option<Doughnut>'),
      genesisHash,
      method: method.toHex(),
      nonce,
      specVersion,
        // [[tip]] is now set inside [[transactionPayment]]
        // This doesn't do anything, just signalling our intention not to use it.
      tip: null,
      transactionPayment: transactionPayment || createType(this.registry, 'ChargeTransactionPayment')
    });
  }

  /**
   * @description Generate a payload and applies the signature from a keypair
   */
  public sign (method: Call, account: IKeyringPair, options: SignatureOptions): IExtrinsicSignature {
    const signer = createType(this.registry, 'Address', account.publicKey);
    const payload = this.createPayload(method, options);
    const signature = createType(this.registry, 'MultiSignature', payload.sign(account));

    return this.injectSignature(signer, signature, payload);
  }

  /**
   * @description Generate a payload and applies a fake signature
   */
  public signFake (method: Call, address: Address | Uint8Array | string, options: SignatureOptions): IExtrinsicSignature {
    const signer = createType(this.registry, 'Address', address);
    const payload = this.createPayload(method, options);
    const signature = createType(this.registry, 'MultiSignature', u8aConcat(new Uint8Array([1]), new Uint8Array(64).fill(0x42)));

    return this.injectSignature(signer, signature, payload);
  }

  /**
   * @description Encodes the value as a Uint8Array as per the SCALE specifications
   * @param isBare true when the value has none of the type-specific prefixes (internal)
   */
  public toU8a (isBare?: boolean): Uint8Array {
    return this.isSigned
      ? super.toU8a(isBare)
      : EMPTY_U8A;
  }
}
