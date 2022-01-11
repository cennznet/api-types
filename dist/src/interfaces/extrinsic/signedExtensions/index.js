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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUnknownExtensions = exports.expandExtensionTypes = exports.defaultExtensions = exports.allExtensions = void 0;
const cennznet_1 = __importDefault(require("./cennznet"));
// A mapping of the known signed extensions to the extra fields that they contain. Unlike in the actual extensions,
// we define the extra fields not as a Tuple, but rather as a struct so they can be named. These will be expanded
// into the various fields when added to the payload (we only support V4 onwards with these, V3 and earlier are
// deemded fixed and non-changeable)
const allExtensions = Object.assign({}, cennznet_1.default);
exports.allExtensions = allExtensions;
// the v4 signed extensions (the order is important here, as applied by default)
const defaultExtensions = [
    'CheckSpecVersion',
    'CheckTxVersion',
    'CheckGenesis',
    'CheckEra',
    'CheckNonce',
    'CheckWeight',
    'ChargeTransactionPayment',
];
exports.defaultExtensions = defaultExtensions;
function findUnknownExtensions(extensions) {
    const names = Object.keys(allExtensions);
    return extensions.filter((key) => !names.includes(key));
}
exports.findUnknownExtensions = findUnknownExtensions;
function expandExtensionTypes(extensions, type) {
    return extensions
        .map((key) => allExtensions[key])
        .filter((info) => !!info)
        .reduce((result, info) => (Object.assign(Object.assign({}, result), info[type])), {});
}
exports.expandExtensionTypes = expandExtensionTypes;
