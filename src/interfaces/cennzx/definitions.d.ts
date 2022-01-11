declare const _default: {
    rpc: {
        buyPrice: {
            description: string;
            params: {
                name: string;
                type: string;
            }[];
            type: string;
        };
        sellPrice: {
            description: string;
            params: {
                name: string;
                type: string;
            }[];
            type: string;
        };
        liquidityPrice: {
            description: string;
            params: {
                name: string;
                type: string;
            }[];
            type: string;
        };
        liquidityValue: {
            description: string;
            params: {
                name: string;
                type: string;
            }[];
            type: string;
        };
    };
    types: {
        ExchangeKey: string;
        FeeRate: string;
        LiquidityValueResponse: {
            liquidity: string;
            core: string;
            asset: string;
        };
        PriceResponse: {
            price: string;
        };
        LiquidityPriceResponse: {
            core: string;
            asset: string;
        };
    };
};
export default _default;
