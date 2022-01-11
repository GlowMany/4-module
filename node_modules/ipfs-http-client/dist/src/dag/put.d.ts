declare function _exports(codecs: import('ipfs-core-utils/src/multicodecs'), options: import('../types').Options): (node: any, options?: (import("ipfs-core-types/src/dag").PutOptions & import("../types").HTTPClientExtraOptions) | undefined) => Promise<CID>;
export = _exports;
export type HTTPClientExtraOptions = import('../types').HTTPClientExtraOptions;
export type DAGAPI = import('ipfs-core-types/src/dag').API<HTTPClientExtraOptions>;
import { CID } from "multiformats/cid";
//# sourceMappingURL=put.d.ts.map