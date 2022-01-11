declare const _default: {
    rpc: {
        registeredAssets: {
            description: string;
            params: any[];
            type: string;
        };
    };
    types: {
        AssetOptions: {
            initialIssuance: string;
            permissions: string;
        };
        AssetInfoV40: {
            symbol: string;
            decimalPlaces: string;
        };
        AssetInfoV41: {
            symbol: string;
            decimalPlaces: string;
            existentialDeposit: string;
        };
        Owner: {
            _enum: {
                None: string;
                Address: string;
            };
        };
        PermissionsV1: {
            update: string;
            mint: string;
            burn: string;
        };
        PermissionVersions: {
            _enum: {
                V1: string;
            };
        };
        PermissionLatest: string;
        WithdrawReasons: {
            _set: {
                TransactionPayment: number;
                Transfer: number;
                Reserve: number;
                Fee: number;
                Tip: number;
            };
        };
        BalanceLock: {
            id: string;
            amount: string;
            reasons: string;
        };
    };
};
export default _default;
