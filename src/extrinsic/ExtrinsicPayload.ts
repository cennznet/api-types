// Copyright 2017-2020 @polkadot/types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Balance, ExtrinsicPayloadV3, Hash } from '@polkadot/types/interfaces/runtime';
import { BareOpts, IKeyringPair, InterfaceTypes, Registry } from '@polkadot/types/types';

import { u8aToHex } from '@polkadot/util';

import { createType } from '@polkadot/types/codec/create';
import Base from '@polkadot/types/codec/Base';
import Compact from '@polkadot/types/codec/Compact';
import Option from '@polkadot/types/codec/Option';
import Raw from '@polkadot/types/codec/Raw';
import u32 from '@polkadot/types/primitive/U32';
import ExtrinsicEra from '@polkadot/types/primitive/Extrinsic/ExtrinsicEra';
import { DEFAULT_VERSION } from './constants';

import ExtrinsicPayloadV4 from './v2/ExtrinsicPayload';
import { ExtrinsicPayloadValue } from './types';
import Doughnut from '../Doughnut';
import { ChargeTransactionPayment, Index } from '../runtime';

interface ExtrinsicPayloadOptions {
  version?: number;
}

// all our known types that can be returned
type ExtrinsicPayloadVx = ExtrinsicPayloadV4;

const VERSIONS: InterfaceTypes[] = [
  'ExtrinsicPayloadV4'
];

/**
 * @name GenericExtrinsicPayload
 * @description
 * A signing payload for an [[Extrinsic]]. For the final encoding, it is variable length based
 * on the contents included
 */
export default class ExtrinsicPayload extends Base<ExtrinsicPayloadVx> {
  constructor (registry: Registry, value: Partial<ExtrinsicPayloadValue> | Uint8Array | string | undefined, { version }: ExtrinsicPayloadOptions = {}) {
    super(registry, ExtrinsicPayload.decodeExtrinsicPayload(registry, value as ExtrinsicPayloadValue, version));
  }

  /** @internal */
  public static decodeExtrinsicPayload (registry: Registry, value: ExtrinsicPayload | ExtrinsicPayloadValue | Uint8Array | string | undefined, version: number = DEFAULT_VERSION): ExtrinsicPayloadVx {
    if (value instanceof ExtrinsicPayload) {
      return value.raw;
    }

    return createType(registry, VERSIONS[version] || VERSIONS[0], value, { version }) as ExtrinsicPayloadVx;
  }

  /**
   * @description The block [[Hash]] the signature applies to (mortal/immortal)
   */
  public get blockHash (): Hash {
    return this.raw.blockHash;
  }

  /**
   * @description The [[ExtrinsicEra]]
   */
  public get era (): ExtrinsicEra {
    return this.raw.era;
  }

  /**
   * @description The genesis block [[Hash]] the signature applies to
   */
  public get genesisHash (): Hash {
    // NOTE only v3+
    return (this.raw as ExtrinsicPayloadV4).genesisHash || createType(this.registry, 'Hash');
  }

  /**
   * @description The [[Raw]] contained in the payload
   */
  public get method (): Raw {
    return this.raw.method;
  }

  /**
   * @description The [[Index]]
   */
  public get nonce (): Compact<Index> {
    return this.raw.nonce;
  }

  /**
   * @description The specVersion as a [[u32]] for this payload
   */
  public get specVersion (): u32 {
    // NOTE only v3+
    return (this.raw as ExtrinsicPayloadV4).specVersion || createType(this.registry, 'u32');
  }

  /**
   * @description The [[Balance]]
   */
  public get tip (): Compact<Balance> {
    // NOTE from v2+
    return (this.raw as ExtrinsicPayloadV4).tip || createType(this.registry, 'Compact<Balance>');
  }

  /**
   * @description The fee payment metadata (includes. tip)
   */
  public get transactionPayment (): ChargeTransactionPayment {
    return (this.raw as ExtrinsicPayloadV4).transactionPayment;
  }

  public get doughnut (): Option<Doughnut> {
    return (this.raw as ExtrinsicPayloadV4).doughnut
  }

  /**
   * @description Compares the value of the input to see if there is a match
   */
  public eq (other?: any): boolean {
    return this.raw.eq(other);
  }

  /**
   * @description Sign the payload with the keypair
   */
  public sign (signerPair: IKeyringPair): { signature: string } {
    const signature = this.raw.sign(signerPair);

    // This is extensible, so we could quite readily extend to send back extra
    // information, such as for instance the payload, i.e. `payload: this.toHex()`
    // For the case here we sign via the extrinsic, we ignore the return, so generally
    // this is applicable for external signing
    return {
      signature: u8aToHex(signature)
    };
  }

  /**
   * @description Converts the Object to JSON, typically used for RPC transfers
   */
  public toJSON (): any {
    return this.toHex();
  }

  /**
   * @description Returns the string representation of the value
   */
  public toString (): string {
    return this.toHex();
  }

  /**
   * @description Returns a serialized u8a form
   */
  public toU8a (isBare?: BareOpts): Uint8Array {
    // call our parent, with only the method stripped
    return super.toU8a(isBare ? { method: true } : false);
  }
}
