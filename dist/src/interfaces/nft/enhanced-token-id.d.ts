import { Struct } from '@polkadot/types';
import { Codec, Registry } from '@polkadot/types/types';
import { CollectionId, SerialNumber, SeriesId } from './types';
interface TokenIdValue {
    collectionId: string | number;
    seriesId: string | number;
    serialNumber: string | number;
}
export declare class EnhancedTokenId extends Struct implements Codec {
    constructor(registry: Registry, value?: TokenIdValue | [number, number, number] | any);
    /**
    * @description The collection the token belongs to
    */
    get collectionId(): CollectionId;
    /**
    * @description The collection series the token belongs to
    */
    get seriesId(): SeriesId;
    /**
    * @description The series number the token is in
    */
    get serialNumber(): SerialNumber;
    /**
    * @description Return the hex representation of the Id
    */
    toHex(): string;
    /**
    * @description Return the hex representation of the Id
    */
    toString(): string;
    /**
    * @description Returns the base runtime type name for this instance
    */
    toRawType(): string;
}
export {};
