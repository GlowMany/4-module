import type { Constructor, Registry } from '../../types';
/**
 * @description takes an input map of the form `{ [string]: string | Constructor }` and returns a map of `{ [string]: Constructor }`
 */
export declare function mapToTypeMap(registry: Registry, input: Record<string, string | Constructor>): Record<string, Constructor>;
