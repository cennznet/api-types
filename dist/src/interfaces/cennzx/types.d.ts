import { ITuple } from '@polkadot/types/types';
import { u128 } from '@polkadot/types/primitive';
import { AssetId } from '@polkadot/types/interfaces/runtime';
/** @name ExchangeKey */
export interface ExchangeKey extends ITuple<[AssetId, AssetId]> {
}
/** @name FeeRate */
export interface FeeRate extends u128 {
}
export declare type PHANTOM_CENNZX = 'cennzx';
