import type { AssetId, Balance } from '@cennznet/api-types/interfaces/runtime';
import type { Struct, u128 } from '@polkadot/types-codec';
import type { ITuple } from '@polkadot/types-codec/types';
/** @name ExchangeKey */
export interface ExchangeKey extends ITuple<[AssetId, AssetId]> {
}
/** @name FeeRate */
export interface FeeRate extends u128 {
}
/** @name LiquidityPriceResponse */
export interface LiquidityPriceResponse extends Struct {
    readonly core: Balance;
    readonly asset: Balance;
}
/** @name LiquidityValueResponse */
export interface LiquidityValueResponse extends Struct {
    readonly liquidity: Balance;
    readonly core: Balance;
    readonly asset: Balance;
}
/** @name PriceResponse */
export interface PriceResponse extends Struct {
    readonly price: Balance;
}
export declare type PHANTOM_CENNZX = 'cennzx';