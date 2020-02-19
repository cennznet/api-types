import { Enum, Struct } from '@polkadot/types';
import Compact from '@polkadot/types/codec/Compact';
import Option from '@polkadot/types/codec/Option';
import { AssetId, Balance } from '@polkadot/types/interfaces/runtime';
import { Registry } from '@polkadot/types/types';
export declare class FeeExchangeV1 extends Struct {
    constructor(registry: Registry, value?: any);
    get assetId(): AssetId;
    get maxPayment(): Balance;
}
export declare class FeeExchange extends Enum {
    constructor(registry: Registry, value: any);
}
/**
 * [[ChargeTransactionPayment]] allows paying a `tip` and/or specifying fee payment in another currency
 * when added to an extrinsic payload.
 */
export declare class ChargeTransactionPayment extends Struct {
    constructor(registry: Registry, value: any);
    get tip(): Compact<Balance>;
    get feeExchange(): Option<FeeExchange>;
}
