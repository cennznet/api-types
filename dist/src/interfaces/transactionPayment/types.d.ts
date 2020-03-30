import { Compact, Enum, Option, Struct } from '@polkadot/types/codec';
import { AssetId, Balance } from '@polkadot/types/interfaces/runtime';
/** @name ChargeTransactionPayment */
export interface ChargeTransactionPayment extends Struct {
    readonly tip: Compact<Balance>;
    readonly feeExchange: Option<FeeExchange>;
}
/** @name FeeExchange */
export interface FeeExchange extends Enum {
    readonly isFeeExchangeV1: boolean;
    readonly asFeeExchangeV1: FeeExchangeV1;
}
/** @name FeeExchangeV1 */
export interface FeeExchangeV1 extends Struct {
    readonly assetId: Compact<AssetId>;
    readonly maxPayment: Compact<Balance>;
}
export declare type PHANTOM_TRANSACTIONPAYMENT = 'transactionPayment';
