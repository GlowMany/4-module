import type { Codec, Constructor } from '../types';
import { CodecMap } from './Map';
export declare class HashMap<K extends Codec = Codec, V extends Codec = Codec> extends CodecMap<K, V> {
    static with<K extends Codec, V extends Codec>(keyType: Constructor<K> | string, valType: Constructor<V> | string): Constructor<CodecMap<K, V>>;
}
