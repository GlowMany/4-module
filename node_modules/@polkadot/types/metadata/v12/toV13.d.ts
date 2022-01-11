import type { MetadataV12, MetadataV13 } from '../../interfaces/metadata';
import type { Registry } from '../../types';
/**
 * @internal
 **/
export declare function toV13(registry: Registry, metadata: MetadataV12): MetadataV13;
