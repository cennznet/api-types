import { bool } from "@polkadot/types";
declare const _default: {
    rpc: {
        getProposalVotes: {
            description: string;
            params: never[];
            type: string;
        };
    };
    types: {
        ProposalId: string;
        ProposalStatusInfo: {
            _enum: {
                Deliberation: null;
                ReferendumDeliberation: null;
                ApprovedWaitingEnactment: null;
                ApprovedEnacted: typeof bool;
                ApprovedEnactmentCancelled: null;
                Disapproved: null;
                ReferendumVetoed: null;
            };
        };
        ProposalVoteInfo: {
            voteBits: string;
            activeBits: string;
        };
        ProposalVotes: {
            proposalId: string;
            votes: string;
        };
        GovernanceProposal: {
            sponsor: string;
            justificationUri: string;
            enactmentDelay: string;
        };
        ReferendumVoteCount: {
            vote: string;
        };
    };
};
export default _default;
