export type EndpointConfig = import('./types').EndpointConfig;
export type Options = import('./types').Options;
export type BlockCodec = import('multiformats/codecs/interface').BlockCodec<any, any>;
export type MultihashHasher = import('multiformats/hashes/interface').MultihashHasher;
export type MultibaseCodec = import('multiformats/bases/interface').MultibaseCodec<any>;
export type IPFSHTTPClient = import('./types').IPFSHTTPClient;
/**
 * @typedef {import('./types').EndpointConfig} EndpointConfig
 * @typedef {import('./types').Options} Options
 * @typedef {import('multiformats/codecs/interface').BlockCodec<any, any>} BlockCodec
 * @typedef {import('multiformats/hashes/interface').MultihashHasher} MultihashHasher
 * @typedef {import('multiformats/bases/interface').MultibaseCodec<any>} MultibaseCodec
 * @typedef {import('./types').IPFSHTTPClient} IPFSHTTPClient
 */
/**
 * @param {Options} options
 */
export function create(options?: Options): import("./types").IPFSHTTPClient;
import { CID } from "multiformats/cid";
import { multiaddr } from "multiaddr";
import globSource = require("ipfs-utils/src/files/glob-source");
import urlSource = require("ipfs-utils/src/files/url-source");
export { CID, multiaddr, globSource, urlSource };
//# sourceMappingURL=index.d.ts.map