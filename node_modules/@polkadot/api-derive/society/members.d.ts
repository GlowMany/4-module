import type { Observable } from 'rxjs';
import type { ApiInterfaceRx } from '@polkadot/api/types';
import type { AccountId } from '@polkadot/types/interfaces';
import type { DeriveSocietyMember } from '../types';
export declare function _members(instanceId: string, api: ApiInterfaceRx): (accountIds: AccountId[]) => Observable<DeriveSocietyMember[]>;
/**
 * @description Get the member info for a society
 */
export declare function members(instanceId: string, api: ApiInterfaceRx): () => Observable<DeriveSocietyMember[]>;
