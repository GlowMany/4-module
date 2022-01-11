import type { Observable } from 'rxjs';
import type { ApiInterfaceRx } from '@polkadot/api/types';
import type { DeriveBounties } from '../types';
export declare function bounties(instanceId: string, api: ApiInterfaceRx): () => Observable<DeriveBounties>;
