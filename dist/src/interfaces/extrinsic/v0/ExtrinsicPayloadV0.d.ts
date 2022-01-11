import { Bytes, Compact, Option, Raw, Struct, u32 } from '@polkadot/types';
import { Balance, ExtrinsicEra, Hash } from '@polkadot/types/interfaces';
import { AnyNumber, AnyU8a, IExtrinsicEra, IKeyringPair, IMethod, InterfaceTypes, Registry } from '@polkadot/types/types';
import { ChargeTransactionPayment, doughnut, Index } from '../../types';
export interface ExtrinsicPayloadValueV0 {
    blockHash: AnyU8a;
    doughnut: Option<Raw>;
    era: AnyU8a | IExtrinsicEra;
    genesisHash: AnyU8a;
    method: AnyU8a | IMethod;
    nonce: AnyNumber;
    specVersion: AnyNumber;
    tip: AnyNumber;
    transactionPayment?: AnyU8a | ChargeTransactionPayment;
}
export declare const BasePayloadV0: Record<string, keyof InterfaceTypes>;
export declare const PayloadImplicitAddonsV0: Record<string, keyof InterfaceTypes>;
export declare const FullPayloadV0: Record<string, keyof InterfaceTypes>;
/**
 * @name ExtrinsicPayloadV0
 * @description
 * A signing payload for an [[Extrinsic]]. For the final encoding, it is variable length based
 * on the contents included
 *
 *   1-8 bytes: The Transaction Compact<Index/Nonce> as provided in the transaction itself.
 *   2+ bytes: The Function Descriptor as provided in the transaction itself.
 *   1/2 bytes: The Transaction Era as provided in the transaction itself.
 *   32 bytes: The hash of the authoring block implied by the Transaction Era and the current block.
 */
export default class ExtrinsicPayloadV0 extends Struct {
    constructor(registry: Registry, value?: ExtrinsicPayloadValueV0 | Uint8Array | string);
    /**
     * @description The block [[Hash]] the signature applies to (mortal/immortal)
     */
    get blockHash(): Hash;
    /**
     * @description The genesis [[Hash]] the signature applies to (mortal/immortal)
     */
    get genesisHash(): Hash;
    /**
     * @description The [[Bytes]] contained in the payload
     */
    get method(): Bytes;
    /**
     * @description The [[ExtrinsicEra]]
     */
    get era(): ExtrinsicEra;
    /**
     * @description The [[Index]]
     */
    get nonce(): Compact<Index>;
    /**
     * @description The specVersion for this signature
     */
    get specVersion(): u32;
    /**
     * @description tip (here for compatibility with [[IExtrinsic]] definition)
     */
    get tip(): Compact<Balance>;
    /**
     * @description The transaction fee metadata e.g tip, fee exchange
     */
    get transactionPayment(): ChargeTransactionPayment;
    /**
     * @description The [[Doughnut]]
     */
    get doughnut(): Option<doughnut>;
    /**
     * @description Sign the payload with the keypair
     */
    sign(signerPair: IKeyringPair): Uint8Array;
}
