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
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@polkadot/types");
const util_1 = require("@polkadot/types/extrinsic/util");
const signedExtensions_1 = require("../signedExtensions");
/**
 * @name CENNZnetExtrinsicPayloadV1
 * @description
 * A signing payload for an [[Extrinsic]]. For the final encoding, it is variable length based
 * on the contents included
 */
class CENNZnetExtrinsicPayloadV1 extends types_1.Struct {
    constructor(registry, value) {
        super(registry, Object.assign(Object.assign({ method: 'Bytes' }, (0, signedExtensions_1.expandExtensionTypes)(signedExtensions_1.defaultExtensions, 'extrinsic')), (0, signedExtensions_1.expandExtensionTypes)(signedExtensions_1.defaultExtensions, 'payload')), value);
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
     * @description The transactionVersion for this signature
     */
    get transactionVersion() {
        return this.get('transactionVersion');
    }
    /**
     * @description The transaction fee metadata e.g tip, fee exchange
     */
    get transactionPayment() {
        return this.get('transactionPayment');
    }
    /**
     * @description Sign the payload with the keypair
     */
    sign(signerPair) {
        // NOTE The `toU8a({ method: true })` argument is absolutely critical - we don't want the method (Bytes)
        // to have the length prefix included. This means that the data-as-signed is un-decodable,
        // but is also doesn't need the extra information, only the pure data (and is not decoded)
        // ... The same applies to V1..V3, if we have a V5, carry move this comment to latest
        return (0, util_1.sign)(this.registry, signerPair, this.toU8a({ method: true }), { withType: true });
    }
}
exports.default = CENNZnetExtrinsicPayloadV1;
