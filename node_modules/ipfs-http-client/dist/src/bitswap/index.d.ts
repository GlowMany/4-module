declare function _exports(config: import('../types').Options): {
    wantlist: (options?: (import("ipfs-core-types/src/utils").AbortOptions & import("../types").HTTPClientExtraOptions) | undefined) => Promise<import("multiformats").CID[]>;
    wantlistForPeer: (peerId: string, options?: (import("ipfs-core-types/src/utils").AbortOptions & import("../types").HTTPClientExtraOptions) | undefined) => Promise<import("multiformats").CID[]>;
    stat: (options?: (import("ipfs-core-types/src/utils").AbortOptions & import("../types").HTTPClientExtraOptions) | undefined) => Promise<import("ipfs-core-types/src/bitswap").Stats>;
    unwant: (cid: import("multiformats").CID | import("multiformats").CID[], options?: (import("ipfs-core-types/src/utils").AbortOptions & import("../types").HTTPClientExtraOptions) | undefined) => Promise<void>;
};
export = _exports;
//# sourceMappingURL=index.d.ts.map