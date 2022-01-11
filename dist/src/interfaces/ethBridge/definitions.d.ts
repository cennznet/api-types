declare const _default: {
    types: {
        EventProofId: string;
        EventClaimId: string;
        EthAddress: string;
        EthHash: string;
        EventTypeId: string;
        Erc20DepositEvent: {
            tokenAddress: string;
            amount: string;
            beneficiary: string;
        };
        EventClaimResult: {
            _enum: {
                Valid: null;
                DataProviderErr: null;
                TxStatusFailed: null;
                UnexpectedContractAddress: null;
                NoTxLogs: null;
                NotEnoughConfirmations: null;
                UnexpectedData: null;
                Expired: null;
            };
        };
        NotarizationPayload: {
            eventClaimId: string;
            authorityIndex: string;
            result: string;
        };
        Details: string;
    };
};
export default _default;
