import { Compact, Option, u8 } from '@polkadot/types';
import { Balance, BlockNumber, Call, ExtrinsicEra, Hash, RuntimeVersion } from '@polkadot/types/interfaces';
import { Codec, Constructor, ISignerPayload, SignerPayloadJSON as SignerPayloadJSONBase, SignerPayloadRaw } from '@polkadot/types/types';
import { Address, Index } from '../types';
import Doughnut from '../Doughnut';
import { ChargeTransactionPayment } from '../runtime/transaction-payment';
export interface SignerPayloadJSON extends SignerPayloadJSONBase {
    doughnut?: string;
    transactionPayment?: string;
}
export interface SignerPayloadType extends Codec {
    address: Address;
    blockHash: Hash;
    blockNumber: BlockNumber;
    era: ExtrinsicEra;
    genesisHash: Hash;
    method: Call;
    nonce: Compact<Index>;
    runtimeVersion: RuntimeVersion;
    tip?: Compact<Balance>;
    version: u8;
    doughnut: Option<Doughnut>;
    transactionPayment: ChargeTransactionPayment;
}
declare const _Payload: Constructor<SignerPayloadType>;
/**
 * @name SignerPayload
 * @description
 * A generic signer payload that can be used for serialization between API and signer
 */
export default class SignerPayload extends _Payload implements ISignerPayload {
    /**
     * @description Creates an representation of the structure as an ISignerPayload JSON
     */
    toPayload(): SignerPayloadJSON;
    /**
     * @description Creates a representation of the payload in raw Exrinsic form
     */
    toRaw(): SignerPayloadRaw;
}
export {};
