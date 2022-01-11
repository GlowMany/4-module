export type ImportCandidateStream = import('ipfs-core-types/src/utils').ImportCandidateStream;
export type ImportCandidate = import('ipfs-unixfs-importer').ImportCandidate;
/**
 * @typedef {import('ipfs-core-types/src/utils').ImportCandidateStream} ImportCandidateStream
 * @typedef {import('ipfs-unixfs-importer').ImportCandidate} ImportCandidate
 */
/**
 * Transforms any of the `ipfs.add` input types into
 *
 * ```
 * AsyncIterable<{ path, mode, mtime, content: AsyncIterable<Uint8Array> }>
 * ```
 *
 * See https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/FILES.md#ipfsadddata-options
 *
 * @param {ImportCandidateStream} input
 */
export function normaliseInput(input: ImportCandidateStream): AsyncGenerator<import("ipfs-unixfs-importer/types/src/types").ImportCandidate, void, undefined>;
//# sourceMappingURL=index.d.ts.map