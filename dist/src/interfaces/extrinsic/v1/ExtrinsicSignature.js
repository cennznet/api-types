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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _CENNZnetExtrinsicSignatureV1_signKeys;
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@polkadot/types");
const constants_1 = require("@polkadot/types/extrinsic/constants");
const util_1 = require("@polkadot/util");
const ExtrinsicPayload_1 = __importDefault(require("./ExtrinsicPayload"));
// Ensure we have enough data for all types of signatures
const FAKE_SIGNATURE = new Uint8Array(256).fill(1);
function toAddress(registry, address) {
    return registry.createTypeUnsafe('Address', [(0, util_1.isU8a)(address) ? (0, util_1.u8aToHex)(address) : address]);
}
/**
 * @name CENNZnetExtrinsicSignatureV1
 * @description
 * A container for the [[Signature]] associated with a specific [[Extrinsic]]
 */
class CENNZnetExtrinsicSignatureV1 extends types_1.Struct {
    constructor(registry, value, { isSigned } = {}) {
        super(registry, (0, util_1.objectSpread)({ signer: 'Address', signature: 'ExtrinsicSignature' }, registry.getSignedExtensionTypes()), CENNZnetExtrinsicSignatureV1.decodeExtrinsicSignature(value, isSigned));
        _CENNZnetExtrinsicSignatureV1_signKeys.set(this, void 0);
        __classPrivateFieldSet(this, _CENNZnetExtrinsicSignatureV1_signKeys, Object.keys(registry.getSignedExtensionTypes()), "f");
        (0, util_1.objectProperties)(this, __classPrivateFieldGet(this, _CENNZnetExtrinsicSignatureV1_signKeys, "f"), (k) => this.get(k));
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
    get registry() {
        return super.registry;
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
        return (this.multiSignature.value || this.multiSignature);
    }
    /**
     * @description The [[Address]] that signed
     */
    get signer() {
        return this.getT('signer');
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
    _injectSignature(signer, signature, payload) {
        // use the fields exposed to guide the getters
        for (let i = 0; i < __classPrivateFieldGet(this, _CENNZnetExtrinsicSignatureV1_signKeys, "f").length; i++) {
            const k = __classPrivateFieldGet(this, _CENNZnetExtrinsicSignatureV1_signKeys, "f")[i];
            const v = payload.get(k);
            if (!(0, util_1.isUndefined)(v)) {
                this.set(k, v);
            }
        }
        // additional fields (exposed in struct itself)
        this.set('signer', signer);
        this.set('signature', signature);
        return this;
    }
    /**
    * @description The raw [[ExtrinsicSignature]]
    */
    get multiSignature() {
        return this.getT('signature');
    }
    /**
     * @description Adds a raw signature
     */
    addSignature(signer, signature, payload) {
        return this._injectSignature(toAddress(this.registry, signer), this.registry.createTypeUnsafe('ExtrinsicSignature', [signature]), new ExtrinsicPayload_1.default(this.registry, payload));
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
            //@ts-ignore
            tip: null,
            transactionVersion: transactionVersion || 0,
            transactionPayment,
        });
    }
    /**
     * @description Generate a payload and applies the signature from a keypair
     */
    sign(method, account, options) {
        (0, util_1.assert)(account && account.addressRaw, () => `Expected a valid keypair for signing, found ${(0, util_1.stringify)(account)}`);
        const payload = this.createPayload(method, options);
        console.log(payload);
        return this._injectSignature(toAddress(this.registry, account.addressRaw), this.registry.createTypeUnsafe('ExtrinsicSignature', [payload.sign(account)]), payload);
    }
    /**
     * @description Generate a payload and applies a fake signature
     */
    signFake(method, address, options) {
        (0, util_1.assert)(address, () => `Expected a valid address for signing, found ${(0, util_1.stringify)(address)}`);
        const payload = this.createPayload(method, options);
        return this._injectSignature(toAddress(this.registry, address), this.registry.createTypeUnsafe('ExtrinsicSignature', [FAKE_SIGNATURE]), payload);
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
_CENNZnetExtrinsicSignatureV1_signKeys = new WeakMap();
