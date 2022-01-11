"use strict";
// Copyright 2020-2021 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = require("fs");
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const command_1 = require("@oclif/command");
const publish_controller_1 = require("../controller/publish-controller");
const build_1 = (0, tslib_1.__importDefault)(require("./build"));
class Publish extends command_1.Command {
    async run() {
        const { flags } = this.parse(Publish);
        const directory = flags.location ? path_1.default.resolve(flags.location) : process.cwd();
        if (!(0, fs_1.lstatSync)(directory).isDirectory()) {
            this.error('Argument `location` is not a valid directory');
        }
        // Ensure that the project is built
        try {
            await build_1.default.run(['--location', directory]);
        }
        catch (e) {
            this.log(e);
            this.error('Failed to build project');
        }
        this.log('Uploading SupQuery project to IPFS');
        const cid = await (0, publish_controller_1.uploadToIpfs)(flags.ipfs, directory);
        this.log(`SubQuery Project uploaded to IPFS: ${cid}`);
    }
}
exports.default = Publish;
Publish.description = 'Upload this SubQuery project to IPFS';
Publish.flags = {
    location: command_1.flags.string({ char: 'l', description: 'local folder' }),
    ipfs: command_1.flags.string({ description: 'IPFS gateway endpoint', default: 'http://localhost:5001/api/v0' }),
};
//# sourceMappingURL=publish.js.map