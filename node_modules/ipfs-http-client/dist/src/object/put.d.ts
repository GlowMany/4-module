declare function _exports(codecs: import('ipfs-core-utils/src/multicodecs'), options: import('../types').Options): (obj: import("@ipld/dag-pb/src/interface").PBNode, options?: (import("ipfs-core-types/src/object").PutOptions & import("../types").HTTPClientExtraOptions) | undefined) => Promise<import("multiformats").CID>;
export = _exports;
export type HTTPClientExtraOptions = import('../types').HTTPClientExtraOptions;
export type ObjectAPI = import('ipfs-core-types/src/object').API<HTTPClientExtraOptions>;
//# sourceMappingURL=put.d.ts.map