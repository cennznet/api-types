declare const FeeRate_base: import("@polkadot/types/types").Constructor<import("@polkadot/types").u128>;
export default class FeeRate extends FeeRate_base {
    static readonly SCALE_FACTOR = 1000000;
}
export {};
