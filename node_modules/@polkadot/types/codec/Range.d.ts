import type { AnyTuple, Constructor, INumber, Registry } from '../types';
import { Tuple } from '../codec/Tuple';
declare type RangeType = 'Range' | 'RangeInclusive';
/**
 * @name Range
 * @description
 * Rust `Range<T>` representation
 */
export declare class Range<T extends INumber> extends Tuple {
    #private;
    constructor(registry: Registry, Type: Constructor<T> | string, value?: AnyTuple, rangeName?: RangeType);
    static with<T extends INumber>(Types: Constructor<T> | string): Constructor<Range<T>>;
    /**
     * @description Returns the starting range value
     */
    get start(): T;
    /**
     * @description Returns the ending range value
     */
    get end(): T;
    /**
     * @description Returns the base runtime type name for this instance
     */
    toRawType(): string;
}
export declare class RangeInclusive<T extends INumber = INumber> extends Range<T> {
    constructor(registry: Registry, type: Constructor<T> | string, value?: AnyTuple);
    static with<T extends INumber>(Types: Constructor<T> | string): Constructor<RangeInclusive<T>>;
}
export {};
