"use strict";
// Copyright 2019 Centrality Investments Limited
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@polkadot/types");
const util_1 = require("@polkadot/util");
const GROUP_JSON_MAP = new Map([['groupId', 'group_id']]);
const MEMBER_JSON_MAP = new Map([['userId', 'user_id']]);
const INVITE_JSON_MAP = new Map([
    ['peerId', 'peer_id'],
    ['inviteData', 'invite_data'],
    ['inviteKey', 'invite_key'],
]);
const PENDING_INVITE_JSON_MAP = new Map([['inviteKey', 'invite_key']]);
class Meta extends types_1.Vec.with(types_1.Tuple.with([types_1.Text, types_1.Text])) {
}
exports.Meta = Meta;
class MemberRoles extends types_1.Enum.with(['AdminRole', 'MemberRole']) {
}
exports.MemberRoles = MemberRoles;
class Member extends types_1.Struct {
    constructor(registry, value) {
        super(registry, { userId: 'AccountId', roles: types_1.Vec.with(MemberRoles), meta: Meta }, value, MEMBER_JSON_MAP);
    }
    toJSON() {
        return {
            user_id: util_1.u8aToHex(this.get('userId').toU8a(), -1, false),
            roles: this.get('roles').toJSON(),
            meta: this.get('meta').toJSON(),
        };
    }
}
exports.Member = Member;
class Group extends types_1.Struct {
    constructor(registry, value) {
        super(registry, {
            groupId: 'H256',
            members: types_1.Vec.with(Member),
            invites: types_1.Vec.with(PendingInvite),
            meta: Meta,
        }, value, GROUP_JSON_MAP);
    }
}
exports.Group = Group;
class Invite extends types_1.Struct {
    constructor(registry, value) {
        super(registry, {
            peerId: 'AccountId',
            inviteData: 'Bytes',
            inviteKey: 'H256',
            meta: Meta,
            roles: types_1.Vec.with(MemberRoles),
        }, value, INVITE_JSON_MAP);
    }
}
exports.Invite = Invite;
class PendingInvite extends types_1.Struct {
    constructor(registry, value) {
        super(registry, { inviteKey: 'H256', meta: Meta, roles: types_1.Vec.with(MemberRoles) }, value, PENDING_INVITE_JSON_MAP);
    }
    toJSON() {
        return {
            invite_key: util_1.u8aToHex(this.get('inviteKey').toU8a(), -1, false),
            meta: this.get('meta').toJSON(),
            roles: this.get('roles').toJSON(),
        };
    }
}
exports.PendingInvite = PendingInvite;
class AcceptPayload extends types_1.Struct {
    constructor(registry, value) {
        super(registry, { account_id: 'AccountId' }, value);
    }
}
exports.AcceptPayload = AcceptPayload;
const registry = new types_1.TypeRegistry();
class DeviceId extends types_1.ClassOf(registry, 'u32') {
}
exports.DeviceId = DeviceId;
class PreKeyBundle extends types_1.ClassOf(registry, 'Bytes') {
    constructor(values) {
        super(values);
    }
}
exports.PreKeyBundle = PreKeyBundle;
// Response enum constructors
class DeviceIdResponse extends DeviceId {
}
class WithdrawnPreKeyBundle extends types_1.Tuple.with(['AccountId', 'u32', 'Bytes']) {
    constructor(values) {
        super(values);
    }
    toJSON() {
        const values = this.toArray();
        const [accountId, deviceId, pkb] = values;
        return [util_1.u8aToHex(accountId.toU8a(), -1, false), deviceId.toJSON(), util_1.u8aToHex(pkb.toU8a(true))];
    }
}
class PreKeyBundlesResponse extends types_1.Vec.with(WithdrawnPreKeyBundle) {
}
class Response extends types_1.Enum.with({ DeviceIdResponse, PreKeyBundlesResponse }) {
}
exports.Response = Response;
class VaultKey extends types_1.ClassOf(registry, 'Bytes') {
}
exports.VaultKey = VaultKey;
class VaultValue extends types_1.ClassOf(registry, 'Bytes') {
}
exports.VaultValue = VaultValue;
