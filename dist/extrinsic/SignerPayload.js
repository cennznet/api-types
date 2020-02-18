"use strict";
// Copyright 2017-2019 @polkadot/api authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@polkadot/types");
const util_1 = require("@polkadot/util");
const Doughnut_1 = require("../Doughnut");
const ExtrinsicPayload_1 = require("./ExtrinsicPayload");
// We explicitly cast the type here to get the actual TypeScript exports right
// We can ignore the properties, added via Struct.with
exports._Payload = types_1.Struct.with({
    address: 'Address',
    blockHash: 'Hash',
    blockNumber: 'BlockNumber',
    era: 'ExtrinsicEra',
    genesisHash: 'Hash',
    method: 'Call',
    nonce: 'Compact<Index>',
    runtimeVersion: 'RuntimeVersion',
    tip: 'Compact<Balance>',
    version: 'u8',
    doughnut: types_1.Option.with(Doughnut_1.default),
    transactionPayment: 'ChargeTransactionPayment',
});
class SignerPayload extends exports._Payload {
    /**
     * @description Creates an representation of the structure as an ISignerPayload JSON
     */
    toPayload() {
        const { address, blockHash, blockNumber, era, genesisHash, method, nonce, runtimeVersion: { specVersion }, tip, version, doughnut, transactionPayment, } = this;
        const ret = {
            address: address.toString(),
            blockHash: blockHash.toHex(),
            blockNumber: blockNumber.toHex(),
            era: era.toHex(),
            genesisHash: genesisHash.toHex(),
            method: method.toHex(),
            nonce: nonce.toHex(),
            specVersion: specVersion.toHex(),
            tip: tip.toHex(),
            version: version.toNumber(),
            transactionPayment: transactionPayment.toHex(),
        };
        if (doughnut.isSome) {
            ret.doughnut = doughnut.unwrap().toHex();
        }
        return ret;
    }
    /**
     * @description Creates a representation of the payload in raw Exrinsic form
     */
    toRaw() {
        const payload = this.toPayload();
        // const registry = new TypeRegistry();
        // NOTE Explicitly pass the bare flag so the method is encoded un-prefixed (non-decodable, for signing only)
        const data = util_1.u8aToHex(new ExtrinsicPayload_1.default(this.registry, payload, { version: payload.version }).toU8a({ method: true }));
        return {
            address: payload.address,
            data,
            type: 'payload',
        };
    }
    toArray() {
        return super.toArray();
    }
}
exports.default = SignerPayload;
