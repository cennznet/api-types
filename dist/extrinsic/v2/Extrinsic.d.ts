import { Address, Call } from '@polkadot/types/interfaces/runtime';
import { IExtrinsicImpl, IKeyringPair, Registry } from '@polkadot/types/types';
import { ExtrinsicOptions } from '@polkadot/types/primitive/Extrinsic/types';
import Struct from '@polkadot/types/codec/Struct';
import { ExtrinsicPayloadValue, SignatureOptions } from '../types';
import ExtrinsicSignatureV4 from './ExtrinsicSignature';
export declare const TRANSACTION_VERSION = 4;
export interface ExtrinsicValueV4 {
    method?: Call;
    signature?: ExtrinsicSignatureV4;
}
/**
 * @name GenericExtrinsicV4
 * @description
 * The fourth generation of compact extrinsics
 */
export default class ExtrinsicV4 extends Struct implements IExtrinsicImpl {
    constructor(registry: Registry, value?: Uint8Array | ExtrinsicValueV4 | Call, { isSigned }?: Partial<ExtrinsicOptions>);
    /** @internal */
    static decodeExtrinsic(registry: Registry, value?: Call | Uint8Array | ExtrinsicValueV4, isSigned?: boolean): ExtrinsicValueV4;
    /**
     * @description The length of the value when encoded as a Uint8Array
     */
    get encodedLength(): number;
    /**
     * @description The [[Call]] this extrinsic wraps
     */
    get method(): Call;
    /**
     * @description The [[ExtrinsicSignatureV4]]
     */
    get signature(): ExtrinsicSignatureV4;
    /**
     * @description The version for the signature
     */
    get version(): number;
    /**
     * @description Add an [[ExtrinsicSignatureV4]] to the extrinsic (already generated)
     */
    addSignature(signer: Address | Uint8Array | string, signature: Uint8Array | string, payload: ExtrinsicPayloadValue | Uint8Array | string): ExtrinsicV4;
    /**
     * @description Sign the extrinsic with a specific keypair
     */
    sign(account: IKeyringPair, options: SignatureOptions): ExtrinsicV4;
    /**
     * @describe Adds a fake signature to the extrinsic
     */
    signFake(signer: Address | Uint8Array | string, options: SignatureOptions): ExtrinsicV4;
}
