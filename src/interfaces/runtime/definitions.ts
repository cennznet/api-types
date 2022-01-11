import definitions from '@polkadot/types/interfaces/runtime/definitions';

export default {
    types: {
      "AssetId": "u32",
      "Balance": "u128",
      "Index": "u64",
      ...definitions.types,
    }
};
