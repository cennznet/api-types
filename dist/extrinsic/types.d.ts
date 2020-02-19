import Option from '@polkadot/types/codec/Option';
import { ExtrinsicSignatureOptions as ExtrinsicSignatureOptionsBase } from '@polkadot/types/primitive/Extrinsic/types';
import { AnyU8a, ExtrinsicPayloadValue as ExtrinsicPayloadValueBase, SignatureOptions as SignatureOptionsBase } from '@polkadot/types/types';
import Doughnut from '../Doughnut';
import { ChargeTransactionPayment } from '../runtime/transaction-payment';
export interface ExtrinsicSignatureOptions extends ExtrinsicSignatureOptionsBase {
    doughnut?: Option<Doughnut>;
    transactionPayment?: ChargeTransactionPayment;
}
export interface ExtrinsicPayloadValue extends ExtrinsicPayloadValueBase {
    doughnut?: AnyU8a | Option<Doughnut>;
    transactionPayment?: AnyU8a | ChargeTransactionPayment;
}
export interface SignatureOptions extends SignatureOptionsBase {
    doughnut?: AnyU8a | Doughnut;
    transactionPayment?: AnyU8a | ChargeTransactionPayment;
}
