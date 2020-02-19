import { Option } from '@polkadot/types';
import { InterfaceRegistry } from '@polkadot/types/interfaceRegistry';
import Doughnut from './Doughnut';
import { ChargeTransactionPayment, FeeExchange } from './runtime';
import { CENNZnetExtrinsicPayloadV1, CENNZnetExtrinsicSignatureV1 } from './extrinsic';
export declare type CennznetInterfaceTypes = keyof InterfaceRegistry;
declare module '@polkadot/types/interfaceRegistry' {
    interface InterfaceRegistry {
        Doughnut: Doughnut;
        'Option<Doughnut>': Option<Doughnut>;
        ChargeTransactionPayment: ChargeTransactionPayment;
        FeeExchange: FeeExchange;
        'Option<FeeExchange>': Option<FeeExchange>;
        CENNZnetExtrinsicPayloadV1: CENNZnetExtrinsicPayloadV1;
        CENNZnetExtrinsicSignatureV1: CENNZnetExtrinsicSignatureV1;
    }
}
export * from './runtime';
export { default as Doughnut } from './Doughnut';
export { ExtrinsicSignatureOptions, SignatureOptions, } from './extrinsic/types';
export { AccountId, AccountId as Address } from '@polkadot/types/interfaces';
export { u64 as Index, u64 as Nonce } from '@polkadot/types';
