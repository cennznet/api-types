import { Struct } from '@polkadot/types';
import { Address, Call } from '@polkadot/types/interfaces/runtime';
import { IExtrinsicImpl, IKeyringPair, Registry, SignatureOptions } from '@polkadot/types/types';
import { ExtrinsicOptions } from '../types';
import { ExtrinsicPayloadValueV2 } from './ExtrinsicPayload';
import ExtrinsicSignatureV2 from './ExtrinsicSignature';
export interface ExtrinsicValueV2 {
    signature?: ExtrinsicSignatureV2;
    method?: Call;
}
/**
 * @name ExtrinsicV2
 * @description
 * The second generation of compact extrinsics
 */
export default class ExtrinsicV2 extends Struct implements IExtrinsicImpl {
    constructor(registry: Registry, value?: Uint8Array | ExtrinsicValueV2 | Call, { isSigned }?: Partial<ExtrinsicOptions>);
    static decodeExtrinsic(registry: Registry, value?: Call | Uint8Array | ExtrinsicValueV2, isSigned?: boolean): ExtrinsicValueV2;
    /**
     * @description The length of the value when encoded as a Uint8Array
     */
    get encodedLength(): number;
    /**
     * @description The [[Call]] this extrinsic wraps
     */
    get method(): Call;
    /**
     * @description The [[ExtrinsicSignatureV2]]
     */
    get signature(): ExtrinsicSignatureV2;
    /**
     * @description The version for the signature
     */
    get version(): number;
    /**
     * @description Add an [[ExtrinsicSignatureV2]] to the extrinsic (already generated)
     */
    addSignature(signer: Address | Uint8Array | string, signature: Uint8Array | string, payload: ExtrinsicPayloadValueV2 | Uint8Array | string): ExtrinsicV2;
    /**
     * @describe Adds a fake signature to the extrinsic
     */
    signFake(signer: Address | Uint8Array | string, options: SignatureOptions): ExtrinsicV2;
    /**
     * @description Sign the extrinsic with a specific keypair
     */
    sign(account: IKeyringPair, options: SignatureOptions): ExtrinsicV2;
}
