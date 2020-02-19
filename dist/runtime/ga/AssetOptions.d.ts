import { Struct } from '@polkadot/types';
import { Balance } from '@polkadot/types/interfaces';
import { Registry } from '@polkadot/types/types';
import PermissionLatest from './PermissionsV1';
export default class AssetOptions extends Struct {
    constructor(registry: Registry, value: any);
    get initialIssuance(): Balance;
    get permissions(): PermissionLatest;
}
