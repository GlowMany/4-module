declare function _exports(clientOptions: import("../types").Options): (cid: import("multiformats").CID, options?: (import("ipfs-core-types/src/dht").DHTFindProvsOptions & import("../types").HTTPClientExtraOptions) | undefined) => AsyncIterable<import("ipfs-core-types/src/dht").PeerResult>;
export = _exports;
export type HTTPClientExtraOptions = import('../types').HTTPClientExtraOptions;
export type DHTAPI = import('ipfs-core-types/src/dht').API<HTTPClientExtraOptions>;
//# sourceMappingURL=find-provs.d.ts.map