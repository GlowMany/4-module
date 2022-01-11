declare function _exports(clientOptions: import("../types").Options): (source: import("ipfs-core-types/src/utils").AwaitIterable<import("ipfs-core-types/src/pin").AddInput>, options?: (import("ipfs-core-types/src/pin").AddAllOptions & import("../types").HTTPClientExtraOptions) | undefined) => AsyncIterable<CID>;
export = _exports;
export type HTTPClientExtraOptions = import('../types').HTTPClientExtraOptions;
export type PinAPI = import('ipfs-core-types/src/pin').API<HTTPClientExtraOptions>;
import { CID } from "multiformats/cid";
//# sourceMappingURL=add-all.d.ts.map