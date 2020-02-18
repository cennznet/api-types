"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Option_1 = require("@polkadot/types/codec/Option");
const Doughnut_1 = require("./Doughnut");
const extrinsicTypes = require("./extrinsic");
const runtimeTypes = require("./runtime");
//import { ChargeTransactionPayment } from './runtime';
// Monkey patch [[Option]] to encode `None` as a `0` byte
// Option.prototype.toU8a = function toU8a(isBare?: boolean): Uint8Array {
//   if (this.isNone) {
//     return new Uint8Array([0]);
//   }
//   const u8a = new Uint8Array(this.encodedLength);
//   u8a.set([1]);
//   u8a.set(this.raw.toU8a(true), 1);
//   return u8a;
// };
exports.default = {
    ...runtimeTypes,
    ...extrinsicTypes,
    AssetOf: 'u128',
    'ed25519::Signature': 'H512',
    // MultiSignature: 'MultiSignature',
    RewardBalance: 'Balance',
    Doughnut: Doughnut_1.default,
    //transactionPayment: 'ChargeTransactionPayment',
    // The patched [[Option]] type
    Option: Option_1.default,
};
// const registry = new TypeRegistry();
// registry.register(runtimeTypes.ChargeTransactionPayment);
