"use strict";
// Copyright 2020-2021 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs = (0, tslib_1.__importStar)(require("fs"));
const os_1 = (0, tslib_1.__importDefault)(require("os"));
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const simple_git_1 = (0, tslib_1.__importDefault)(require("simple-git"));
const init_controller_1 = require("./init-controller");
jest.mock('simple-git', () => {
    const mGit = {
        clone: jest.fn(),
    };
    return jest.fn(() => mGit);
});
jest.setTimeout(30000);
async function makeTempDir() {
    const sep = path_1.default.sep;
    const tmpDir = os_1.default.tmpdir();
    const tempPath = await fs.promises.mkdtemp(`${tmpDir}${sep}`);
    return tempPath;
}
const projectSpec = {
    name: 'mocked_starter',
    repository: '',
    endpoint: 'wss://rpc.polkadot.io/public-ws',
    author: 'jay',
    description: 'this is test for init controller',
    version: '',
    license: '',
};
describe('Cli can create project (mocked)', () => {
    it('throw error when git clone failed', async () => {
        const tempPath = await makeTempDir();
        (0, simple_git_1.default)().clone.mockImplementationOnce((path, cb) => cb(new Error()));
        await expect((0, init_controller_1.createProject)(tempPath, projectSpec)).rejects.toThrow(/Failed to clone starter template from git/);
    });
});
//# sourceMappingURL=init-controller.spec.js.map