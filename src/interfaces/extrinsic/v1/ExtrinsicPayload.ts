// Copyright 2017-2020 @polkadot/types authors & contributors & Centrality Investments Limited 2020
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Bytes, Compact, Option, Struct, u32 } from '@polkadot/types';
import { Balance, ExtrinsicEra, Hash } from '@polkadot/types/interfaces';
import { sign } from '@polkadot/types/extrinsic/util';
import { IKeyringPair, Registry } from '@polkadot/types/types';

import { ExtrinsicPayloadValue } from '../types';
import { ChargeTransactionPayment, Doughnut, Index } from  '../../types';


// TODO: Load [[Extra]] from metadata e.g.:
// ...registry.getSignedExtensionTypes(),
// ...registry.getSignedExtensionExtra()

// The extended extrinsic payload types
export const Extra: Record<string, InterfaceTypes> = {
  method: 'Bytes',
  doughnut: 'Option<Doughnut>',
  era: 'ExtrinsicEra',
  nonce: 'Compact<Index>',
  transactionPayment: 'ChargeTransactionPayment',
  // These fields are signed here as part of the extrinsic signature but are NOT encoded in
  // the final extrinsic payload itself.
  // The CENNZnet node will populate these fields from on-chain data and check the signature compares
  specVersion: 'u32',
  genesisHash: 'Hash',
  blockHash: 'Hash',
};

/**
 * @name CENNZnetExtrinsicPayloadV1
 * @description
 * A signing payload for an [[Extrinsic]]. For the final encoding, it is variable length based
 * on the contents included
 */
export default class CENNZnetExtrinsicPayloadV1 extends Struct {
  constructor (registry: Registry, value?: ExtrinsicPayloadValue | Uint8Array | string) {
    super(registry, {
      method: 'Bytes',
      ...Extra
    }, value);
  }

  /**
   * @description The block [[Hash]] the signature applies to (mortal/immortal)
   */
  public get blockHash (): Hash {
    return this.get('blockHash') as Hash;
  }

  /**
   * @description The [[ExtrinsicEra]]
   */
  public get era (): ExtrinsicEra {
    return this.get('era') as ExtrinsicEra;
  }

  /**
   * @description The genesis [[Hash]] the signature applies to (mortal/immortal)
   */
  public get genesisHash (): Hash {
    return this.get('genesisHash') as Hash;
  }

  /**
   * @description The [[Bytes]] contained in the payload
   */
  public get method (): Bytes {
    return this.get('method') as Bytes;
  }

  /**
   * @description The [[Index]]
   */
  public get nonce (): Compact<Index> {
    return this.get('nonce') as Compact<Index>;
  }

  /**
   * @description The specVersion for this signature
   */
  public get specVersion (): u32 {
    return this.get('specVersion') as u32;
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
  
  /**
   * @description Sign the payload with the keypair
   */
  public sign (signerPair: IKeyringPair): Uint8Array {
    // NOTE The `toU8a({ method: true })` argument is absolutely critical - we don't want the method (Bytes)
    // to have the length prefix included. This means that the data-as-signed is un-decodable,
    // but is also doesn't need the extra information, only the pure data (and is not decoded)
    // ... The same applies to V1..V3, if we have a V5, carry move this comment to latest
    return sign(this.registry, signerPair, this.toU8a({ method: true }), { withType: true });
  }
}
