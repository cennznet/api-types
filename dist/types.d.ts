import { AccountId, Address } from '@polkadot/types/interfaces';
import { AnyNumber } from '@polkadot/types/types';
import BN from 'bn.js';
export * from '@polkadot/types/types';
export declare type AnyAddress = BN | Address | AccountId | Array<number> | Uint8Array | number | string;
export declare type AnyAssetId = AnyNumber;
export { ExtrinsicSignatureOptions, DoughnutValue, SignatureOptions, } from './extrinsic/types';
