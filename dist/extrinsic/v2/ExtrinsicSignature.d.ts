import { Compact, Struct } from '@polkadot/types';
import Option from '@polkadot/types/codec/Option';
import { Address, Balance, Call, EcdsaSignature, Ed25519Signature, ExtrinsicEra, MultiSignature, Sr25519Signature } from '@polkadot/types/interfaces/runtime';
import { ExtrinsicSignatureOptions } from '@polkadot/types/primitive/Extrinsic/types';
import { IExtrinsicSignature, IKeyringPair, Registry } from '@polkadot/types/types';
import Doughnut from '../../Doughnut';
import { ChargeTransactionPayment, Index } from '../../runtime';
import { ExtrinsicV2SignatureOptions } from '../types';
import { ExtrinsicPayloadValueV2 } from './ExtrinsicPayload';
/**
 * @name ExtrinsicSignature
 * @description
 * A container for the [[Signature]] associated with a specific [[Extrinsic]]
 */
export default class ExtrinsicSignatureV2 extends Struct implements IExtrinsicSignature {
    constructor(registry: Registry, value?: ExtrinsicSignatureV2 | Uint8Array | undefined, { isSigned }?: ExtrinsicSignatureOptions);
    static decodeExtrinsicSignature(value: ExtrinsicSignatureV2 | Uint8Array | undefined, isSigned?: boolean): ExtrinsicSignatureV2 | Uint8Array;
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
    get doughnut(): Option<Doughnut>;
    /**
     * @description The actuall [[Signature]] hash
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
    addSignature(signer: Address | Uint8Array | string, signature: Uint8Array | string, payload: ExtrinsicPayloadValueV2 | Uint8Array | string): IExtrinsicSignature;
    /**
     * @description Generate a payload and pplies the signature from a keypair
     */
    sign(method: Call, account: IKeyringPair, { blockHash, era, genesisHash, nonce, doughnut, feeExchange, runtimeVersion: { specVersion }, tip, transactionPayment, }: ExtrinsicV2SignatureOptions): IExtrinsicSignature;
    /**
     * @description Generate a payload and applies a fake signature
     */
    signFake(method: Call, address: Address | Uint8Array | string, { blockHash, era, genesisHash, nonce, doughnut, feeExchange, runtimeVersion: { specVersion }, tip, transactionPayment, }: ExtrinsicV2SignatureOptions): IExtrinsicSignature;
    /**
     * @description Encodes the value as a Uint8Array as per the SCALE specifications
     * @param isBare true when the value has none of the type-specific prefixes (internal)
     */
    toU8a(isBare?: boolean): Uint8Array;
}
