export = toCidAndPath;
/**
 * @param {string|Uint8Array|CID} string
 * @returns {{cid:CID, path?:string}}
 */
declare function toCidAndPath(string: string | Uint8Array | CID): {
    cid: CID;
    path?: string;
};
import { CID } from "multiformats/cid";
//# sourceMappingURL=to-cid-and-path.d.ts.map