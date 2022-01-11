"use strict";
// Copyright 2019-2020 Centrality Investments Limited
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@polkadot/types");
const constants_1 = require("@polkadot/types/extrinsic/constants");
const util_1 = require("@polkadot/util");
const signedExtensions_1 = require("../signedExtensions");
const ExtrinsicPayload_1 = __importDefault(require("./ExtrinsicPayload"));
/**
 * @name CENNZnetExtrinsicSignatureV1
 * @description
 * A container for the [[Signature]] associated with a specific [[Extrinsic]]
 */
class CENNZnetExtrinsicSignatureV1 extends types_1.Struct {
    constructor(registry, value, extSigOpt = {}) {
        const isSigned = extSigOpt.isSigned;
        super(registry, Object.assign({ signer: 'Address', signature: 'MultiSignature' }, (0, signedExtensions_1.expandExtensionTypes)(signedExtensions_1.defaultExtensions, 'extrinsic')), CENNZnetExtrinsicSignatureV1.decodeExtrinsicSignature(value, isSigned));
    }
    /** @internal */
    static decodeExtrinsicSignature(value, isSigned = false) {
        if (!value) {
            return constants_1.EMPTY_U8A;
        }
        else if (value instanceof CENNZnetExtrinsicSignatureV1) {
            return value;
        }
        return isSigned ? value : constants_1.EMPTY_U8A;
    }
    /**
     * @description The length of the value when encoded as a Uint8Array
     */
    get encodedLength() {
        return this.isSigned ? super.encodedLength : 0;
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
    injectSignature(signer, signature, { era, nonce, transactionPayment }) {
        this.set('era', era);
        this.set('nonce', nonce);
        this.set('signer', signer);
        this.set('signature', signature);
        this.set('transactionPayment', transactionPayment);
        return this;
    }
    /**
     * @description Adds a raw signature
     */
    addSignature(signer, signature, payload) {
        return this.injectSignature(this.registry.createType('Address', signer), this.registry.createType('MultiSignature', signature), new ExtrinsicPayload_1.default(this.registry, payload));
    }
    /**
     * @description Creates a payload from the supplied options
     */
    createPayload(method, { blockHash, era, genesisHash, nonce, runtimeVersion: { specVersion, transactionVersion }, transactionPayment, }) {
        return new ExtrinsicPayload_1.default(this.registry, {
            blockHash,
            era: era || constants_1.IMMORTAL_ERA,
            genesisHash,
            method: method.toHex(),
            nonce,
            specVersion,
            // [[tip]] is now set inside [[transactionPayment]]
            // This doesn't do anything, just signalling our intention not to use it.
            tip: null,
            transactionVersion: transactionVersion || 0,
            transactionPayment: transactionPayment,
        });
    }
    /**
     * @description Generate a payload and applies the signature from a keypair
     */
    sign(method, account, options) {
        const signer = this.registry.createType('Address', account.addressRaw);
        const payload = this.createPayload(method, options);
        const signature = this.registry.createType('MultiSignature', payload.sign(account));
        return this.injectSignature(signer, signature, payload);
    }
    /**
     * @description Generate a payload and applies a fake signature
     */
    signFake(method, address, options) {
        const signer = this.registry.createType('Address', address);
        const payload = this.createPayload(method, options);
        const signature = this.registry.createType('MultiSignature', (0, util_1.u8aConcat)(new Uint8Array([1]), new Uint8Array(64).fill(0x42)));
        return this.injectSignature(signer, signature, payload);
    }
    /**
     * @description Encodes the value as a Uint8Array as per the SCALE specifications
     * @param isBare true when the value has none of the type-specific prefixes (internal)
     */
    toU8a(isBare) {
        return this.isSigned ? super.toU8a(isBare) : constants_1.EMPTY_U8A;
    }
}
exports.default = CENNZnetExtrinsicSignatureV1;
