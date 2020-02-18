import { Struct } from '@polkadot/types';
import { Registry } from '@polkadot/types/types';
import Owner from './Owner';
/**
 * alias for PermissionLatest and PermissionOptions
 */
export default class PermissionsV1 extends Struct {
    constructor(registry: Registry, value: any);
    get update(): Owner;
    get mint(): Owner;
    get burn(): Owner;
}
