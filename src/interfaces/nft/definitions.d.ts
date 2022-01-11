declare const _default: {
    rpc: {
        collectedTokens: {
            description: string;
            params: {
                name: string;
                type: string;
            }[];
            type: string;
        };
    };
    types: {
        TokenId: string;
        AuctionClosureReason: {
            _enum: {
                ExpiredNoBids: any;
                SettlementFailed: any;
                VendorCancelled: any;
            };
        };
        AuctionListing: {
            paymentAsset: string;
            reservePrice: string;
            close: string;
            seller: string;
            tokens: string;
            royaltiesSchedule: string;
        };
        CollectionId: string;
        CollectionNameType: string;
        FixedPriceListing: {
            paymentAsset: string;
            fixedPrice: string;
            close: string;
            buyer: string;
            seller: string;
            tokens: string;
            royaltiesSchedule: string;
        };
        Listing: {
            _enum: {
                FixedPrice: string;
                Auction: string;
            };
        };
        ListingId: string;
        MetadataBaseURI: {
            _enum: {
                Ipfs: any;
                Https: string;
            };
        };
        NFTAttributeValue: {
            _enum: {
                i32: string;
                u8: string;
                u16: string;
                u32: string;
                u64: string;
                u128: string;
                Bytes32: string;
                Bytes: string;
                String: string;
                Hash: string;
                Timestamp: string;
                Url: string;
            };
        };
        Reason: string;
        RoyaltiesSchedule: {
            entitlements: string;
        };
        SeriesId: string;
        SerialNumber: string;
        TokenCount: string;
    };
};
export default _default;
