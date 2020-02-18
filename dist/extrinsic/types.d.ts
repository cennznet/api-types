import Option from '@polkadot/types/codec/Option';
import { InterfaceRegistry } from '@polkadot/types/interfaceRegistry';
import { AnyNumber, AnyU8a, IExtrinsicEra, IMethod, RuntimeVersionInterface, SignatureOptions as SignatureOptionsBase } from '@polkadot/types/types';
import Doughnut from '../Doughnut';
import { ChargeTransactionPayment, FeeExchange } from '../runtime/transaction-payment';
export interface ExtrinsicSignatureOptions {
    isSigned?: boolean;
    blockHash?: AnyU8a;
    era?: IExtrinsicEra;
    doughnut?: Option<Doughnut>;
    genesisHash?: AnyU8a;
    nonce?: AnyNumber;
    runtimeVersion?: RuntimeVersionInterface;
    tip?: AnyNumber;
    transactionPayment?: ChargeTransactionPayment;
}
export interface ExtrinsicPayloadValue {
    blockHash: AnyU8a;
    era: AnyU8a | IExtrinsicEra;
    doughnut?: AnyU8a | Doughnut;
    genesisHash: AnyU8a;
    method: AnyU8a | IMethod;
    nonce: AnyNumber;
    specVersion: AnyNumber;
    tip: AnyNumber;
    transactionPayment?: AnyU8a | ChargeTransactionPayment;
}
export declare type DoughnutValue = AnyU8a;
export declare type FeeExchangeValue = {
    assetId: AnyNumber;
    maxPayment: AnyNumber;
};
export interface SignatureOptions extends SignatureOptionsBase {
    doughnut?: AnyU8a | Doughnut;
    transactionPayment?: AnyU8a | ChargeTransactionPayment;
}
export declare type CennznetInterfaceTypes = keyof InterfaceRegistry;
declare module '@polkadot/types/interfaceRegistry' {
    interface InterfaceRegistry {
        Doughnut: Doughnut;
        'Option<Doughnut>': Option<Doughnut>;
        ChargeTransactionPayment: any;
        FeeExchange: FeeExchange;
        'Option<FeeExchange>': Option<FeeExchange>;
    }
}
