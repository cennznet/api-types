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
const ExtrinsicSignature_1 = require("./ExtrinsicSignature");
const TRANSACTION_VERSION = 4;
/**
 * @name ExtrinsicV2
 * @description
 * The second generation of compact extrinsics
 */
class ExtrinsicV2 extends types_1.Struct {
    constructor(registry, value, { isSigned } = {}) {
        super(registry, {
            signature: ExtrinsicSignature_1.default,
            method: 'Call',
        }, ExtrinsicV2.decodeExtrinsic(registry, value, isSigned));
    }
    static decodeExtrinsic(registry, value, isSigned = false) {
        // const registry = new TypeRegistry();
        if (!value) {
            return {};
        }
        else if (value instanceof ExtrinsicV2) {
            return value;
        }
        else if (value instanceof types_1.ClassOf(registry, 'Call')) {
            return { method: value };
        }
        else if (util_1.isU8a(value)) {
            // here we decode manually since we need to pull through the version information
            // let v = value;
            const signature = new ExtrinsicSignature_1.default(registry, value, { isSigned });
            // v = v.subarray(signature.encodedLength);
            // const method = createType(registry, 'Call', v);
            // here we decode manually since we need to pull through the version information
            // const signature = createType(registry, 'ExtrinsicSignatureV2', value, { isSigned });
            const method = types_1.createType(registry, 'Call', value.subarray(signature.encodedLength));
            return {
                method,
                signature,
            };
        }
        return value;
    }
    /**
     * @description The length of the value when encoded as a Uint8Array
     */
    get encodedLength() {
        return this.toU8a().length;
    }
    /**
     * @description The [[Call]] this extrinsic wraps
     */
    get method() {
        return this.get('method');
    }
    /**
     * @description The [[ExtrinsicSignatureV2]]
     */
    get signature() {
        return this.get('signature');
    }
    /**
     * @description The version for the signature
     */
    get version() {
        return TRANSACTION_VERSION;
    }
    /**
     * @description Add an [[ExtrinsicSignatureV2]] to the extrinsic (already generated)
     */
    addSignature(signer, signature, payload) {
        this.signature.addSignature(signer, signature, payload);
        return this;
    }
    /**
     * @describe Adds a fake signature to the extrinsic
     */
    signFake(signer, options) {
        this.signature.signFake(this.method, signer, options);
        return this;
    }
    /**
     * @description Sign the extrinsic with a specific keypair
     */
    sign(account, options) {
        this.signature.sign(this.method, account, options);
        return this;
    }
}
exports.default = ExtrinsicV2;
