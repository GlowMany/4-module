"use strict";
// Copyright 2020-2021 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToIpfs = void 0;
const tslib_1 = require("tslib");
const fs_1 = (0, tslib_1.__importDefault)(require("fs"));
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const common_1 = require("@subql/common");
const ipfs_http_client_1 = (0, tslib_1.__importDefault)(require("ipfs-http-client"));
const js_yaml_1 = (0, tslib_1.__importDefault)(require("js-yaml"));
const build_controller_1 = require("./build-controller");
async function uploadToIpfs(ipfsEndpoint, projectDir) {
    const ipfs = ipfs_http_client_1.default.create({ url: ipfsEndpoint });
    const projectManifestPath = path_1.default.resolve(projectDir, 'project.yaml');
    const manifest = (0, common_1.loadProjectManifest)(projectManifestPath).asImpl;
    if (!(0, common_1.manifestIsV0_2_0)(manifest)) {
        throw new Error('Unsupported project manifest spec, only 0.2.0 is supported');
    }
    for (const ds of manifest.dataSources) {
        if ((0, common_1.isCustomDs)(ds)) {
            ds.processor.file = await packProcessor(projectDir, ds.processor.file);
        }
    }
    const deployment = await replaceFileReferences(ipfs, projectDir, manifest);
    // Upload schema
    return uploadFile(ipfs, deployment.toDeployment());
}
exports.uploadToIpfs = uploadToIpfs;
/* Recursively finds all FileReferences in an object and replaces the files with IPFS references */
async function replaceFileReferences(ipfs, projectDir, input) {
    if (Array.isArray(input)) {
        return (await Promise.all(input.map((val) => replaceFileReferences(ipfs, projectDir, val))));
    }
    else if (typeof input === 'object') {
        if (input instanceof Map) {
            input = mapToObject(input);
        }
        if (isFileReference(input)) {
            input.file = await uploadFile(ipfs, fs_1.default.createReadStream(path_1.default.resolve(projectDir, input.file))).then((cid) => `ipfs://${cid}`);
        }
        const keys = Object.keys(input);
        await Promise.all(keys.map(async (key) => {
            input[key] = await replaceFileReferences(ipfs, projectDir, input[key]);
        }));
    }
    return input;
}
async function uploadFile(ipfs, content) {
    const result = await ipfs.add(content, { pin: true, cidVersion: 0 });
    return result.cid.toString();
}
function toMinifiedYaml(manifest) {
    return js_yaml_1.default.dump(manifest, {
        sortKeys: true,
        condenseFlow: true,
    });
}
function mapToObject(map) {
    // XXX can use Object.entries with newer versions of node.js
    const assetsObj = {};
    for (const key of map.keys()) {
        assetsObj[key] = map.get(key);
    }
    return assetsObj;
}
function isFileReference(value) {
    return value.file && typeof value.file === 'string';
}
const processorCache = {};
async function packProcessor(projectDir, processorEntry) {
    if (!processorCache[processorEntry]) {
        const output = path_1.default.resolve(projectDir, `./dist/processors/${path_1.default.basename(processorEntry)}`);
        await (0, build_controller_1.runWebpack)(processorEntry, output, false);
        processorCache[processorEntry] = output;
    }
    return processorCache[processorEntry];
}
//# sourceMappingURL=publish-controller.js.map