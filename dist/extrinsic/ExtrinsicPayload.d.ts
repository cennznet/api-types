import { Balance, ExtrinsicPayloadV1, ExtrinsicPayloadV2, ExtrinsicPayloadV3, ExtrinsicPayloadV4, Hash, Index } from '@polkadot/types/interfaces/runtime';
import { BareOpts, ExtrinsicPayloadValue, IKeyringPair, Registry } from '@polkadot/types/types';
import Base from '@polkadot/types/codec/Base';
import Compact from '@polkadot/types/codec/Compact';
import Raw from '@polkadot/types/codec/Raw';
import u32 from '@polkadot/types/primitive/U32';
import ExtrinsicEra from '@polkadot/types/primitive/Extrinsic/ExtrinsicEra';
interface ExtrinsicPayloadOptions {
    version?: number;
}
declare type ExtrinsicPayloadVx = ExtrinsicPayloadV1 | ExtrinsicPayloadV2 | ExtrinsicPayloadV3 | ExtrinsicPayloadV4;
/**
 * @name GenericExtrinsicPayload
 * @description
 * A signing payload for an [[Extrinsic]]. For the final encoding, it is variable length based
 * on the contents included
 */
export default class ExtrinsicPayload extends Base<ExtrinsicPayloadVx> {
    constructor(registry: Registry, value: Partial<ExtrinsicPayloadValue> | Uint8Array | string | undefined, { version }?: ExtrinsicPayloadOptions);
    /** @internal */
    static decodeExtrinsicPayload(registry: Registry, value: ExtrinsicPayload | ExtrinsicPayloadValue | Uint8Array | string | undefined, version?: number): ExtrinsicPayloadVx;
    /**
     * @description The block [[Hash]] the signature applies to (mortal/immortal)
     */
    get blockHash(): Hash;
    /**
     * @description The [[ExtrinsicEra]]
     */
    get era(): ExtrinsicEra;
    /**
     * @description The genesis block [[Hash]] the signature applies to
     */
    get genesisHash(): Hash;
    /**
     * @description The [[Raw]] contained in the payload
     */
    get method(): Raw;
    /**
     * @description The [[Index]]
     */
    get nonce(): Compact<Index>;
    /**
     * @description The specVersion as a [[u32]] for this payload
     */
    get specVersion(): u32;
    /**
     * @description The [[Balance]]
     */
    get tip(): Compact<Balance>;
    /**
     * @description Compares the value of the input to see if there is a match
     */
    eq(other?: any): boolean;
    /**
     * @description Sign the payload with the keypair
     */
    sign(signerPair: IKeyringPair): {
        signature: string;
    };
    /**
     * @description Converts the Object to JSON, typically used for RPC transfers
     */
    toJSON(): any;
    /**
     * @description Returns the string representation of the value
     */
    toString(): string;
    /**
     * @description Returns a serialized u8a form
     */
    toU8a(isBare?: BareOpts): Uint8Array;
}
export {};
