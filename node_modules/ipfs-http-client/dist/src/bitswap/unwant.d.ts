declare function _exports(clientOptions: import("../types").Options): (cid: import("multiformats").CID | import("multiformats").CID[], options?: (import("ipfs-core-types/src/utils").AbortOptions & import("../types").HTTPClientExtraOptions) | undefined) => Promise<void>;
export = _exports;
export type HTTPClientExtraOptions = import('../types').HTTPClientExtraOptions;
export type BitswapAPI = import('ipfs-core-types/src/bitswap').API<HTTPClientExtraOptions>;
//# sourceMappingURL=unwant.d.ts.map