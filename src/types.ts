import {AccountId, Address} from '@polkadot/types/interfaces';
import {AnyNumber} from '@polkadot/types/types';
import BN from 'bn.js';

export type AnyAddress = BN | Address | AccountId | Array<number> | Uint8Array | number | string;
export type AnyAssetId = AnyNumber;
// The CENNZnet nonce type
export {u64 as Index} from '@polkadot/types';

export {
  ExtrinsicSignatureOptions,
  SignatureOptions,
} from './extrinsic/types';
