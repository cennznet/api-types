import type { AccountId, BlockNumber } from '@cennznet/api-types/interfaces/runtime';
import type { Bytes, Enum, Option, Struct, Vec, bool, u128, u64, u8 } from '@polkadot/types-codec';
import type { ITuple } from '@polkadot/types-codec/types';
/** @name GovernanceProposal */
export interface GovernanceProposal extends Struct {
    readonly sponsor: AccountId;
    readonly justificationUri: Bytes;
    readonly enactmentDelay: BlockNumber;
}
/** @name ProposalId */
export interface ProposalId extends u64 {
}
/** @name ProposalStatusInfo */
export interface ProposalStatusInfo extends Enum {
    readonly isDeliberation: boolean;
    readonly isReferendumDeliberation: boolean;
    readonly isApprovedWaitingEnactment: boolean;
    readonly isApprovedEnactmentCancelled: boolean;
    readonly isDisapproved: boolean;
    readonly isReferendumVetoed: boolean;
    readonly type: 'Deliberation' | 'ReferendumDeliberation' | 'ApprovedWaitingEnactment' | 'ApprovedEnactmentCancelled' | 'Disapproved' | 'ReferendumVetoed';
}
/** @name ProposalVoteInfo */
export interface ProposalVoteInfo extends Struct {
    readonly voteBits: ITuple<[u128, u128]>;
    readonly activeBits: ITuple<[u128, u128]>;
}
/** @name ProposalVotes */
export interface ProposalVotes extends Struct {
    readonly proposalId: ProposalId;
    readonly votes: Vec<ITuple<[AccountId, Option<bool>]>>;
}
/** @name ReferendumVoteCount */
export interface ReferendumVoteCount extends Struct {
    readonly vote: u8;
}
export declare type PHANTOM_GOVERNANCE = 'governance';
