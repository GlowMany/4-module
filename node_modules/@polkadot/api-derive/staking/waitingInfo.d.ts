import type { Observable } from 'rxjs';
import type { ApiInterfaceRx } from '@polkadot/api/types';
import type { DeriveStakingWaiting, StakingQueryFlags } from '../types';
export declare function waitingInfo(instanceId: string, api: ApiInterfaceRx): (flags?: StakingQueryFlags) => Observable<DeriveStakingWaiting>;
