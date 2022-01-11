declare const _default: {
    rpc: {
        subscribeEventProofs: {
            description: string;
            params: never[];
            pubsub: string[];
            type: string;
        };
        getEventProof: {
            description: string;
            params: {
                name: string;
                type: string;
            }[];
            type: string;
        };
    };
    types: {
        VersionedEventProof: {
            _enum: {
                sentinel: null;
                EventProof: string;
            };
        };
        EthyId: string;
        EthyEventId: string;
        EventProof: {
            digest: string;
            eventId: string;
            validatorSetId: string;
            signatures: string;
            blockHash: string;
            tag: string;
        };
    };
};
export default _default;
