import { Bytes, Compact, Struct, u32 } from '@polkadot/types';
import { Balance, ExtrinsicEra, Hash } from '@polkadot/types/interfaces/runtime';
import { AnyNumber, AnyU8a, IExtrinsicEra, IKeyringPair, IMethod, Registry } from '@polkadot/types/types';
import Option from '@polkadot/types/codec/Option';
import Doughnut from '../../Doughnut';
import { ChargeTransactionPayment, Index } from '../../runtime';
import { CennznetInterfaceTypes } from '../types';
export interface ExtrinsicPayloadValueV2 {
    blockHash: AnyU8a;
    doughnut: Option<Doughnut>;
    era: AnyU8a | IExtrinsicEra;
    genesisHash: AnyU8a;
    method: AnyU8a | IMethod;
    nonce: AnyNumber;
    specVersion: AnyNumber;
    tip: AnyNumber;
    transactionPayment?: ChargeTransactionPayment;
}
export declare const BasePayloadV2: Record<string, CennznetInterfaceTypes>;
export declare const PayloadImplicitAddonsV2: Record<string, CennznetInterfaceTypes>;
export declare const FullPayloadV2: Record<string, CennznetInterfaceTypes>;
/**
 * @name ExtrinsicPayloadV2
 * @description
 * A signing payload for an [[Extrinsic]]. For the final encoding, it is variable length based
 * on the contents included
 *
 *   1-8 bytes: The Transaction Compact<Index/Nonce> as provided in the transaction itself.
 *   2+ bytes: The Function Descriptor as provided in the transaction itself.
 *   1/2 bytes: The Transaction Era as provided in the transaction itself.
 *   32 bytes: The hash of the authoring block implied by the Transaction Era and the current block.
 */
export default class ExtrinsicPayloadV2 extends Struct {
    constructor(registry: Registry, value?: ExtrinsicPayloadValueV2 | Uint8Array | string);
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
    get doughnut(): Option<Doughnut>;
    /**
     * @description Sign the payload with the keypair
     */
    sign(signerPair: IKeyringPair): Uint8Array;
}
