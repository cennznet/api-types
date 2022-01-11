import { Address, Balance, Call, EcdsaSignature, Ed25519Signature, ExtrinsicEra, Index, MultiSignature, Sr25519Signature } from '@polkadot/types/interfaces';
import { Compact, Struct } from '@polkadot/types';
import { ExtrinsicPayloadValue, IExtrinsicSignature, IKeyringPair, Registry } from '@polkadot/types/types';
import { ExtrinsicSignatureOptions } from '@polkadot/types/extrinsic/types';
import { ChargeTransactionPayment } from '../../transactionPayment';
import { SignatureOptions } from '../types';
import ExtrinsicPayloadV4 from './ExtrinsicPayload';
/**
 * @name CENNZnetExtrinsicSignatureV1
 * @description
 * A container for the [[Signature]] associated with a specific [[Extrinsic]]
 */
export default class CENNZnetExtrinsicSignatureV1 extends Struct implements IExtrinsicSignature {
    constructor(registry: Registry, value: CENNZnetExtrinsicSignatureV1 | Uint8Array | undefined, extSigOpt?: ExtrinsicSignatureOptions);
    /** @internal */
    static decodeExtrinsicSignature(value: CENNZnetExtrinsicSignatureV1 | Uint8Array | undefined, isSigned?: boolean): CENNZnetExtrinsicSignatureV1 | Uint8Array;
    /**
     * @description The length of the value when encoded as a Uint8Array
     */
    get encodedLength(): number;
    /**
     * @description `true` if the signature is valid
     */
    get isSigned(): boolean;
    /**
     * @description The [[ExtrinsicEra]] (mortal or immortal) this signature applies to
     */
    get era(): ExtrinsicEra;
    /**
     * @description The [[Index]] for the signature
     */
    get nonce(): Compact<Index>;
    /**
     * @description The actual [[EcdsaSignature]], [[Ed25519Signature]] or [[Sr25519Signature]]
     */
    get signature(): EcdsaSignature | Ed25519Signature | Sr25519Signature;
    /**
     * @description The raw [[MultiSignature]]
     */
    get multiSignature(): MultiSignature;
    /**
     * @description The [[Address]] that signed
     */
    get signer(): Address;
    /**
     * @description tip [[Balance]] (here for compatibility with [[IExtrinsic]] definition)
     */
    get tip(): Compact<Balance>;
    /**
     * @description The transaction fee metadata e.g tip, fee exchange
     */
    get transactionPayment(): ChargeTransactionPayment;
    protected injectSignature(signer: Address, signature: MultiSignature, { era, nonce, transactionPayment }: ExtrinsicPayloadV4): IExtrinsicSignature;
    /**
     * @description Adds a raw signature
     */
    addSignature(signer: Address | Uint8Array | string, signature: Uint8Array | string, payload: ExtrinsicPayloadValue | Uint8Array | string): IExtrinsicSignature;
    /**
     * @description Creates a payload from the supplied options
     */
    createPayload(method: Call, { blockHash, era, genesisHash, nonce, runtimeVersion: { specVersion, transactionVersion }, transactionPayment, }: SignatureOptions): ExtrinsicPayloadV4;
    /**
     * @description Generate a payload and applies the signature from a keypair
     */
    sign(method: Call, account: IKeyringPair, options: SignatureOptions): IExtrinsicSignature;
    /**
     * @description Generate a payload and applies a fake signature
     */
    signFake(method: Call, address: Address | Uint8Array | string, options: SignatureOptions): IExtrinsicSignature;
    /**
     * @description Encodes the value as a Uint8Array as per the SCALE specifications
     * @param isBare true when the value has none of the type-specific prefixes (internal)
     */
    toU8a(isBare?: boolean): Uint8Array;
}
