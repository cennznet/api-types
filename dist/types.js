// // Copyright 2019-2020 Centrality Investments Limited
// //
// // Licensed under the Apache License, Version 2.0 (the "License");
// // you may not use this file except in compliance with the License.
// // You may obtain a copy of the License at
// //
// //     http://www.apache.org/licenses/LICENSE-2.0
// //
// // Unless required by applicable law or agreed to in writing, software
// // distributed under the License is distributed on an "AS IS" BASIS,
// // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// // See the License for the specific language governing permissions and
// // limitations under the License.
// // Export CENNZnet types and setup some TS definitions
// import { Option } from '@polkadot/types';
// import {InterfaceRegistry} from '@polkadot/types/interfaceRegistry';
// import Doughnut from './Doughnut';
// import { ChargeTransactionPayment, FeeExchange } from './runtime';
// import { CENNZnetExtrinsicPayloadV1, CENNZnetExtrinsicSignatureV1 } from './extrinsic';
// export type CennznetInterfaceTypes = keyof InterfaceRegistry;
// // TODO: This should be generated using upstream script, not done this way
// // Merge the [[InterfaceRegistry]] definition from `@polkadot/types/interfaceRegistry` with CENNZnet types
// declare module '@polkadot/types/interfaceRegistry' {
//   interface InterfaceRegistry {
//     // Add types that only CENNZnet knows about.
//     // TS will merge them into the polkadot provided [[InterfaceRegistry]]
//     Doughnut: Doughnut;
//     'Option<Doughnut>': Option<Doughnut>;
//     ChargeTransactionPayment: ChargeTransactionPayment;
//     FeeExchange: FeeExchange;
//     'Option<FeeExchange>': Option<FeeExchange>;
//     CENNZnetExtrinsicPayloadV1: CENNZnetExtrinsicPayloadV1;
//     CENNZnetExtrinsicSignatureV1: CENNZnetExtrinsicSignatureV1;
//   }
// }
// export * from './runtime';
// export {default as Doughnut} from './Doughnut';
// export {
//   ExtrinsicSignatureOptions,
//   SignatureOptions,
// } from './extrinsic/types';
// export {
// 	AccountId,
// 	AccountId as Address // Address == AccountId in CENNZnet
// } from '@polkadot/types/interfaces';
// // The CENNZnet nonce type
// export {
// 	u64 as Index,
// 	u64 as Nonce
// } from '@polkadot/types';
