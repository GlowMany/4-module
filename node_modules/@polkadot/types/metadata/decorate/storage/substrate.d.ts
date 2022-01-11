import type { StorageEntry } from '../../../primitive/types';
import type { Registry } from '../../../types';
declare type Creator = (registry: Registry) => StorageEntry;
export declare const substrate: Record<string, Creator>;
export {};
