import { Compact, Option, Struct, u8 } from '@polkadot/types';
import { Address, Balance, BlockNumber, Call, ExtrinsicEra, Hash, Index, RuntimeVersion } from '@polkadot/types/interfaces';
import { Codec, Constructor, ISignerPayload, SignerPayloadJSON as SignerPayloadJSONBase, SignerPayloadRaw } from '@polkadot/types/types';
import Doughnut from '../Doughnut';
import { ChargeTransactionPayment } from '../runtime/transaction-payment';
export interface SignerPayloadType extends Struct {
    address: Address;
    blockHash: Hash;
    blockNumber: BlockNumber;
    era: ExtrinsicEra;
    genesisHash: Hash;
    method: Call;
    nonce: Compact<Index>;
    runtimeVersion: RuntimeVersion;
    tip: Compact<Balance>;
    version: u8;
    doughnut: Option<Doughnut>;
    transactionPayment: ChargeTransactionPayment;
}
export interface SignerPayloadJSON extends SignerPayloadJSONBase {
    doughnut?: string;
    transactionPayment?: string;
}
export declare const _Payload: Constructor<SignerPayloadType>;
export default class SignerPayload extends _Payload implements ISignerPayload {
    /**
     * @description Creates an representation of the structure as an ISignerPayload JSON
     */
    toPayload(): SignerPayloadJSON;
    /**
     * @description Creates a representation of the payload in raw Exrinsic form
     */
    toRaw(): SignerPayloadRaw;
    toArray(): Codec[];
}
