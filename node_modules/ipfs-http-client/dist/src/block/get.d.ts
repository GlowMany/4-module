declare function _exports(clientOptions: import("../types").Options): (cid: import("multiformats").CID, options?: (import("ipfs-core-types/src/utils").AbortOptions & import("ipfs-core-types/src/utils").PreloadOptions & import("../types").HTTPClientExtraOptions) | undefined) => Promise<Uint8Array>;
export = _exports;
export type HTTPClientExtraOptions = import('../types').HTTPClientExtraOptions;
export type BlockAPI = import('ipfs-core-types/src/block').API<HTTPClientExtraOptions>;
//# sourceMappingURL=get.d.ts.map