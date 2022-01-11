"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const definitions_1 = __importDefault(require("@polkadot/types/interfaces/runtime/definitions"));
exports.default = {
    types: Object.assign({ "AssetId": "u32", "Balance": "u128", "Index": "u64" }, definitions_1.default.types)
};
