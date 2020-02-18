"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@polkadot/types");
const registry = new types_1.TypeRegistry();
class FeeRate extends types_1.ClassOf(registry, 'u128') {
}
exports.default = FeeRate;
FeeRate.SCALE_FACTOR = 1000000;
