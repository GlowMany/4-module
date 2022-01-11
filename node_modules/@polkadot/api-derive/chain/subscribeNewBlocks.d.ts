import type { Observable } from 'rxjs';
import type { ApiInterfaceRx } from '@polkadot/api/types';
import type { SignedBlockExtended } from '../type/types';
/**
 * @name subscribeNewBlocks
 * @returns The latest block & events for that block
 */
export declare function subscribeNewBlocks(instanceId: string, api: ApiInterfaceRx): () => Observable<SignedBlockExtended>;
