import type { LockIdentifier } from '@cennznet/api-types/interfaces/runtime';
import type { Enum, Raw, Struct, U8aFixed, bool, u32, u64 } from '@polkadot/types-codec';
import type { ITuple } from '@polkadot/types-codec/types';
import type { AllowedSlots } from '@polkadot/types/interfaces/babe';
/** @name BabeEpochConfiguration */
export interface BabeEpochConfiguration extends Struct {
    readonly c: ITuple<[u64, u64]>;
    readonly allowedSlots: AllowedSlots;
}
/** @name BeefyKey */
export interface BeefyKey extends U8aFixed {
}
/** @name DispatchClassTo36 */
export interface DispatchClassTo36 extends Enum {
    readonly isNormal: boolean;
    readonly isOperational: boolean;
    readonly type: 'Normal' | 'Operational';
}
/** @name DispatchInfoTo36 */
export interface DispatchInfoTo36 extends Struct {
    readonly weight: WeightTo36;
    readonly class: DispatchClassTo36;
    readonly paysFee: bool;
}
/** @name doughnut */
export interface doughnut extends Raw {
}
/** @name PalletId */
export interface PalletId extends LockIdentifier {
}
/** @name PhaseTo36 */
export interface PhaseTo36 extends Enum {
    readonly isApplyExtrinsic: boolean;
    readonly asApplyExtrinsic: u32;
    readonly isFinalization: boolean;
    readonly type: 'ApplyExtrinsic' | 'Finalization';
}
/** @name WeightTo36 */
export interface WeightTo36 extends u32 {
}
export declare type PHANTOM_SYSTEM = 'system';
