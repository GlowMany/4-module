"use strict";
// Copyright 2020-2021 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs = (0, tslib_1.__importStar)(require("fs"));
const os_1 = (0, tslib_1.__importDefault)(require("os"));
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const init_controller_1 = require("./init-controller");
// async
const fileExists = async (file) => {
    return new Promise((resolve, reject) => {
        fs.access(file, fs.constants.F_OK, (err) => {
            err ? reject(err) : resolve(true);
        });
    });
};
async function makeTempDir() {
    const sep = path_1.default.sep;
    const tmpDir = os_1.default.tmpdir();
    const tempPath = await fs.promises.mkdtemp(`${tmpDir}${sep}`);
    return tempPath;
}
jest.setTimeout(30000);
const projectSpec = {
    name: 'mocked_starter',
    repository: '',
    endpoint: 'wss://rpc.polkadot.io/public-ws',
    author: 'jay',
    description: 'this is test for init controller',
    version: '',
    license: '',
};
describe('Cli can create project', () => {
    it('should resolves when starter project successful created', async () => {
        const tempPath = await makeTempDir();
        await (0, init_controller_1.createProject)(tempPath, projectSpec);
        await expect(fileExists(path_1.default.join(tempPath, `${projectSpec.name}`))).resolves.toEqual(true);
    });
    it('throw error if .git exists in starter project', async () => {
        const tempPath = await makeTempDir();
        await (0, init_controller_1.createProject)(tempPath, projectSpec);
        await expect(fileExists(path_1.default.join(tempPath, `${projectSpec.name}/.git`))).rejects.toThrow();
    });
});
//# sourceMappingURL=init-controller.test.js.map