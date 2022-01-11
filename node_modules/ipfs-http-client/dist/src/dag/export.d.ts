declare function _exports(clientOptions: import("../types").Options): (root: import("multiformats").CID, options?: (import("ipfs-core-types/src/dag").ExportOptions & import("../types").HTTPClientExtraOptions) | undefined) => AsyncIterable<Uint8Array>;
export = _exports;
export type HTTPClientExtraOptions = import('../types').HTTPClientExtraOptions;
export type DAGAPI = import('ipfs-core-types/src/dag').API<HTTPClientExtraOptions>;
//# sourceMappingURL=export.d.ts.map