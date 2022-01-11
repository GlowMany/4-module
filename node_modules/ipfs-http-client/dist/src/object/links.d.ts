declare function _exports(clientOptions: import("../types").Options): (cid: CID, options?: (import("ipfs-core-types/src/utils").AbortOptions & import("ipfs-core-types/src/utils").PreloadOptions & import("../types").HTTPClientExtraOptions) | undefined) => Promise<import("@ipld/dag-pb/src/interface").PBLink[]>;
export = _exports;
export type HTTPClientExtraOptions = import('../types').HTTPClientExtraOptions;
export type ObjectAPI = import('ipfs-core-types/src/object').API<HTTPClientExtraOptions>;
import { CID } from "multiformats/cid";
//# sourceMappingURL=links.d.ts.map