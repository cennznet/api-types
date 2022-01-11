declare const _default: {
    rpc: {
        accruedPayout: {
            description: string;
            params: {
                stash: string;
                type: string;
            }[];
            type: string;
        };
    };
    types: {
        RewardBalance: string;
        RewardBalanceOf: string;
        RewardDestination: {
            _enum: {
                Stash: string;
                Controller: string;
                Account: string;
            };
        };
        VecDeque: string;
    };
};
export default _default;
