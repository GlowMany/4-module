declare function _exports(clientOptions: import("../types").Options): (peerId: string, options?: (import("ipfs-core-types/src/utils").AbortOptions & import("../types").HTTPClientExtraOptions) | undefined) => Promise<CID[]>;
export = _exports;
export type HTTPClientExtraOptions = import('../types').HTTPClientExtraOptions;
export type BitswapAPI = import('ipfs-core-types/src/bitswap').API<HTTPClientExtraOptions>;
import { CID } from "multiformats/cid";
//# sourceMappingURL=wantlist-for-peer.d.ts.map