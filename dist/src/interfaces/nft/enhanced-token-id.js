"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnhancedTokenId = void 0;
const types_1 = require("@polkadot/types");
const util_1 = require("@polkadot/util");
class EnhancedTokenId extends types_1.Struct {
    constructor(registry, value) {
        super(registry, {
            collectionId: 'CollectionId',
            seriesId: 'SeriesId',
            serialNumber: 'SerialNumber',
        }, value);
    }
    /**
    * @description The collection the token belongs to
    */
    get collectionId() {
        return this.get('collectionId');
    }
    /**
    * @description The collection series the token belongs to
    */
    get seriesId() {
        return this.get('seriesId');
    }
    /**
    * @description The series number the token is in
    */
    get serialNumber() {
        return this.get('serialNumber');
    }
    /**
    * @description Return the hex representation of the Id
    */
    toHex() {
        const tokenId = new Uint8Array([
            ...this.collectionId.toBn().toArray('le', 4),
            ...this.seriesId.toBn().toArray('le', 4),
            ...this.serialNumber.toBn().toArray('le', 4),
        ]);
        return (0, util_1.u8aToHex)(tokenId);
    }
    /**
    * @description Return the hex representation of the Id
    */
    toString() {
        return this.toHex();
    }
    /**
    * @description Returns the base runtime type name for this instance
    */
    toRawType() {
        return 'EnhancedTokenId';
    }
}
exports.EnhancedTokenId = EnhancedTokenId;
