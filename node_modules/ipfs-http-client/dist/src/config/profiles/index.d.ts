declare function _exports(config: import('../../types').Options): {
    apply: (profile: string, options?: (import("ipfs-core-types/src/config/profiles").ProfilesApplyOptions & import("../../types").HTTPClientExtraOptions) | undefined) => Promise<import("ipfs-core-types/src/config/profiles").ProfilesApplyResult>;
    list: (options?: (import("ipfs-core-types/src/utils").AbortOptions & import("../../types").HTTPClientExtraOptions) | undefined) => Promise<import("ipfs-core-types/src/config/profiles").Profile[]>;
};
export = _exports;
//# sourceMappingURL=index.d.ts.map