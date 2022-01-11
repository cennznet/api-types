"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// CENNZnet specific system types
exports.default = {
    types: {
        BeefyKey: '[u8; 33]',
        doughnut: 'Raw',
        PhaseTo36: {
            _enum: {
                ApplyExtrinsic: 'u32',
                Finalization: 'Null',
            },
        },
        DispatchClassTo36: {
            _enum: ['Normal', 'Operational'],
        },
        WeightTo36: 'u32',
        DispatchInfoTo36: {
            weight: 'WeightTo36',
            class: 'DispatchClassTo36',
            paysFee: 'bool',
        },
        PalletId: 'LockIdentifier',
        BabeEpochConfiguration: {
            c: '(u64, u64)',
            allowedSlots: 'AllowedSlots'
        },
    },
};
