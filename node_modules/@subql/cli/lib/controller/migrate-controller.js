"use strict";
// Copyright 2020-2021 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChainTypes = exports.migrate = exports.prepare = void 0;
const tslib_1 = require("tslib");
const fs_1 = (0, tslib_1.__importDefault)(require("fs"));
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const common_1 = require("@subql/common");
const cli_ux_1 = require("cli-ux");
const js_yaml_1 = (0, tslib_1.__importDefault)(require("js-yaml"));
const jsonrpc_1 = require("../jsonrpc");
const MANIFEST_PATH = 'project.yaml';
const MANIFEST_V_0_0_1 = `project_0_0_1.yaml`;
const MANIFEST_V_0_2_0 = `project_0_2_0.yaml`;
async function prepare(location, manifest) {
    const packageData = await fs_1.default.promises.readFile(`${location}/package.json`, 'utf8');
    const jsonProjectData = JSON.parse(packageData);
    let chainTypesRelativePath;
    const project = {};
    const projectV1Network = manifest.asV0_0_1.network;
    project.name = await cli_ux_1.cli.prompt('Project name', { default: jsonProjectData.name, required: true });
    project.version = await cli_ux_1.cli.prompt('Project version', { default: jsonProjectData.version, required: true });
    cli_ux_1.cli.action.start('Getting network genesis hash from endpoint');
    const genesisHash = await (0, jsonrpc_1.getGenesisHash)(projectV1Network.endpoint);
    cli_ux_1.cli.action.stop();
    project.genesisHash = await cli_ux_1.cli.prompt('Please confirm network genesis hash', { default: genesisHash, required: true });
    if (projectV1Network.types ||
        projectV1Network.typesAlias ||
        projectV1Network.typesBundle ||
        projectV1Network.typesChain ||
        projectV1Network.typesSpec) {
        chainTypesRelativePath = await cli_ux_1.cli.prompt('Please provide network chain types path', {
            default: './types.json',
            required: true,
        });
        const { ext } = path_1.default.parse(chainTypesRelativePath);
        if (ext !== '.yaml' && ext !== '.yml' && ext !== '.json') {
            throw new Error(`Extension ${ext} not supported`);
        }
        const projectChainTypesPath = path_1.default.join(location, chainTypesRelativePath);
        //check if the file path is exist, if not create one
        if (fs_1.default.existsSync(projectChainTypesPath)) {
            if (await cli_ux_1.cli.confirm(`${projectChainTypesPath} already exist, do you want override it [Y/N]`)) {
                await createChainTypes(projectV1Network, projectChainTypesPath, ext);
            }
        }
        else {
            await createChainTypes(projectV1Network, projectChainTypesPath, ext);
        }
    }
    //Patch manifest here
    for (const dataSource of manifest.asV0_2_0.dataSources) {
        dataSource.mapping.file = await cli_ux_1.cli.prompt(`Please provide relative entry path for dataSource ${dataSource.name}'s mapping `, {
            default: jsonProjectData.main.toString().startsWith('./') ? jsonProjectData.main : `./${jsonProjectData.main}`,
            required: true,
        });
        delete dataSource.name;
        const handlers = dataSource.mapping.handlers;
        delete dataSource.mapping.handlers; // adjust position
        dataSource.mapping.handlers = handlers;
    }
    return [project, chainTypesRelativePath];
}
exports.prepare = prepare;
async function migrate(projectPath, project, manifest, chainTypes) {
    var _a, _b;
    const originManifestPath = path_1.default.join(projectPath, MANIFEST_PATH);
    const manifestV0_0_1 = path_1.default.join(projectPath, MANIFEST_V_0_0_1);
    const manifestV0_2_0 = path_1.default.join(projectPath, MANIFEST_V_0_2_0);
    try {
        const data = {};
        data.specVersion = '0.2.0';
        data.name = project.name;
        data.version = project.version;
        data.description = (_a = manifest.asV0_2_0.description) !== null && _a !== void 0 ? _a : '';
        data.repository = (_b = manifest.asV0_2_0.repository) !== null && _b !== void 0 ? _b : '';
        data.schema = { file: manifest.asV0_0_1.schema };
        data.network = {
            genesisHash: project.genesisHash,
            endpoint: manifest.asV0_0_1.network.endpoint,
        };
        if (manifest.asV0_0_1.network.dictionary) {
            data.network.dictionary = manifest.asV0_0_1.network.dictionary;
        }
        if (chainTypes) {
            data.network.chaintypes = { file: chainTypes };
        }
        data.dataSources = manifest.asV0_2_0.dataSources;
        const newYaml = js_yaml_1.default.dump(data);
        await fs_1.default.promises.writeFile(manifestV0_2_0, newYaml, 'utf8');
    }
    catch (e) {
        throw new Error(`Fail to create manifest : ${e}`);
    }
    //validate before backup and conversion
    try {
        (0, common_1.loadProjectManifest)(manifestV0_2_0).isV0_2_0;
    }
    catch (e) {
        console.error(`${manifestV0_2_0} failed validation for manifest spec 0.2.0, \n ${e}`);
        const keep = await cli_ux_1.cli.confirm(`However, do you want keep ${manifestV0_2_0} for inspection before retry? [Y/N]`);
        if (keep) {
            process.exit(0);
        }
        else {
            await fs_1.default.promises.unlink(manifestV0_2_0);
            process.exit(0);
        }
    }
    //conversion
    await conversion(originManifestPath, manifestV0_0_1, manifestV0_2_0);
}
exports.migrate = migrate;
async function conversion(originManifestPath, manifestV0_0_1, manifestV0_2_0) {
    try {
        await fs_1.default.promises.rename(originManifestPath, manifestV0_0_1);
    }
    catch (e) {
        throw new Error(`Failed convert ${originManifestPath} to ${manifestV0_0_1},${e}`);
    }
    try {
        await fs_1.default.promises.rename(manifestV0_2_0, originManifestPath);
    }
    catch (e) {
        throw new Error(`Failed convert ${manifestV0_2_0} to ${originManifestPath},${e}`);
    }
}
async function createChainTypes(projectV1Network, absolutePath, ext) {
    const data = {};
    if (projectV1Network.types)
        data.types = projectV1Network.types;
    if (projectV1Network.typesBundle)
        data.typesBundle = projectV1Network.typesBundle;
    if (projectV1Network.typesAlias)
        data.typesAlias = projectV1Network.typesAlias;
    if (projectV1Network.typesChain)
        data.typesChain = projectV1Network.typesChain;
    if (projectV1Network.typesSpec)
        data.typesChain = projectV1Network.typesSpec;
    if (ext === '.json') {
        await fs_1.default.promises.writeFile(absolutePath, JSON.stringify(data, null, 2));
    }
    else {
        await fs_1.default.promises.writeFile(absolutePath, js_yaml_1.default.dump(data), 'utf8');
    }
    console.log(`* chainTypes is created`);
}
exports.createChainTypes = createChainTypes;
//# sourceMappingURL=migrate-controller.js.map