declare function _exports(clientOptions: import("../../types").Options): (cid: CID, dLink: import("@ipld/dag-pb/src/interface").PBLink, options?: (import("ipfs-core-types/src/utils").AbortOptions & import("../../types").HTTPClientExtraOptions) | undefined) => Promise<CID>;
export = _exports;
export type HTTPClientExtraOptions = import('../../types').HTTPClientExtraOptions;
export type ObjectPatchAPI = import('ipfs-core-types/src/object/patch').API<HTTPClientExtraOptions>;
import { CID } from "multiformats/cid";
//# sourceMappingURL=add-link.d.ts.map