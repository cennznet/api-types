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

import Option from '@polkadot/types/codec/Option';
import { ExtrinsicSignatureOptions as ExtrinsicSignatureOptionsBase } from '@polkadot/types/primitive/Extrinsic/types';
import {InterfaceRegistry} from '@polkadot/types/interfaceRegistry';
import {
  AnyU8a,
  ExtrinsicPayloadValue as ExtrinsicPayloadValueBase,
  SignatureOptions as SignatureOptionsBase,
} from '@polkadot/types/types';
import Doughnut from '../Doughnut';
import {ChargeTransactionPayment, FeeExchange} from '../runtime/transaction-payment';
import CENNZnetExtrinsicSignatureV1 from './v1/ExtrinsicSignature';

export interface ExtrinsicSignatureOptions extends ExtrinsicSignatureOptionsBase {
  doughnut?: Option<Doughnut>;
  transactionPayment?: ChargeTransactionPayment;
}

export interface ExtrinsicPayloadValue extends ExtrinsicPayloadValueBase {
  doughnut?: AnyU8a | Option<Doughnut>;
  transactionPayment?: AnyU8a | ChargeTransactionPayment;
}

export interface SignatureOptions extends SignatureOptionsBase {
  doughnut?: AnyU8a | Doughnut;
  transactionPayment?: AnyU8a | ChargeTransactionPayment;
}

export type CennznetInterfaceTypes = keyof InterfaceRegistry;

// TODO: This should be generated using upstream script, not done this way
// Merge the [[InterfaceRegistry]] definition from `@polkadot/types/interfaceRegistry` with CENNZnet types
declare module '@polkadot/types/interfaceRegistry' {
  interface InterfaceRegistry {
    // Add types that only CENNZnet knows about.
    // TS will merge them into the polkadot provided [[InterfaceRegistry]]
    Doughnut: Doughnut;
    'Option<Doughnut>': Option<Doughnut>;
    ChargeTransactionPayment;
    FeeExchange: FeeExchange;
    'Option<FeeExchange>': Option<FeeExchange>;
    CENNZnetExtrinsicSignatureV1;
  }
}
