"use strict";
// Copyright 2019 Centrality Investments Limited & @polkadot/types authors & contributors
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
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable member-ordering no-magic-numbers
const types_1 = require("@polkadot/types");
const util_1 = require("@polkadot/util");
const constants_1 = require("../constants");
const ExtrinsicPayload_1 = require("./ExtrinsicPayload");
/**
 * @name ExtrinsicSignature
 * @description
 * A container for the [[Signature]] associated with a specific [[Extrinsic]]
 */
class ExtrinsicSignatureV2 extends types_1.Struct {
    constructor(registry, value, { isSigned } = {}) {
        super(registry, {
            signer: 'Address',
            signature: 'MultiSignature',
            transactionPayment: 'ChargeTransactionPayment',
            doughnut: 'Option<Doughnut>',
            era: 'ExtrinsicEra',
            nonce: 'Compact<Index>',
        }, ExtrinsicSignatureV2.decodeExtrinsicSignature(value, isSigned));
    }
    static decodeExtrinsicSignature(value, isSigned = false) {
        if (!value) {
            return constants_1.EMPTY_U8A;
        }
        else if (value instanceof ExtrinsicSignatureV2) {
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
     * @description The [[Doughnut]]
     */
    get doughnut() {
        return this.get('doughnut');
    }
    /**
     * @description The actuall [[Signature]] hash
     */
    //  get signature(): EcdsaSignature | Ed25519Signature | Sr25519Signature {
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
     * @description tip (here for compatibility with [[IExtrinsic]] definition)
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
    injectSignature(signer, signature, { doughnut, era, nonce, tip, transactionPayment }) {
        this.set('doughnut', doughnut);
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
        return this.injectSignature(types_1.createType(this.registry, 'Address', signer), types_1.createType(this.registry, 'MultiSignature', signature), new ExtrinsicPayload_1.default(this.registry, payload));
    }
    /**
     * @description Generate a payload and pplies the signature from a keypair
     */
    sign(method, account, { blockHash, era, genesisHash, nonce, doughnut, feeExchange, runtimeVersion: { specVersion }, tip, transactionPayment, }) {
        const signer = types_1.createType(this.registry, 'Address', account.publicKey);
        const payloadValue = {
            blockHash,
            doughnut: doughnut || types_1.createType(this.registry, 'Option<Doughnut>'),
            era: era || constants_1.IMMORTAL_ERA,
            genesisHash,
            method: method.toHex(),
            nonce,
            // [[tip]] is now set inside [[transactionPayment]]
            // This doesn't do anything, just signalling our intention not to use it.
            tip: null,
            transactionPayment: transactionPayment || types_1.createType(this.registry, 'ChargeTransactionPayment'),
            specVersion,
        };
        const payload = new ExtrinsicPayload_1.default(this.registry, payloadValue);
        const signature = types_1.createType(this.registry, 'MultiSignature', payload.sign(account));
        return this.injectSignature(signer, signature, payload);
    }
    /**
     * @description Generate a payload and applies a fake signature
     */
    signFake(method, address, { blockHash, era, genesisHash, nonce, doughnut, feeExchange, runtimeVersion: { specVersion }, tip, transactionPayment, }) {
        const signer = types_1.createType(this.registry, 'Address', address);
        const payloadValue = {
            blockHash,
            doughnut: doughnut || types_1.createType(this.registry, 'Option<Doughnut>'),
            era: era || constants_1.IMMORTAL_ERA,
            genesisHash,
            method: method.toHex(),
            nonce,
            // [[tip]] is now set inside [[transactionPayment]]
            // This doesn't do anything, just signalling our intention not to use it.
            tip: null,
            transactionPayment: transactionPayment || types_1.createType(this.registry, 'ChargeTransactionPayment'),
            specVersion,
        };
        const signature = types_1.createType(this.registry, 'MultiSignature', util_1.u8aConcat(new Uint8Array([1]), new Uint8Array(64).fill(0x42)));
        const payload = new ExtrinsicPayload_1.default(this.registry, payloadValue);
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
exports.default = ExtrinsicSignatureV2;
