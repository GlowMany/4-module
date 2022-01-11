import type { Codec, DetectCodec, Registry } from '../types';
import type { CreateOptions } from './types';
export declare function createTypeUnsafe<T extends Codec = Codec, K extends string = string>(registry: Registry, type: K, params?: unknown[], options?: CreateOptions): DetectCodec<T, K>;
/**
 * Create an instance of a `type` with a given `params`.
 * @param type - A recognizable string representing the type to create an
 * instance from
 * @param params - The value to instantiate the type with
 */
export declare function createType<T extends Codec = Codec, K extends string = string>(registry: Registry, type: K, ...params: unknown[]): DetectCodec<T, K>;
