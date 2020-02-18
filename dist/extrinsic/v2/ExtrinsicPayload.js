"use strict";
// Copyright 2017-2020 @polkadot/types authors & contributors & Centrality Investments Limited 2020
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
Object.defineProperty(exports, "__esModule", { value: true });
const Struct_1 = require("@polkadot/types/codec/Struct");
const util_1 = require("@polkadot/types/primitive/Extrinsic/util");
/**
 * @name GenericExtrinsicPayloadV4
 * @description
 * A signing payload for an [[Extrinsic]]. For the final encoding, it is variable length based
 * on the contents included
 */
class ExtrinsicPayloadV4 extends Struct_1.default {
    constructor(registry, value) {
        super(registry, {
            method: 'Bytes',
            ...registry.getSignedExtensionTypes(),
            ...registry.getSignedExtensionExtra()
        }, value);
    }
    /**
     * @description The block [[Hash]] the signature applies to (mortal/immortal)
     */
    get blockHash() {
        return this.get('blockHash');
    }
    /**
     * @description The [[ExtrinsicEra]]
     */
    get era() {
        return this.get('era');
    }
    /**
     * @description The genesis [[Hash]] the signature applies to (mortal/immortal)
     */
    get genesisHash() {
        return this.get('genesisHash');
    }
    /**
     * @description The [[Bytes]] contained in the payload
     */
    get method() {
        return this.get('method');
    }
    /**
     * @description The [[Index]]
     */
    get nonce() {
        return this.get('nonce');
    }
    /**
     * @description The specVersion for this signature
     */
    get specVersion() {
        return this.get('specVersion');
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
    /**
     * @description Sign the payload with the keypair
     */
    sign(signerPair) {
        // NOTE The `toU8a({ method: true })` argument is absolutely critical - we don't want the method (Bytes)
        // to have the length prefix included. This means that the data-as-signed is un-decodable,
        // but is also doesn't need the extra information, only the pure data (and is not decoded)
        // ... The same applies to V1..V3, if we have a V5, carry move this comment to latest
        return util_1.sign(signerPair, this.toU8a({ method: true }), { withType: true });
    }
}
exports.default = ExtrinsicPayloadV4;
