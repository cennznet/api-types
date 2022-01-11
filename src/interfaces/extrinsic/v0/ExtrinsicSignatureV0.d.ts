import { Compact, Struct } from '@polkadot/types';
import { Address, Balance, Call, Index, EcdsaSignature, Ed25519Signature, ExtrinsicEra, MultiSignature, Sr25519Signature } from '@polkadot/types/interfaces';
import { IExtrinsicSignature, IKeyringPair, Registry } from '@polkadot/types/types';
import { ExtrinsicSignatureOptions } from '@polkadot/types/extrinsic/types';
import { ExtrinsicV0SignatureOptions } from '../types';
import { ChargeTransactionPayment } from '../../types';
import ExtrinsicPayloadV0, { ExtrinsicPayloadValueV0 } from './ExtrinsicPayloadV0';
/**
 * @name ExtrinsicSignature
 * @description
 * A container for the [[Signature]] associated with a specific [[Extrinsic]]
 */
export default class ExtrinsicSignatureV0 extends Struct implements IExtrinsicSignature {
    constructor(registry: Registry, value: ExtrinsicSignatureV0 | Uint8Array | undefined, { isSigned }?: ExtrinsicSignatureOptions);
    static decodeExtrinsicSignature(value: ExtrinsicSignatureV0 | Uint8Array | undefined, isSigned?: boolean): ExtrinsicSignatureV0 | Uint8Array;
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
     * @description The [[Doughnut]]
     */
    get doughnut(): unknown;
    /**
     * @description The actual [[Signature]] hash
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
     * @description tip (here for compatibility with [[IExtrinsic]] definition)
     */
    get tip(): Compact<Balance>;
    /**
     * @description The transaction fee metadata e.g tip, fee exchange
     */
    get transactionPayment(): ChargeTransactionPayment;
    private injectSignature;
    /**
     * @description Adds a raw signature
     */
    addSignature(signer: Address | Uint8Array | string, signature: Uint8Array | string, payload: ExtrinsicPayloadValueV0 | Uint8Array | string): IExtrinsicSignature;
    /**
     * @description Creates a payload from the supplied options
     */
    createPayload(method: Call, { blockHash, era, genesisHash, nonce, doughnut, runtimeVersion: { specVersion }, transactionPayment, }: ExtrinsicV0SignatureOptions): ExtrinsicPayloadV0;
    /**
     * @description Generate a payload and applies the signature from a keypair
     */
    sign(method: Call, account: IKeyringPair, { blockHash, era, genesisHash, nonce, doughnut, runtimeVersion: { specVersion }, tip, transactionPayment, }: ExtrinsicV0SignatureOptions): IExtrinsicSignature;
    /**
     * @description Generate a payload and applies a fake signature
     */
    signFake(method: Call, address: Address | Uint8Array | string, { blockHash, era, genesisHash, nonce, doughnut, runtimeVersion: { specVersion }, tip, transactionPayment, }: ExtrinsicV0SignatureOptions): IExtrinsicSignature;
    /**
     * @description Encodes the value as a Uint8Array as per the SCALE specifications
     * @param isBare true when the value has none of the type-specific prefixes (internal)
     */
    toU8a(isBare?: boolean): Uint8Array;
}
