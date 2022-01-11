import type { Observable } from 'rxjs';
import type { ApiInterfaceRx } from '@polkadot/api/types';
import type { DeriveStakingElected, StakingQueryFlags } from '../types';
export declare function electedInfo(instanceId: string, api: ApiInterfaceRx): (flags?: StakingQueryFlags) => Observable<DeriveStakingElected>;
