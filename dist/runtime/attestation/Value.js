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
/*
    Custom `Value` type for Attestation module.
 */
const types_1 = require("@polkadot/types");
const registry = new types_1.TypeRegistry();
class AttestationValue extends types_1.ClassOf(registry, 'H256') {
}
exports.default = AttestationValue;
