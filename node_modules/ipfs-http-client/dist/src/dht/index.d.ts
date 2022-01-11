declare function _exports(config: import('../types').Options): {
    get: (key: Uint8Array, options?: (import("ipfs-core-types/src/utils").AbortOptions & import("../types").HTTPClientExtraOptions) | undefined) => Promise<Uint8Array>;
    put: (key: Uint8Array, value: Uint8Array, options?: (import("ipfs-core-types/src/utils").AbortOptions & import("../types").HTTPClientExtraOptions) | undefined) => AsyncIterable<import("ipfs-core-types/src/dht").DHTQueryMessage>;
    findProvs: (cid: import("multiformats").CID, options?: (import("ipfs-core-types/src/dht").DHTFindProvsOptions & import("../types").HTTPClientExtraOptions) | undefined) => AsyncIterable<import("ipfs-core-types/src/dht").PeerResult>;
    findPeer: (peerId: string, options?: (import("ipfs-core-types/src/utils").AbortOptions & import("../types").HTTPClientExtraOptions) | undefined) => Promise<import("ipfs-core-types/src/dht").PeerResult>;
    provide: (cids: import("multiformats").CID | import("multiformats").CID[], options?: (import("ipfs-core-types/src/dht").DHTProvideOptions & import("../types").HTTPClientExtraOptions) | undefined) => AsyncIterable<import("ipfs-core-types/src/dht").DHTQueryMessage>;
    query: (peerId: string, options?: (import("ipfs-core-types/src/utils").AbortOptions & import("../types").HTTPClientExtraOptions) | undefined) => AsyncIterable<import("ipfs-core-types/src/dht").PeerResult>;
};
export = _exports;
//# sourceMappingURL=index.d.ts.map