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
const util_1 = require("@polkadot/types/primitive/Extrinsic/util");
// The base of an extrinsic payload
exports.BasePayloadV2 = {
    method: 'Bytes',
    doughnut: 'Option<Doughnut>',
    era: 'ExtrinsicEra',
    nonce: 'Compact<Index>',
    transactionPayment: 'ChargeTransactionPayment',
};
// These fields are signed here as part of the extrinsic signature but are NOT encoded in
// the final extrinsic payload itself.
// The CENNZnet node will populate these fields from on-chain data and check the signature compares
// hence 'implicit'
exports.PayloadImplicitAddonsV2 = {
    // prml_doughnut::Option<PlugDoughnut<Doughnut, Runtime>>
    // system::CheckVersion<Runtime>
    specVersion: 'u32',
    // system::CheckGenesis<Runtime>
    genesisHash: 'Hash',
    // system::CheckEra<Runtime>
    blockHash: 'Hash',
};
// The full definition for the extrinsic payload.
// It will be encoded (+ hashed if len > 256) and then signed to make the extrinsic signature
exports.FullPayloadV2 = {
    ...exports.BasePayloadV2,
    ...exports.PayloadImplicitAddonsV2,
};
/**
 * @name ExtrinsicPayloadV2
 * @description
 * A signing payload for an [[Extrinsic]]. For the final encoding, it is variable length based
 * on the contents included
 *
 *   1-8 bytes: The Transaction Compact<Index/Nonce> as provided in the transaction itself.
 *   2+ bytes: The Function Descriptor as provided in the transaction itself.
 *   1/2 bytes: The Transaction Era as provided in the transaction itself.
 *   32 bytes: The hash of the authoring block implied by the Transaction Era and the current block.
 */
class ExtrinsicPayloadV2 extends types_1.Struct {
    constructor(registry, value) {
        super(registry, exports.FullPayloadV2, value);
    }
    /**
     * @description The block [[Hash]] the signature applies to (mortal/immortal)
     */
    get blockHash() {
        return this.get('blockHash');
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
     * @description The [[ExtrinsicEra]]
     */
    get era() {
        return this.get('era');
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
        return util_1.sign(signerPair, this.toU8a({ method: true }), { withType: true });
    }
}
exports.default = ExtrinsicPayloadV2;
