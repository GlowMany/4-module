declare function _exports(clientOptions: import("../types").Options): (data: Uint8Array, options?: (import("ipfs-core-types/src/block").PutOptions & import("../types").HTTPClientExtraOptions) | undefined) => Promise<CID>; /**
 * @typedef {import('../types').HTTPClientExtraOptions} HTTPClientExtraOptions
 * @typedef {import('ipfs-core-types/src/block').API<HTTPClientExtraOptions>} BlockAPI
 */
export = _exports;
export type HTTPClientExtraOptions = import('../types').HTTPClientExtraOptions;
export type BlockAPI = import('ipfs-core-types/src/block').API<HTTPClientExtraOptions>;
import { CID } from "multiformats/cid";
//# sourceMappingURL=put.d.ts.map