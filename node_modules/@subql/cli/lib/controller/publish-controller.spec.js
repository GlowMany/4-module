"use strict";
// Copyright 2020-2021 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const child_process_1 = (0, tslib_1.__importDefault)(require("child_process"));
const fs_1 = (0, tslib_1.__importDefault)(require("fs"));
const os_1 = (0, tslib_1.__importDefault)(require("os"));
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const util_1 = require("util");
const common_1 = require("@subql/common");
const rimraf_1 = (0, tslib_1.__importDefault)(require("rimraf"));
const build_1 = (0, tslib_1.__importDefault)(require("../commands/build"));
const codegen_1 = (0, tslib_1.__importDefault)(require("../commands/codegen"));
const validate_1 = (0, tslib_1.__importDefault)(require("../commands/validate"));
const init_controller_1 = require("./init-controller");
const publish_controller_1 = require("./publish-controller");
const projectSpecV0_0_1 = {
    name: 'mocked_starter',
    repository: '',
    endpoint: 'wss://rpc.polkadot.io/public-ws',
    author: 'jay',
    description: 'this is test for init controller',
    version: '',
    license: '',
};
const projectSpecV0_2_0 = {
    name: 'mocked_starter',
    repository: '',
    genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3',
    author: 'jay',
    description: 'this is test for init controller',
    version: '',
    license: '',
    endpoint: 'wss://rpc.polkadot.io/public-ws',
};
const ipfsEndpoint = 'https://ipfs.thechainhub.com/api/v0';
jest.setTimeout(120000);
async function createTestProject(projectSpec) {
    const tmpdir = await fs_1.default.promises.mkdtemp(`${os_1.default.tmpdir()}${path_1.default.sep}`);
    const projectDir = path_1.default.join(tmpdir, projectSpec.name);
    await (0, init_controller_1.createProject)(tmpdir, projectSpec);
    // Install dependencies
    child_process_1.default.execSync(`npm i`, { cwd: projectDir });
    await codegen_1.default.run(['-l', projectDir]);
    await build_1.default.run(['-l', projectDir]);
    return projectDir;
}
describe('Cli publish', () => {
    let projectDir;
    afterEach(async () => {
        try {
            await (0, util_1.promisify)(rimraf_1.default)(projectDir);
        }
        catch (e) {
            console.warn('Failed to clean up tmp dir after test');
        }
    });
    it('should not allow uploading a v0.0.1 spec version project', async () => {
        projectDir = await createTestProject(projectSpecV0_0_1);
        await expect((0, publish_controller_1.uploadToIpfs)(ipfsEndpoint, projectDir)).rejects.toBeDefined();
    });
    it('should upload appropriate files to IPFS', async () => {
        projectDir = await createTestProject(projectSpecV0_2_0);
        const cid = await (0, publish_controller_1.uploadToIpfs)(ipfsEndpoint, projectDir);
        expect(cid).toBeDefined();
        await expect(validate_1.default.run(['-l', cid, '--ipfs', ipfsEndpoint])).resolves.toBe(undefined);
    });
    it('should not allow uploading a v0.0.1 spec version project', async () => {
        projectDir = await createTestProject(projectSpecV0_0_1);
        await expect((0, publish_controller_1.uploadToIpfs)(ipfsEndpoint, projectDir)).rejects.toBeDefined();
    });
    it('throw error when v0.0.1 try to deploy', async () => {
        projectDir = await createTestProject(projectSpecV0_0_1);
        const projectManifestPath = path_1.default.resolve(projectDir, 'project.yaml');
        const manifest = (0, common_1.loadProjectManifest)(projectManifestPath).asImpl;
        expect(() => manifest.toDeployment()).toThrowError('Manifest spec 0.0.1 is not support for deployment, please migrate to 0.2.0 or above');
    });
    it('convert to deployment and removed descriptive field', async () => {
        projectDir = await createTestProject(projectSpecV0_2_0);
        const projectManifestPath = path_1.default.resolve(projectDir, 'project.yaml');
        const manifest = (0, common_1.loadProjectManifest)(projectManifestPath).asImpl;
        const deployment = manifest.toDeployment();
        expect(deployment).not.toContain('name');
        expect(deployment).not.toContain('author');
        expect(deployment).not.toContain('endpoint');
        expect(deployment).not.toContain('dictionary');
        expect(deployment).not.toContain('description');
        expect(deployment).not.toContain('repository');
        expect(deployment).toContain('genesisHash');
        expect(deployment).toContain('specVersion');
        expect(deployment).toContain('dataSources');
    });
});
//# sourceMappingURL=publish-controller.spec.js.map