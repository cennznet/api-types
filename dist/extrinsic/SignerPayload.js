"use strict";
// Copyright 2017-2020 @polkadot/types authors & contributors & Centrality Investments Limited 2020
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
const util_1 = require("@polkadot/util");
// We explicitly cast the type here to get the actual TypeScript exports right
// We can ignore the properties, added via Struct.with
const _Payload = types_1.Struct.with({
    address: 'Address',
    blockHash: 'Hash',
    blockNumber: 'BlockNumber',
    doughnut: 'Option<Doughnut>',
    era: 'ExtrinsicEra',
    genesisHash: 'Hash',
    method: 'Call',
    nonce: 'Compact<Index>',
    runtimeVersion: 'RuntimeVersion',
    tip: 'Compact<Balance>',
    transactionPayment: 'ChargeTransactionPayment',
    version: 'u8'
});
/**
 * @name SignerPayload
 * @description
 * A generic signer payload that can be used for serialization between API and signer
 */
class SignerPayload extends _Payload {
    /**
     * @description Creates an representation of the structure as an ISignerPayload JSON
     */
    toPayload() {
        const { address, blockHash, blockNumber, doughnut, era, genesisHash, method, nonce, runtimeVersion: { specVersion }, tip, transactionPayment, version } = this;
        return {
            address: address.toString(),
            blockHash: blockHash.toHex(),
            blockNumber: blockNumber.toHex(),
            doughnut: doughnut.toHex(),
            era: era.toHex(),
            genesisHash: genesisHash.toHex(),
            method: method.toHex(),
            nonce: nonce.toHex(),
            specVersion: specVersion.toHex(),
            // [[tip]] is contained within [[transactionPayment]]
            tip: null,
            transactionPayment: transactionPayment.toHex(),
            version: version.toNumber()
        };
    }
    /**
     * @description Creates a representation of the payload in raw Exrinsic form
     */
    toRaw() {
        const payload = this.toPayload();
        // NOTE Explicitly pass the bare flag so the method is encoded un-prefixed (non-decodable, for signing only)
        const data = util_1.u8aToHex(types_1.createType(this.registry, 'CENNZnetExtrinsicPayloadV1', payload, { version: payload.version }).toU8a({ method: true }));
        return {
            address: payload.address,
            data,
            type: 'payload'
        };
    }
}
exports.default = SignerPayload;
