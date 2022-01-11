declare function _exports(clientOptions: import("../types").Options): (cids: import("multiformats/cid").CID | import("multiformats/cid").CID[], options?: (import("ipfs-core-types/src/dht").DHTProvideOptions & import("../types").HTTPClientExtraOptions) | undefined) => AsyncIterable<import("ipfs-core-types/src/dht").DHTQueryMessage>;
export = _exports;
export type HTTPClientExtraOptions = import('../types').HTTPClientExtraOptions;
export type DHTAPI = import('ipfs-core-types/src/dht').API<HTTPClientExtraOptions>;
export type CID = import('multiformats/cid').CID;
//# sourceMappingURL=provide.d.ts.map