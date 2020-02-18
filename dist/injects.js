"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Doughnut_1 = require("./Doughnut");
const extrinsicTypes = require("./extrinsic");
const runtimeTypes = require("./runtime");
exports.default = {
    ...runtimeTypes,
    ...extrinsicTypes,
    AssetOf: 'u128',
    'ed25519::Signature': 'H512',
    RewardBalance: 'Balance',
    Doughnut: Doughnut_1.default,
};
