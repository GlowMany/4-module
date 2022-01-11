import type { AnyNumber, Registry } from '../types';
import { U32 } from '../primitive';
export declare const MAGIC_NUMBER = 1635018093;
export declare class MagicNumber extends U32 {
    constructor(registry: Registry, value?: AnyNumber);
}
