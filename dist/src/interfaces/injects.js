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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typesBundle = void 0;
const extrinsic_1 = require("./extrinsic");
const definitions = __importStar(require("./definitions"));
const enhanced_token_id_1 = require("./nft/enhanced-token-id");
const _types = Object.assign(Object.assign({}, definitions), { 
    // We override the substrate v4 extrinsic signature type in CENNZnet
    // This funny format, makes it compatible with the structure from generated definitions
    other: {
        types: {
            SignerPayload: extrinsic_1.SignerPayload,
        },
    } });
const shareType37Onwards = {
    GenericExtrinsic: extrinsic_1.CENNZnetExtrinsic,
    // In our staking runtime module, we use StakingLedgerTo223 definition of polkadot's staking ledger
    // StakingLedger: 'StakingLedgerTo223',
    ExtrinsicSignatureV4: extrinsic_1.CENNZnetExtrinsicSignatureV1,
    ExtrinsicPayloadV4: extrinsic_1.CENNZnetExtrinsicPayloadV1,
    MessageId: 'SyloMessageId',
    EnhancedTokenId: enhanced_token_id_1.EnhancedTokenId,
    // CENNZnet lookup source is 1:1 with address
    LookupSource: 'Address',
};
exports.typesBundle = {
    spec: {
        cennznet: {
            types: [
                {
                    minmax: [0, 36],
                    types: {
                        DispatchClass: 'DispatchClassTo36',
                        DispatchInfo: 'DispatchInfoTo36',
                        ExtrinsicSignatureV4: extrinsic_1.CENNZnetExtrinsicSignatureV0,
                        ExtrinsicPayloadV4: extrinsic_1.CENNZnetExtrinsicPayloadV0,
                        AssetInfo: 'AssetInfoV40'
                    },
                },
                {
                    minmax: [37, 40],
                    types: Object.assign(Object.assign({}, shareType37Onwards), { AssetInfo: 'AssetInfoV40', Proposal: 'GovernanceProposal' }),
                },
                {
                    minmax: [41, undefined],
                    types: Object.assign(Object.assign({}, shareType37Onwards), { AssetInfo: 'AssetInfoV41', 
                        // Proposal also exist in polkadots democracy module
                        Proposal: 'GovernanceProposal', 
                        // works with this definition
                        SessionKeys5B: '(AccountId, AccountId, AccountId, AccountId, BeefyKey)', Keys: 'SessionKeys5B' }),
                },
            ],
        },
    },
};
// Unwind the nested type definitions into a flat map
exports.default = Object.values(_types).reduce((res, { types }) => (Object.assign(Object.assign({}, res), types)), {});
