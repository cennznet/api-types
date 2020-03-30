declare const _default: {
    types: {
        Meta: string;
        MemberRoles: {
            _enum: string[];
        };
        Member: {
            userId: string;
            roles: string;
            meta: string;
        };
        Group: {
            groupId: string;
            members: string;
            invites: string;
            meta: string;
        };
        Invite: {
            peerId: string;
            inviteData: string;
            inviteKey: string;
            meta: string;
            roles: string;
        };
        PendingInvite: {
            inviteKey: string;
            meta: string;
            roles: string;
        };
        AcceptPayload: {
            accountId: string;
        };
        DeviceId: string;
        PreKeyBundle: string;
        DeviceIdResponse: string;
        WithdrawnPreKeyBundle: string;
        PreKeyBundlesResponse: string;
        Response: {
            _enum: {
                DeviceIdResponse: string;
                PreKeyBundlesResponse: string;
            };
        };
        VaultKey: string;
        VaultValue: string;
    };
};
export default _default;
