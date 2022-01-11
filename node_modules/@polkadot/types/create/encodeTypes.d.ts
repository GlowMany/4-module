import type { Registry } from '../types/registry';
import type { TypeDef } from './types';
export declare function paramsNotation<T>(outer: string, inner?: T | T[], transform?: (_: T) => string): string;
export declare function encodeTypeDef(registry: Registry, typeDef: TypeDef): string;
export declare function withTypeString(registry: Registry, typeDef: Omit<TypeDef, 'type'>): TypeDef;
