"use strict";
// Copyright 2017-2020 @polkadot/types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("@polkadot/util");
const create_1 = require("@polkadot/types/codec/create");
const Base_1 = require("@polkadot/types/codec/Base");
const Compact_1 = require("@polkadot/types/codec/Compact");
const constants_1 = require("./constants");
const VERSIONS = [
    'ExtrinsicV4'
];
/**
 * @name GenericExtrinsic
 * @description
 * Representation of an Extrinsic in the system. It contains the actual call,
 * (optional) signature and encodes with an actual length prefix
 *
 * {@link https://github.com/paritytech/wiki/blob/master/Extrinsic.md#the-extrinsic-format-for-node}.
 *
 * Can be:
 * - signed, to create a transaction
 * - left as is, to create an inherent
 */
class Extrinsic extends Base_1.default {
    constructor(registry, value, { version } = {}) {
        super(registry, Extrinsic.decodeExtrinsic(registry, value, version));
    }
    /** @internal */
    static newFromValue(registry, value, version) {
        if (value instanceof Extrinsic) {
            return value.raw;
        }
        const isSigned = (version & constants_1.BIT_SIGNED) === constants_1.BIT_SIGNED;
        const type = VERSIONS[version & constants_1.UNMASK_VERSION] || VERSIONS[0];
        // we cast here since the VERSION definition is incredibly broad - we don't have a
        // slice for "only add extrinsic types", and more string definitions become unwieldy
        return create_1.createType(registry, type, value, { isSigned, version });
    }
    /** @internal */
    static decodeExtrinsic(registry, value, version = constants_1.DEFAULT_VERSION) {
        if (Array.isArray(value) || util_1.isHex(value)) {
            return Extrinsic.decodeU8aLike(registry, value, version);
        }
        else if (util_1.isU8a(value)) {
            return Extrinsic.decodeU8a(registry, value, version);
        }
        else if (value instanceof create_1.ClassOf(registry, 'Call')) {
            return Extrinsic.newFromValue(registry, { method: value }, version);
        }
        return Extrinsic.newFromValue(registry, value, version);
    }
    /** @internal */
    static decodeU8aLike(registry, value, version) {
        // Instead of the block below, it should simply be:
        // return Extrinsic.decodeExtrinsic(hexToU8a(value as string));
        const u8a = util_1.u8aToU8a(value);
        // HACK 11 Jan 2019 - before https://github.com/paritytech/substrate/pull/1388
        // extrinsics didn't have the length, cater for both approaches. This is very
        // inconsistent with any other `Vec<u8>` implementation
        const [offset, length] = Compact_1.default.decodeU8a(u8a);
        const withPrefix = u8a.length === (offset + length.toNumber());
        return Extrinsic.decodeU8a(registry, withPrefix
            ? u8a
            : Compact_1.default.addLengthPrefix(u8a), version);
    }
    /** @internal */
    static decodeU8a(registry, value, version) {
        if (!value.length) {
            return Extrinsic.newFromValue(registry, new Uint8Array(), version);
        }
        const [offset, length] = Compact_1.default.decodeU8a(value);
        const total = offset + length.toNumber();
        util_1.assert(total <= value.length, `Extrinsic: required length less than remainder, expected at least ${total}, found ${value.length}`);
        const data = value.subarray(offset, total);
        return Extrinsic.newFromValue(registry, data.subarray(1), data[0]);
    }
    /**
     * @description The arguments passed to for the call, exposes args so it is compatible with [[Call]]
     */
    get args() {
        return this.method.args;
    }
    /**
     * @description The argument definitions, compatible with [[Call]]
     */
    get argsDef() {
        return this.method.argsDef;
    }
    /**
     * @description The actual `[sectionIndex, methodIndex]` as used in the Call
     */
    get callIndex() {
        return this.method.callIndex;
    }
    /**
     * @description The actual data for the Call
     */
    get data() {
        return this.method.data;
    }
    /**
     * @description The era for this extrinsic
     */
    get era() {
        return this.raw.signature.era;
    }
    /**
     * @description The length of the value when encoded as a Uint8Array
     */
    get encodedLength() {
        return this.toU8a().length;
    }
    /**
     * @description `true` is method has `Origin` argument (compatibility with [Call])
     */
    get hasOrigin() {
        return this.method.hasOrigin;
    }
    /**
     * @description `true` id the extrinsic is signed
     */
    get isSigned() {
        return this.raw.signature.isSigned;
    }
    /**
     * @description The length of the actual data, excluding prefix
     */
    get length() {
        return this.toU8a(true).length;
    }
    /**
     * @description The [[FunctionMetadataLatest]] that describes the extrinsic
     */
    get meta() {
        return this.method.meta;
    }
    /**
     * @description The [[Call]] this extrinsic wraps
     */
    get method() {
        return this.raw.method;
    }
    /**
     * @description The nonce for this extrinsic
     */
    get nonce() {
        return this.raw.signature.nonce;
    }
    /**
     * @description The actual [[EcdsaSignature]], [[Ed25519Signature]] or [[Sr25519Signature]]
     */
    get signature() {
        return this.raw.signature.signature;
    }
    /**
     * @description The [[Address]] that signed
     */
    get signer() {
        return this.raw.signature.signer;
    }
    /**
     * @description Forwards compat
     */
    get tip() {
        return this.raw.signature.tip;
    }
    /**
     * @description Returns the raw transaction version (not flagged with signing information)
    */
    get type() {
        return this.raw.version;
    }
    /**
     * @description Returns the encoded version flag
    */
    get version() {
        return this.type | (this.isSigned ? constants_1.BIT_SIGNED : constants_1.BIT_UNSIGNED);
    }
    /**
     * @description Injects an already-generated signature into the extrinsic
     */
    addSignature(signer, signature, payload) {
        this.raw.addSignature(signer, signature, payload);
        return this;
    }
    /**
     * @description Sign the extrinsic with a specific keypair
     */
    sign(account, options) {
        this.raw.sign(account, options);
        return this;
    }
    /**
     * @describe Adds a fake signature to the extrinsic
     */
    signFake(signer, options) {
        this.raw.signFake(signer, options);
        return this;
    }
    /**
     * @description Returns a hex string representation of the value
     */
    toHex(isBare) {
        return util_1.u8aToHex(this.toU8a(isBare));
    }
    /**
     * @description Converts the Object to JSON, typically used for RPC transfers
     */
    toJSON() {
        return this.toHex();
    }
    /**
     * @description Returns the base runtime type name for this instance
     */
    toRawType() {
        return 'Extrinsic';
    }
    /**
     * @description Encodes the value as a Uint8Array as per the SCALE specifications
     * @param isBare true when the value is not length-prefixed
     */
    toU8a(isBare) {
        // we do not apply bare to the internal values, rather this only determines out length addition,
        // where we strip all lengths this creates an un-decodable extrinsic
        const encoded = util_1.u8aConcat(new Uint8Array([this.version]), this.raw.toU8a());
        return isBare
            ? encoded
            : Compact_1.default.addLengthPrefix(encoded);
    }
}
exports.default = Extrinsic;
