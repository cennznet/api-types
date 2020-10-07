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

import CENNZnetTypes from '../src/interfaces/injects';
import {ApiPromise, WsProvider} from '@polkadot/api';
import { TypeRegistry } from '@polkadot/types';
import {cryptoWaitReady} from '@polkadot/util-crypto';
import * as balances from '../src/balances';
import Keyring from "@polkadot/keyring";

import {Balance} from "@polkadot/types/interfaces";
import BN from 'bignumber.js';

describe('e2e transactions', () => {
  let api: ApiPromise;
  let alice, bob;
  const registry = new TypeRegistry();

  beforeAll(async () => {
    await cryptoWaitReady();
    const keyring = new Keyring({ type: 'sr25519' });
    alice = keyring.addFromUri('//Alice');
    bob = keyring.addFromUri('//Bob');
    const derives = { balances };

    api = await ApiPromise.create({
      provider: new WsProvider('ws://localhost:9944'),
      types: {
        ...CENNZnetTypes,
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

    it('does a GA transfer with keypair via signAndSend', async done => {
      const nonce = await api.query.system.accountNonce(alice.address);
      const balanceBefore = await api.query.genericAsset.freeBalance(16000, bob.address);
      const transferAmount = 4124;
      await api.tx.genericAsset.transfer(16000, bob.address, transferAmount).signAndSend(alice, {nonce});
      // Check the change in balance
      await api.query.genericAsset.freeBalance(16000, bob.address, (balanceAfter: Balance) => {
          (new BN(balanceAfter.toString()).toFixed() == new BN(balanceBefore.toString()).plus(transferAmount).toFixed()) ? done() : null
        });
    });
  });
});
