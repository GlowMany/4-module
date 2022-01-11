import type { FunctionMetadataLatest } from '../../../interfaces';
import type { CallFunction, Registry } from '../../../types';
/** @internal */
export declare function createUnchecked(registry: Registry, section: string, callIndex: Uint8Array, callMetadata: FunctionMetadataLatest): CallFunction;
