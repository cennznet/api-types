"use strict";
// CENNZnet specific staking types, the rest will be resolved from @polkadot/types
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    rpc: {
        accruedPayout: {
            description: 'Retrieves the currently accrued reward for the specified stash',
            params: [
                {
                    stash: 'stash',
                    type: 'AccountId',
                },
            ],
            type: 'u64',
        },
    },
    types: {
        RewardBalance: 'Balance',
        RewardBalanceOf: 'Balance',
        RewardDestination: {
            _enum: {
                Stash: 'Null',
                Controller: 'Null',
                Account: 'AccountId',
            },
        },
        VecDeque: 'Vec<u64>'
    },
};
