import type { Observable } from 'rxjs';
import type { ApiInterfaceRx } from '@polkadot/api/types';
import type { DeriveParachain } from '../types';
export declare function overview(instanceId: string, api: ApiInterfaceRx): () => Observable<DeriveParachain[]>;
