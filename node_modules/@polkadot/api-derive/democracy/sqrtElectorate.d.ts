/// <reference types="bn.js" />
import type { Observable } from 'rxjs';
import type { ApiInterfaceRx } from '@polkadot/api/types';
import type { BN } from '@polkadot/util';
export declare function sqrtElectorate(instanceId: string, api: ApiInterfaceRx): () => Observable<BN>;
