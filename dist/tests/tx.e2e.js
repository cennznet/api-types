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
const injects_1 = require("@cennznet-api-types/dist/injects");
const api_1 = require("@polkadot/api");
const types_1 = require("@polkadot/types");
const util_crypto_1 = require("@polkadot/util-crypto");
describe('e2e transactions', () => {
    let api;
    let alice, bob;
    const registry = new types_1.TypeRegistry();
    beforeAll(async () => {
        await util_crypto_1.cryptoWaitReady();
        const keyring = new api_1.Keyring({ type: 'sr25519' });
        alice = keyring.addFromUri('//Alice');
        bob = keyring.addFromUri('//Bob');
        api = await api_1.ApiPromise.create({
            provider: new api_1.WsProvider('ws://localhost:9944'),
            types: {
                ...injects_1.default,
            },
            registry
        });
    });
    afterAll(async () => {
        api.disconnect();
    });
    describe('Send extrinsics', () => {
        it('does a GA transfer with keypair via send', async (done) => {
            const nonce = await api.query.system.accountNonce(alice.address);
            const tx = api.tx.genericAsset.transfer(16001, bob.address, 123).sign(alice, { nonce });
            await tx.send(async ({ events, status }) => {
                if (status.isFinalized) {
                    expect(events[0].event.method).toEqual('Transferred');
                    expect(events[0].event.section).toEqual('genericAsset');
                    done();
                }
            });
        });
        it('does a GA transfer with keypair via signAndSend', async (done) => {
            await api.tx.genericAsset.transfer(16001, bob.address, 123).signAndSend(alice, async ({ events, status }) => {
                if (status.isFinalized) {
                    expect(events[0].event.method).toEqual('Transferred');
                    expect(events[0].event.section).toEqual('genericAsset');
                    done();
                }
            });
        });
    });
});
