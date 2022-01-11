export = resolve;
/**
 * @typedef {import('ipfs-core-types/src/utils').AbortOptions} AbortOptions
 */
/**
 * Retrieves IPLD Nodes along the `path` that is rooted at `cid`.
 *
 * @param {CID} cid - the CID where the resolving starts
 * @param {string} path - the path that should be resolved
 * @param {import('ipfs-core-utils/src/multicodecs')} codecs
 * @param {(cid: CID, options?: AbortOptions) => Promise<Uint8Array>} getBlock
 * @param {AbortOptions} [options]
 */
declare function resolve(cid: CID, path: string, codecs: import('ipfs-core-utils/src/multicodecs'), getBlock: (cid: CID, options?: import("ipfs-core-types/src/utils").AbortOptions | undefined) => Promise<Uint8Array>, options?: import("ipfs-core-types/src/utils").AbortOptions | undefined): AsyncGenerator<{
    value: any;
    remainderPath: string;
}, void, unknown>;
declare namespace resolve {
    export { AbortOptions };
}
import { CID } from "multiformats/cid";
type AbortOptions = import('ipfs-core-types/src/utils').AbortOptions;
//# sourceMappingURL=resolve.d.ts.map