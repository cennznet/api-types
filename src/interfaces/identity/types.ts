// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Data } from '@polkadot/types';
import type { Option, Struct, U8aFixed, Vec } from '@polkadot/types-codec';
import type { ITuple } from '@polkadot/types-codec/types';

/** @name IdentityInfo */
export interface IdentityInfo extends Struct {
  readonly additional: Vec<ITuple<[Data, Data]>>;
  readonly legal: Data;
  readonly web: Data;
  readonly discord: Data;
  readonly email: Data;
  readonly pgp_fingerprint: Option<U8aFixed>;
  readonly image: Data;
  readonly twitter: Data;
}

export type PHANTOM_IDENTITY = 'identity';
