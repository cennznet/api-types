"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@polkadot/types");
class CENNZnetExtrinsic extends types_1.GenericExtrinsic {
    constructor(registry, value) {
        super(registry, value);
        this.signaturePayloadOptions = {
            blockHash: undefined,
            genesisHash: undefined,
            method: undefined,
            specVersion: undefined,
            nonce: undefined,
            runtimeVersion: undefined,
            transactionPayment: undefined,
            transactionVersion: undefined
        };
    }
    addSignature(signer, signature, payload) {
        const mergeDefinedObjects = (A, B) => {
            const res = {};
            Object.keys(Object.assign(Object.assign({}, A), B)).map(key => {
                res[key] = A[key] || B[key];
            });
            return res;
        };
        const mergedPayload = mergeDefinedObjects(payload, this.signaturePayloadOptions);
        return super.addSignature(signer, signature, mergedPayload);
    }
    /**
     * @description Sign the extrinsic with a specific keypair
     */
    sign(account, options) {
        const mergeDefinedObjects = (A, B) => {
            const res = {};
            Object.keys(Object.assign(Object.assign({}, A), B)).map(key => {
                res[key] = A[key] || B[key];
            });
            return res;
        };
        const mergedSignatureOpts = mergeDefinedObjects(options, this.signaturePayloadOptions);
        return super.sign(account, mergedSignatureOpts);
    }
}
exports.default = CENNZnetExtrinsic;
