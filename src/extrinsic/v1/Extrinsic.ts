// Copyright 2017-2020 @polkadot/types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Address, Call } from '@polkadot/types/interfaces/runtime';
import { IExtrinsicImpl, IKeyringPair, Registry } from '@polkadot/types/types';
import { ExtrinsicOptions } from '@polkadot/types/primitive/Extrinsic/types';

import { isU8a } from '@polkadot/util';

import { createType, ClassOf } from '@polkadot/types/codec/create';
import Struct from '@polkadot/types/codec/Struct';

import { ExtrinsicPayloadValue, SignatureOptions } from '../types';
import CENNZnetExtrinsicSignatureV1 from './ExtrinsicSignature';

// The version # of this transaction
// It is set to `4` due to compatibility reasons with upstream server side code
// However, it is semantically CENNZNet extrinsic version `1`
export const TRANSACTION_VERSION = 4;

export interface CENNZnetExtrinsicValueV1 {
  method?: Call;
  signature?: CENNZnetExtrinsicSignatureV1;
}

/**
 * @name CENNZnetExtrinsicV1
 * @description
 * The fourth generation of compact extrinsics
 */
export default class CENNZnetExtrinsicV1 extends Struct implements IExtrinsicImpl {
  constructor (registry: Registry, value?: Uint8Array | CENNZnetExtrinsicValueV1 | Call, { isSigned }: Partial<ExtrinsicOptions> = {}) {
    super(registry, {
      signature: 'CENNZnetExtrinsicSignatureV1',
      method: 'Call'
    }, CENNZnetExtrinsicV1.decodeExtrinsic(registry, value, isSigned));
  }

  /** @internal */
  public static decodeExtrinsic (registry: Registry, value?: Call | Uint8Array | CENNZnetExtrinsicValueV1, isSigned = false): CENNZnetExtrinsicValueV1 {
    if (value instanceof CENNZnetExtrinsicV1) {
      return value;
    } else if (value instanceof ClassOf(registry, 'Call')) {
      return { method: value };
    } else if (isU8a(value)) {
      // here we decode manually since we need to pull through the version information
      const signature = new CENNZnetExtrinsicSignatureV1(registry, value, { isSigned });
      const method = createType(registry, 'Call', value.subarray(signature.encodedLength));

      return {
        method,
        signature
      };
    }

    return value || {};
  }

  /**
   * @description The length of the value when encoded as a Uint8Array
   */
  public get encodedLength (): number {
    return this.toU8a().length;
  }

  /**
   * @description The [[Call]] this extrinsic wraps
   */
  public get method (): Call {
    return this.get('method') as Call;
  }

  /**
   * @description The [[CENNZnetExtrinsicSignatureV1]]
   */
  public get signature (): CENNZnetExtrinsicSignatureV1{
    return this.get('signature') as CENNZnetExtrinsicSignatureV1;
  }

  /**
   * @description The version for the signature
   */
  public get version (): number {
    return TRANSACTION_VERSION;
  }

  /**
   * @description Add an [[CENNZnetExtrinsicSignatureV1]] to the extrinsic (already generate1)
   */
  public addSignature (signer: Address | Uint8Array | string, signature: Uint8Array | string, payload: ExtrinsicPayloadValue | Uint8Array | string): CENNZnetExtrinsicV1 {
    this.signature.addSignature(signer, signature, payload);

    return this;
  }

  /**
   * @description Sign the extrinsic with a specific keypair
   */
  public sign (account: IKeyringPair, options: SignatureOptions): CENNZnetExtrinsicV1 {
    this.signature.sign(this.method, account, options);

    return this;
  }

  /**
   * @describe Adds a fake signature to the extrinsic
   */
  public signFake (signer: Address | Uint8Array | string, options: SignatureOptions): CENNZnetExtrinsicV1 {
    this.signature.signFake(this.method, signer, options);

    return this;
  }
}
