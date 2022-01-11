declare function _exports(config: import('../../types').Options): {
    cancel: (name: string, options?: (import("ipfs-core-types/src/utils").AbortOptions & import("../../types").HTTPClientExtraOptions) | undefined) => Promise<import("ipfs-core-types/src/name/pubsub").PubsubCancelResult>;
    state: (options?: (import("ipfs-core-types/src/utils").AbortOptions & import("../../types").HTTPClientExtraOptions) | undefined) => Promise<import("ipfs-core-types/src/name/pubsub").PubsubStateResult>;
    subs: (options?: (import("ipfs-core-types/src/utils").AbortOptions & import("../../types").HTTPClientExtraOptions) | undefined) => Promise<string[]>;
};
export = _exports;
//# sourceMappingURL=index.d.ts.map