import { AnyU8a, ExtrinsicPayloadValue as ExtrinsicPayloadValueBase, SignatureOptions as SignatureOptionsBase } from '@polkadot/types/types';
import { Option } from '@polkadot/types';
import { ChargeTransactionPayment, FeeExchange } from '../transactionPayment';
import { doughnut } from '../types';
export interface ExtrinsicPayloadValue extends ExtrinsicPayloadValueBase {
    transactionPayment?: AnyU8a | ChargeTransactionPayment;
}
export interface SignatureOptions extends SignatureOptionsBase {
    transactionPayment?: AnyU8a | ChargeTransactionPayment;
}
export interface ExtrinsicV0SignatureOptions extends SignatureOptionsBase {
    doughnut?: Option<doughnut>;
    transactionPayment?: ChargeTransactionPayment;
    feeExchange?: FeeExchange;
}
