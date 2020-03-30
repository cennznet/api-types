// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import { Raw } from '@polkadot/types/codec';
import { u64 } from '@polkadot/types/primitive';
import { AccountId } from '@polkadot/types/interfaces/runtime';

/** @name Address */
export interface Address extends AccountId {}

/** @name Doughnut */
export interface Doughnut extends Raw {}

/** @name Index */
export interface Index extends u64 {}

export type PHANTOM_SYSTEM = 'system';
