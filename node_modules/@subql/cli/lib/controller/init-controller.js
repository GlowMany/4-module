"use strict";
// Copyright 2020-2021 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.installDependencies = exports.createProject = void 0;
const tslib_1 = require("tslib");
const child_process_1 = (0, tslib_1.__importDefault)(require("child_process"));
const fs_1 = (0, tslib_1.__importDefault)(require("fs"));
const path = (0, tslib_1.__importStar)(require("path"));
const util_1 = require("util");
const js_yaml_1 = (0, tslib_1.__importDefault)(require("js-yaml"));
const rimraf_1 = (0, tslib_1.__importDefault)(require("rimraf"));
const simple_git_1 = (0, tslib_1.__importDefault)(require("simple-git"));
const types_1 = require("../types");
const STARTER_PATH = 'https://github.com/subquery/subql-starter';
async function createProject(localPath, project) {
    const projectPath = path.join(localPath, project.name);
    const cloneArgs = (0, types_1.isProjectSpecV0_2_0)(project)
        ? ['-b', 'v0.2.0', '--single-branch']
        : ['-b', 'v0.0.1', '--single-branch'];
    try {
        await (0, simple_git_1.default)().clone(STARTER_PATH, projectPath, cloneArgs);
    }
    catch (e) {
        throw new Error('Failed to clone starter template from git');
    }
    try {
        await prepareManifest(projectPath, project);
    }
    catch (e) {
        throw new Error('Failed to prepare read or write manifest while preparing the project');
    }
    try {
        await preparePackage(projectPath, project);
    }
    catch (e) {
        throw new Error('Failed to prepare read or write package.json while preparing the project');
    }
    try {
        await (0, util_1.promisify)(rimraf_1.default)(`${projectPath}/.git`);
    }
    catch (e) {
        throw new Error('Failed to remove .git from starter project');
    }
    return projectPath;
}
exports.createProject = createProject;
async function preparePackage(projectPath, project) {
    var _a;
    //load and write package.json
    const packageData = await fs_1.default.promises.readFile(`${projectPath}/package.json`);
    const currentPackage = JSON.parse(packageData.toString());
    currentPackage.name = project.name;
    currentPackage.version = project.version;
    currentPackage.description = (_a = project.description) !== null && _a !== void 0 ? _a : currentPackage.description;
    currentPackage.author = project.author;
    currentPackage.license = project.license;
    const newPackage = JSON.stringify(currentPackage, null, 2);
    await fs_1.default.promises.writeFile(`${projectPath}/package.json`, newPackage, 'utf8');
}
async function prepareManifest(projectPath, project) {
    var _a, _b;
    //load and write manifest(project.yaml)
    const yamlPath = path.join(`${projectPath}`, `project.yaml`);
    const manifest = await fs_1.default.promises.readFile(yamlPath, 'utf8');
    const data = js_yaml_1.default.load(manifest);
    data.description = (_a = project.description) !== null && _a !== void 0 ? _a : data.description;
    data.repository = (_b = project.repository) !== null && _b !== void 0 ? _b : '';
    data.network.endpoint = project.endpoint;
    if ((0, types_1.isProjectSpecV0_2_0)(project)) {
        data.version = project.version;
        data.name = project.name;
        data.network.genesisHash = project.genesisHash;
    }
    const newYaml = js_yaml_1.default.dump(data);
    await fs_1.default.promises.writeFile(yamlPath, newYaml, 'utf8');
}
function installDependencies(projectPath, useNpm) {
    let command = 'yarn install';
    if (useNpm || !checkYarnExists()) {
        command = 'npm install';
    }
    child_process_1.default.execSync(command, { cwd: projectPath });
}
exports.installDependencies = installDependencies;
function checkYarnExists() {
    try {
        child_process_1.default.execSync('yarn --version');
        return true;
    }
    catch (e) {
        return false;
    }
}
//# sourceMappingURL=init-controller.js.map