import { ApiInterfaceRx } from '@polkadot/api/types';
import { Observable } from 'rxjs';
export declare function account(instanceId: string, api: ApiInterfaceRx): (address: string) => Observable<any>;
