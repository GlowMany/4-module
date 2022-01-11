import type { MetadataV9, MetadataV10 } from '../../interfaces/metadata';
import type { Registry } from '../../types';
/** @internal */
export declare function toV10(registry: Registry, { modules }: MetadataV9): MetadataV10;
