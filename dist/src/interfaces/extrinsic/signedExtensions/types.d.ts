import { InterfaceTypes } from '@polkadot/types/types';
export declare type ExtTypes = Record<string, keyof InterfaceTypes>;
export declare type ExtInfo = {
    extrinsic: ExtTypes;
    payload: ExtTypes;
};
export declare type ExtDef = Record<string, ExtInfo>;
