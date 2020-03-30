"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    types: {
        FeeExchangeV1: {
            assetId: 'Compact<AssetId>',
            maxPayment: 'Compact<Balance>',
        },
        FeeExchange: {
            _enum: { FeeExchangeV1: 'FeeExchangeV1' }
        },
        ChargeTransactionPayment: {
            tip: 'Compact<Balance>',
            feeExchange: 'Option<FeeExchange>',
        },
    }
};
