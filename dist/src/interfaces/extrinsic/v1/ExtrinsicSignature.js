"use strict";
// Copyright 2017-2020 @polkadot/types authors & contributors & Centrality Investments Limited 2020
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@polkadot/types");
const constants_1 = require("@polkadot/types/extrinsic/constants");
const util_1 = require("@polkadot/util");
const ExtrinsicPayload_1 = require("./ExtrinsicPayload");
/**
 * @name CENNZnetExtrinsicSignatureV1
 * @description
 * A container for the [[Signature]] associated with a specific [[Extrinsic]]
 */
class CENNZnetExtrinsicSignatureV1 extends types_1.Struct {
    constructor(registry, value, { isSigned } = {}) {
        super(registry, {
            signer: 'Address',
            signature: 'MultiSignature',
            // TODO: Load this dynamically like so:
            // ...registry.getSignedExtensionTypes(),
            // ...registry.getSignedExtensionExtra()
            doughnut: 'Option<Doughnut>',
            era: 'ExtrinsicEra',
            nonce: 'Compact<Index>',
            transactionPayment: 'ChargeTransactionPayment',
        }, CENNZnetExtrinsicSignatureV1.decodeExtrinsicSignature(value, isSigned));
    }
    /** @internal */
    static decodeExtrinsicSignature(value, isSigned = false) {
        if (!value) {
            return constants_1.EMPTY_U8A;
        }
        else if (value instanceof CENNZnetExtrinsicSignatureV1) {
            return value;
        }
        return isSigned
            ? value
            : constants_1.EMPTY_U8A;
    }
    /**
     * @description The length of the value when encoded as a Uint8Array
     */
    get encodedLength() {
        return this.isSigned
            ? super.encodedLength
            : 0;
    }
    /**
     * @description `true` if the signature is valid
     */
    get isSigned() {
        return !this.signature.isEmpty;
    }
    /**
     * @description The [[ExtrinsicEra]] (mortal or immortal) this signature applies to
     */
    get era() {
        return this.get('era');
    }
    /**
     * @description The [[Index]] for the signature
     */
    get nonce() {
        return this.get('nonce');
    }
    /**
     * @description The actual [[EcdsaSignature]], [[Ed25519Signature]] or [[Sr25519Signature]]
     */
    get signature() {
        return this.multiSignature.value;
    }
    /**
     * @description The raw [[MultiSignature]]
     */
    get multiSignature() {
        return this.get('signature');
    }
    /**
     * @description The [[Address]] that signed
     */
    get signer() {
        return this.get('signer');
    }
    /**
     * @description tip [[Balance]] (here for compatibility with [[IExtrinsic]] definition)
     */
    get tip() {
        return this.transactionPayment.tip;
    }
    /**
     * @description The transaction fee metadata e.g tip, fee exchange
     */
    get transactionPayment() {
        return this.get('transactionPayment');
    }
    /**
     * @description The [[Doughnut]]
     */
    get doughnut() {
        return this.get('doughnut');
    }
    injectSignature(signer, signature, { era, nonce, doughnut, transactionPayment }) {
        this.set('era', era);
        this.set('nonce', nonce);
        this.set('signer', signer);
        this.set('signature', signature);
        this.set('doughnut', doughnut);
        this.set('transactionPayment', transactionPayment);
        return this;
    }
    /**
     * @description Adds a raw signature
     */
    addSignature(signer, signature, payload) {
        return this.injectSignature(types_1.createType(this.registry, 'Address', signer), types_1.createType(this.registry, 'MultiSignature', signature), new ExtrinsicPayload_1.default(this.registry, payload));
    }
    /**
     * @description Creates a payload from the supplied options
     */
    createPayload(method, { blockHash, era, genesisHash, nonce, runtimeVersion: { specVersion }, tip, doughnut, transactionPayment }) {
        return new ExtrinsicPayload_1.default(this.registry, {
            blockHash,
            era: era || constants_1.IMMORTAL_ERA,
            doughnut: doughnut || types_1.createType(this.registry, 'Option<Doughnut>'),
            genesisHash,
            method: method.toHex(),
            nonce,
            specVersion,
            // [[tip]] is now set inside [[transactionPayment]]
            // This doesn't do anything, just signalling our intention not to use it.
            tip: null,
            transactionPayment: transactionPayment || types_1.createType(this.registry, 'ChargeTransactionPayment')
        });
    }
    /**
     * @description Generate a payload and applies the signature from a keypair
     */
    sign(method, account, options) {
        const signer = types_1.createType(this.registry, 'Address', account.publicKey);
        const payload = this.createPayload(method, options);
        const signature = types_1.createType(this.registry, 'MultiSignature', payload.sign(account));
        return this.injectSignature(signer, signature, payload);
    }
    /**
     * @description Generate a payload and applies a fake signature
     */
    signFake(method, address, options) {
        const signer = types_1.createType(this.registry, 'Address', address);
        const payload = this.createPayload(method, options);
        const signature = types_1.createType(this.registry, 'MultiSignature', util_1.u8aConcat(new Uint8Array([1]), new Uint8Array(64).fill(0x42)));
        return this.injectSignature(signer, signature, payload);
    }
    /**
     * @description Encodes the value as a Uint8Array as per the SCALE specifications
     * @param isBare true when the value has none of the type-specific prefixes (internal)
     */
    toU8a(isBare) {
        return this.isSigned
            ? super.toU8a(isBare)
            : constants_1.EMPTY_U8A;
    }
}
exports.default = CENNZnetExtrinsicSignatureV1;
