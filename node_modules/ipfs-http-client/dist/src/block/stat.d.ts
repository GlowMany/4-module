declare function _exports(clientOptions: import("../types").Options): (cid: CID, options?: (import("ipfs-core-types/src/utils").AbortOptions & import("ipfs-core-types/src/utils").PreloadOptions & import("../types").HTTPClientExtraOptions) | undefined) => Promise<import("ipfs-core-types/src/block").StatResult>;
export = _exports;
export type HTTPClientExtraOptions = import('../types').HTTPClientExtraOptions;
export type BlockAPI = import('ipfs-core-types/src/block').API<HTTPClientExtraOptions>;
import { CID } from "multiformats/cid";
//# sourceMappingURL=stat.d.ts.map