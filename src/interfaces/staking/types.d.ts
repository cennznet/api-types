import type { Enum, Vec, u64 } from '@polkadot/types';
import type { AccountId, Balance } from '@polkadot/types/interfaces/runtime';
/** @name RewardBalance */
export interface RewardBalance extends Balance {
}
/** @name RewardBalanceOf */
export interface RewardBalanceOf extends Balance {
}
/** @name RewardDestination */
export interface RewardDestination extends Enum {
    readonly isStash: boolean;
    readonly isController: boolean;
    readonly isAccount: boolean;
    readonly asAccount: AccountId;
}
/** @name VecDeque */
export interface VecDeque extends Vec<u64> {
}
export declare type PHANTOM_STAKING = 'staking';
