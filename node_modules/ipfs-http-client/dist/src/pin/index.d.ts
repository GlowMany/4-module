declare function _exports(config: import('../types').Options): {
    add: (path: string | import("multiformats").CID, options?: (import("ipfs-core-types/src/pin").AddOptions & import("../types").HTTPClientExtraOptions) | undefined) => Promise<import("multiformats").CID>;
    addAll: (source: import("ipfs-core-types/src/utils").AwaitIterable<import("ipfs-core-types/src/pin").AddInput>, options?: (import("ipfs-core-types/src/pin").AddAllOptions & import("../types").HTTPClientExtraOptions) | undefined) => AsyncIterable<import("multiformats").CID>;
    ls: (options?: (import("ipfs-core-types/src/pin").LsOptions & import("../types").HTTPClientExtraOptions) | undefined) => AsyncIterable<import("ipfs-core-types/src/pin").LsResult>;
    rm: (path: string | import("multiformats").CID, options?: (import("ipfs-core-types/src/pin").RmOptions & import("../types").HTTPClientExtraOptions) | undefined) => Promise<import("multiformats").CID>;
    rmAll: (source: import("ipfs-core-types/src/utils").AwaitIterable<import("ipfs-core-types/src/pin").RmAllInput>, options?: (import("ipfs-core-types/src/utils").AbortOptions & import("../types").HTTPClientExtraOptions) | undefined) => AsyncIterable<import("multiformats").CID>;
    remote: Remote;
};
export = _exports;
import Remote = require("./remote");
//# sourceMappingURL=index.d.ts.map