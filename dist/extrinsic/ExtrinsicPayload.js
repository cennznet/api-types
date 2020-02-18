"use strict";
// Copyright 2017-2020 @polkadot/types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("@polkadot/util");
const create_1 = require("@polkadot/types/codec/create");
const Base_1 = require("@polkadot/types/codec/Base");
const constants_1 = require("./constants");
const VERSIONS = [
    'ExtrinsicPayloadUnknown',
    'ExtrinsicPayloadV1',
    'ExtrinsicPayloadV2',
    'ExtrinsicPayloadV3',
    'ExtrinsicPayloadV4'
];
/**
 * @name GenericExtrinsicPayload
 * @description
 * A signing payload for an [[Extrinsic]]. For the final encoding, it is variable length based
 * on the contents included
 */
class ExtrinsicPayload extends Base_1.default {
    constructor(registry, value, { version } = {}) {
        super(registry, ExtrinsicPayload.decodeExtrinsicPayload(registry, value, version));
    }
    /** @internal */
    static decodeExtrinsicPayload(registry, value, version = constants_1.DEFAULT_VERSION) {
        if (value instanceof ExtrinsicPayload) {
            return value.raw;
        }
        return create_1.createType(registry, VERSIONS[version] || VERSIONS[0], value, { version });
    }
    /**
     * @description The block [[Hash]] the signature applies to (mortal/immortal)
     */
    get blockHash() {
        return this.raw.blockHash;
    }
    /**
     * @description The [[ExtrinsicEra]]
     */
    get era() {
        return this.raw.era;
    }
    /**
     * @description The genesis block [[Hash]] the signature applies to
     */
    get genesisHash() {
        // NOTE only v3+
        return this.raw.genesisHash || create_1.createType(this.registry, 'Hash');
    }
    /**
     * @description The [[Raw]] contained in the payload
     */
    get method() {
        return this.raw.method;
    }
    /**
     * @description The [[Index]]
     */
    get nonce() {
        return this.raw.nonce;
    }
    /**
     * @description The specVersion as a [[u32]] for this payload
     */
    get specVersion() {
        // NOTE only v3+
        return this.raw.specVersion || create_1.createType(this.registry, 'u32');
    }
    /**
     * @description The [[Balance]]
     */
    get tip() {
        // NOTE from v2+
        return this.raw.tip || create_1.createType(this.registry, 'Compact<Balance>');
    }
    /**
     * @description Compares the value of the input to see if there is a match
     */
    eq(other) {
        return this.raw.eq(other);
    }
    /**
     * @description Sign the payload with the keypair
     */
    sign(signerPair) {
        const signature = this.raw.sign(signerPair);
        // This is extensible, so we could quite readily extend to send back extra
        // information, such as for instance the payload, i.e. `payload: this.toHex()`
        // For the case here we sign via the extrinsic, we ignore the return, so generally
        // this is applicable for external signing
        return {
            signature: util_1.u8aToHex(signature)
        };
    }
    /**
     * @description Converts the Object to JSON, typically used for RPC transfers
     */
    toJSON() {
        return this.toHex();
    }
    /**
     * @description Returns the string representation of the value
     */
    toString() {
        return this.toHex();
    }
    /**
     * @description Returns a serialized u8a form
     */
    toU8a(isBare) {
        // call our parent, with only the method stripped
        return super.toU8a(isBare ? { method: true } : false);
    }
}
exports.default = ExtrinsicPayload;
