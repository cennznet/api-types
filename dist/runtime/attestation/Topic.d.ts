import { Registry } from '@polkadot/types/types';
declare const AttestationTopic_base: import("@polkadot/types/types").Constructor<import("@polkadot/types/interfaces").H256>;
export default class AttestationTopic extends AttestationTopic_base {
    constructor(registry_: Registry, value: string | Uint8Array);
    toString(base?: number): string;
}
export {};
