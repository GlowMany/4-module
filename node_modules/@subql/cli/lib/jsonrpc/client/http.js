"use strict";
// Copyright 2020-2021 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpJsonRpcClient = void 0;
const tslib_1 = require("tslib");
const axios_1 = (0, tslib_1.__importDefault)(require("axios"));
const TIMEOUT = 5000;
let id = 0;
class HttpJsonRpcClient {
    constructor(url) {
        this.axios = axios_1.default.create({
            baseURL: url,
            timeout: TIMEOUT,
        });
    }
    async send(method, params) {
        const res = await this.axios.post('', {
            jsonrpc: '2.0',
            id: id++,
            method,
            params,
        });
        if (res.data.error) {
            throw res.data.error;
        }
        return res.data.result;
    }
}
exports.HttpJsonRpcClient = HttpJsonRpcClient;
//# sourceMappingURL=http.js.map