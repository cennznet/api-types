"use strict";
// Copyright 2019 Plug New Zealand Limited
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
const injects_1 = require("../src/interfaces/injects");
const api_1 = require("@polkadot/api");
const types_1 = require("@polkadot/types");
const util_crypto_1 = require("@polkadot/util-crypto");
const balances = require("../src/balances");
const keyring_1 = require("@polkadot/keyring");
const bignumber_js_1 = require("bignumber.js");
describe('e2e transactions', () => {
    let api;
    let alice, bob;
    const registry = new types_1.TypeRegistry();
    beforeAll(async () => {
        await (0, util_crypto_1.cryptoWaitReady)();
        const keyring = new keyring_1.default({ type: 'sr25519' });
        alice = keyring.addFromUri('//Alice');
        bob = keyring.addFromUri('//Bob');
        const derives = { balances };
        api = await api_1.ApiPromise.create({
            provider: new api_1.WsProvider('ws://localhost:9944'),
            types: {
                ...injects_1.default,
            },
            derives,
            registry,
        });
        // compatibility patch, don't use upstream composite account
        api.query.system.account = api.query.system.accountNonce;
    });
    afterAll(async () => {
        api.disconnect();
    });
    describe('Send extrinsics', () => {
        it('does a GA transfer with keypair via signAndSend', async (done) => {
            const nonce = await api.query.system.accountNonce(alice.address);
            const balanceBefore = await api.query.genericAsset.freeBalance(16000, bob.address);
            const transferAmount = 4124;
            await api.tx.genericAsset.transfer(16000, bob.address, transferAmount).signAndSend(alice, { nonce });
            // Check the change in balance
            await api.query.genericAsset.freeBalance(16000, bob.address, (balanceAfter) => {
                (new bignumber_js_1.default(balanceAfter.toString()).toFixed() == new bignumber_js_1.default(balanceBefore.toString()).plus(transferAmount).toFixed()) ? done() : null;
            });
        });
    });
});
