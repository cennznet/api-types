import { bool } from "@polkadot/types";
declare const _default: {
    rpc: {
        getProposalVotes: {
            description: string;
            params: any[];
            type: string;
        };
    };
    types: {
        ProposalId: string;
        ProposalStatusInfo: {
            _enum: {
                Deliberation: any;
                ApprovedWaitingEnactment: any;
                ApprovedEnacted: typeof bool;
                ApprovedEnactmentCancelled: any;
                Disapproved: any;
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
    };
};
export default _default;
