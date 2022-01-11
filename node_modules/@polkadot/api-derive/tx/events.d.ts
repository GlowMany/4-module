import type { Observable } from 'rxjs';
import type { ApiInterfaceRx } from '@polkadot/api/types';
import type { EventRecord, Hash, SignedBlock } from '@polkadot/types/interfaces';
interface Result {
    block: SignedBlock;
    events: EventRecord[];
}
export declare function events(instanceId: string, api: ApiInterfaceRx): (at: Hash) => Observable<Result>;
export {};
