import type { MetadataV11, MetadataV12 } from '../../interfaces/metadata';
import type { Registry } from '../../types';
/**
 * @internal
 **/
export declare function toV12(registry: Registry, { extrinsic, modules }: MetadataV11): MetadataV12;
