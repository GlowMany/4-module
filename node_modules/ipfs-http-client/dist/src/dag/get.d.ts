declare function _exports(codecs: import('ipfs-core-utils/src/multicodecs'), options: import('../types').Options): (cid: import("multiformats").CID, options?: (import("ipfs-core-types/src/dag").GetOptions & import("../types").HTTPClientExtraOptions) | undefined) => Promise<import("ipfs-core-types/src/dag").GetResult>;
export = _exports;
export type HTTPClientExtraOptions = import('../types').HTTPClientExtraOptions;
export type DAGAPI = import('ipfs-core-types/src/dag').API<HTTPClientExtraOptions>;
//# sourceMappingURL=get.d.ts.map