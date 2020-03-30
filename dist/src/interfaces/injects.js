"use strict";
// Copyright 2019-2020 Centrality Investments Limited
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
// CENNZnet types for injection into a polkadot API session
const Doughnut_1 = require("./Doughnut");
const extrinsic_1 = require("./extrinsic");
const runtimeTypes = require("./types");
exports.default = {
    ...runtimeTypes,
    // We override the substrate v4 extrinsic signature type in CENNZnet
    ExtrinsicSignatureV4: extrinsic_1.CENNZnetExtrinsicSignatureV1,
    SignerPayload: extrinsic_1.SignerPayload,
    Doughnut: Doughnut_1.default,
};
