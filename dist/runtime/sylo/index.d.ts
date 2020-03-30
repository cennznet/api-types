import { Enum, Struct, Tuple, Vec } from '@polkadot/types';
import { Registry } from '@polkadot/types/types';
declare const Meta_base: import("@polkadot/types/types").Constructor<Vec<Tuple>>;
export declare class Meta extends Meta_base {
}
declare const MemberRoles_base: import("@polkadot/types/codec/Enum").EnumConstructor<Enum>;
export declare class MemberRoles extends MemberRoles_base {
}
export declare class Member extends Struct {
    constructor(registry: Registry, value: any);
    toJSON(): {
        user_id: string;
        roles: import("@polkadot/types/types").AnyJson;
        meta: import("@polkadot/types/types").AnyJson;
    };
}
export declare class Group extends Struct {
    constructor(registry: Registry, value: any);
}
export declare class Invite extends Struct {
    constructor(registry: Registry, value: any);
}
export declare class PendingInvite extends Struct {
    constructor(registry: Registry, value: any);
    toJSON(): {
        invite_key: string;
        meta: import("@polkadot/types/types").AnyJson;
        roles: import("@polkadot/types/types").AnyJson;
    };
}
export declare class AcceptPayload extends Struct {
    constructor(registry: Registry, value: any);
}
declare const DeviceId_base: import("@polkadot/types/types").Constructor<import("@polkadot/types").u32>;
export declare class DeviceId extends DeviceId_base {
}
declare const PreKeyBundle_base: import("@polkadot/types/types").Constructor<import("@polkadot/types").Bytes>;
export declare class PreKeyBundle extends PreKeyBundle_base {
    constructor(values: any);
}
declare const Response_base: import("@polkadot/types/codec/Enum").EnumConstructor<Enum>;
export declare class Response extends Response_base {
}
declare const VaultKey_base: import("@polkadot/types/types").Constructor<import("@polkadot/types").Bytes>;
export declare class VaultKey extends VaultKey_base {
}
declare const VaultValue_base: import("@polkadot/types/types").Constructor<import("@polkadot/types").Bytes>;
export declare class VaultValue extends VaultValue_base {
}
export {};
