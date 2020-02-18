"use strict";
// Copyright 2019 Centrality Investments Limited
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
// import {AnyJson, AnyJsonObject} from '@polkadot/types/types';
/* [[FeeExchangeV1]] when included in a transaction it indicates network fees should be
 * paid in `assetId` by paying up to `maxPayment` after the exchange rate is calculated.
 */
class FeeExchangeV1 extends types_1.Struct {
    constructor(registry, value) {
        super(registry, { assetId: 'Compact<AssetId>', maxPayment: 'Compact<Balance>' }, value);
    }
    get assetId() {
        return this.get('assetId');
    }
    get maxPayment() {
        return this.get('maxPayment');
    }
}
exports.FeeExchangeV1 = FeeExchangeV1;
// The outer [[FeeExchange]] it is an enum to allow flexbility for future versions and backwards compatability.
// export class FeeExchange extends Enum.with({FeeExchangeV1}) {}
class FeeExchange extends types_1.Enum {
    constructor(registry, value) {
        super(registry, { FeeExchangeV1 }, value);
    }
}
exports.FeeExchange = FeeExchange;
/**
 * [[ChargeTransactionPayment]] allows paying a `tip` and/or specifying fee payment in another currency
 * when added to an extrinsic payload.
 */
class ChargeTransactionPayment extends types_1.Struct {
    constructor(registry, value) {
        super(registry, { tip: 'Compact<Balance>', feeExchange: 'Option<FeeExchange>' }, value);
    }
    get tip() {
        return this.get('tip');
    }
    get feeExchange() {
        return this.get('feeExchange');
    }
}
exports.ChargeTransactionPayment = ChargeTransactionPayment;
