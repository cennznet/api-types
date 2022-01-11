import { Compact, u8, Vec } from '@polkadot/types';
import { Text } from '@polkadot/types/primitive/Text';
import { Balance, BlockNumber, Call, ExtrinsicEra, Hash, RuntimeVersion } from '@polkadot/types/interfaces';
import { AnyJson, Codec, Constructor, ISignerPayload, SignerPayloadJSON as SignerPayloadJSONBase, SignerPayloadRaw } from '@polkadot/types/types';
import { Address, Index } from '../types';
import { ChargeTransactionPayment } from '../transactionPayment';
export interface SignerPayloadJSON extends SignerPayloadJSONBase {
    transactionPayment?: Record<string, AnyJson>;
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
    signedExtensions: Vec<Text>;
    tip?: Compact<Balance>;
    version: u8;
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
     * @description Creates a representation of the payload in raw Extrinsic form
     */
    toRaw(): SignerPayloadRaw;
}
export {};
