"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@polkadot/types");
const ga_1 = require("../ga");
class ExchangeKey extends types_1.Tuple.with([ga_1.AssetId, ga_1.AssetId]) {
}
exports.default = ExchangeKey;
