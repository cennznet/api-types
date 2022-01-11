declare const _default: {
    types: {
        FeeExchangeV1: {
            assetId: string;
            maxPayment: string;
        };
        FeeExchange: {
            _enum: {
                FeeExchangeV1: string;
            };
        };
        ChargeTransactionPayment: {
            tip: string;
            feeExchange: string;
        };
    };
};
export default _default;
