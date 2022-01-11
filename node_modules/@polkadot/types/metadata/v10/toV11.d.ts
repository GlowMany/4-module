import type { MetadataV10, MetadataV11 } from '../../interfaces/metadata';
import type { Registry } from '../../types';
/** @internal */
export declare function toV11(registry: Registry, { modules }: MetadataV10): MetadataV11;
