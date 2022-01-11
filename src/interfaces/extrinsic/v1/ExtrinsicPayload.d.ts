import { Bytes, Compact, Struct, u32 } from '@polkadot/types';
import { Balance, ExtrinsicEra, Hash } from '@polkadot/types/interfaces';
import { IKeyringPair, Registry } from '@polkadot/types/types';
import { ChargeTransactionPayment, Index } from '../../types';
import { ExtrinsicPayloadValue } from '../types';
/**
 * @name CENNZnetExtrinsicPayloadV1
 * @description
 * A signing payload for an [[Extrinsic]]. For the final encoding, it is variable length based
 * on the contents included
 */
export default class CENNZnetExtrinsicPayloadV1 extends Struct {
    constructor(registry: Registry, value?: ExtrinsicPayloadValue | Uint8Array | string);
    /**
     * @description The block [[Hash]] the signature applies to (mortal/immortal)
     */
    get blockHash(): Hash;
    /**
     * @description The [[ExtrinsicEra]]
     */
    get era(): ExtrinsicEra;
    /**
     * @description The genesis [[Hash]] the signature applies to (mortal/immortal)
     */
    get genesisHash(): Hash;
    /**
     * @description The [[Bytes]] contained in the payload
     */
    get method(): Bytes;
    /**
     * @description The [[Index]]
     */
    get nonce(): Compact<Index>;
    /**
     * @description The specVersion for this signature
     */
    get specVersion(): u32;
    /**
     * @description tip [[Balance]] (here for compatibility with [[IExtrinsic]] definition)
     */
    get tip(): Compact<Balance>;
    /**
     * @description The transactionVersion for this signature
     */
    get transactionVersion(): u32;
    /**
     * @description The transaction fee metadata e.g tip, fee exchange
     */
    get transactionPayment(): ChargeTransactionPayment;
    /**
     * @description Sign the payload with the keypair
     */
    sign(signerPair: IKeyringPair): Uint8Array;
}
