"use strict";
// Copyright 2020-2021 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGenesisHash = void 0;
const client_1 = require("./client");
async function getGenesisHash(endpoint) {
    var _a, _b;
    const client = endpoint.startsWith('ws') ? new client_1.WsJsonRpcClient(endpoint) : new client_1.HttpJsonRpcClient(endpoint);
    const genesisBlock = await client.send('chain_getBlockHash', [0]);
    (_b = (_a = client).destroy) === null || _b === void 0 ? void 0 : _b.call(_a);
    return genesisBlock;
}
exports.getGenesisHash = getGenesisHash;
//# sourceMappingURL=index.js.map