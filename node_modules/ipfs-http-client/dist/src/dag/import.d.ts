declare function _exports(clientOptions: import("../types").Options): (source: Iterable<Uint8Array> | AsyncIterable<Uint8Array> | AsyncIterable<AsyncIterable<Uint8Array>> | Iterable<AsyncIterable<Uint8Array>>, options?: (import("ipfs-core-types/src/dag").ImportOptions & import("../types").HTTPClientExtraOptions) | undefined) => AsyncIterable<import("ipfs-core-types/src/dag").ImportResult>; /**
 * @typedef {import('../types').HTTPClientExtraOptions} HTTPClientExtraOptions
 * @typedef {import('ipfs-core-types/src/dag').API<HTTPClientExtraOptions>} DAGAPI
 */
export = _exports;
export type HTTPClientExtraOptions = import('../types').HTTPClientExtraOptions;
export type DAGAPI = import('ipfs-core-types/src/dag').API<HTTPClientExtraOptions>;
//# sourceMappingURL=import.d.ts.map