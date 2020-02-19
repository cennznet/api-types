// Copyright 2017-2019 @polkadot/api authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import {Compact, Option, Struct, u8} from '@polkadot/types';
import {
  Address,
  Balance,
  BlockNumber,
  Call,
  ExtrinsicEra,
  Hash,
  RuntimeVersion,
} from '@polkadot/types/interfaces';
import {
  Codec,
  Constructor,
  ISignerPayload,
  SignerPayloadJSON as SignerPayloadJSONBase,
  SignerPayloadRaw,
} from '@polkadot/types/types';
import {u8aToHex} from '@polkadot/util';

import {Index} from '../types';
import Doughnut from '../Doughnut';
import {ChargeTransactionPayment} from '../runtime/transaction-payment';
import CENNZnetExtrinsicPayloadV1 from './v1/ExtrinsicPayload';

export interface SignerPayloadType extends Struct {
  address: Address;
  blockHash: Hash;
  blockNumber: BlockNumber;
  doughnut: Option<Doughnut>;
  era: ExtrinsicEra;
  genesisHash: Hash;
  method: Call;
  nonce: Compact<Index>;
  runtimeVersion: RuntimeVersion;
  tip: Compact<Balance>;
  version: u8;
  transactionPayment: ChargeTransactionPayment;
}

export interface SignerPayloadJSON extends SignerPayloadJSONBase {
  doughnut?: string;
  transactionPayment?: string;
}

// We explicitly cast the type here to get the actual TypeScript exports right
// We can ignore the properties, added via Struct.with
export const _Payload: Constructor<SignerPayloadType> = Struct.with({
  address: 'Address',
  blockHash: 'Hash',
  blockNumber: 'BlockNumber',
  doughnut: Option.with(Doughnut),
  era: 'ExtrinsicEra',
  genesisHash: 'Hash',
  method: 'Call',
  nonce: 'Compact<Index>',
  runtimeVersion: 'RuntimeVersion',
  tip: 'Compact<Balance>',
  version: 'u8',
  transactionPayment: 'ChargeTransactionPayment',
}) as any;

export default class SignerPayload extends _Payload implements ISignerPayload {
  /**
   * @description Creates an representation of the structure as an ISignerPayload JSON
   */
  toPayload(): SignerPayloadJSON {
    const {
      address,
      blockHash,
      blockNumber,
      doughnut,
      era,
      genesisHash,
      method,
      nonce,
      runtimeVersion: {specVersion},
      tip,
      version,
      transactionPayment,
    } = this;
    const ret: SignerPayloadJSON = {
      address: address.toString(),
      blockHash: blockHash.toHex(),
      blockNumber: blockNumber.toHex(),
      era: era.toHex(),
      genesisHash: genesisHash.toHex(),
      method: method.toHex(),
      nonce: nonce.toHex(),
      specVersion: specVersion.toHex(),
      tip: tip.toHex(),
      version: version.toNumber(),
      transactionPayment: transactionPayment.toHex(),
    };
    if (doughnut.isSome) {
      ret.doughnut = doughnut.unwrap().toHex();
    }
    return ret;
  }

  /**
   * @description Creates a representation of the payload in raw Exrinsic form
   */
  toRaw(): SignerPayloadRaw {
    const payload = this.toPayload();
    // const registry = new TypeRegistry();
    // NOTE Explicitly pass the bare flag so the method is encoded un-prefixed (non-decodable, for signing only)
    const data = u8aToHex(
      new CENNZnetExtrinsicPayloadV1(this.registry, payload, {version: payload.version}).toU8a({method: true})
    );

    return {
      address: payload.address,
      data,
      type: 'payload',
    };
  }

  toArray(): Codec[] {
    return super.toArray();
  }
}
