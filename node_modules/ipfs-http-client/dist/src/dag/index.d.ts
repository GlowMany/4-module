declare function _exports(codecs: import('ipfs-core-utils/src/multicodecs'), config: import('../types').Options): {
    export: (root: import("multiformats").CID, options?: (import("ipfs-core-types/src/dag").ExportOptions & import("../types").HTTPClientExtraOptions) | undefined) => AsyncIterable<Uint8Array>;
    get: (cid: import("multiformats").CID, options?: (import("ipfs-core-types/src/dag").GetOptions & import("../types").HTTPClientExtraOptions) | undefined) => Promise<import("ipfs-core-types/src/dag").GetResult>;
    import: (source: Iterable<Uint8Array> | AsyncIterable<Uint8Array> | AsyncIterable<AsyncIterable<Uint8Array>> | Iterable<AsyncIterable<Uint8Array>>, options?: (import("ipfs-core-types/src/dag").ImportOptions & import("../types").HTTPClientExtraOptions) | undefined) => AsyncIterable<import("ipfs-core-types/src/dag").ImportResult>;
    put: (node: any, options?: (import("ipfs-core-types/src/dag").PutOptions & import("../types").HTTPClientExtraOptions) | undefined) => Promise<import("multiformats").CID>;
    resolve: (ipfsPath: import("ipfs-core-types/src/utils").IPFSPath, options?: (import("ipfs-core-types/src/dag").ResolveOptions & import("../types").HTTPClientExtraOptions) | undefined) => Promise<import("ipfs-core-types/src/dag").ResolveResult>;
};
export = _exports;
//# sourceMappingURL=index.d.ts.map