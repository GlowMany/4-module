"use strict";
// Copyright 2020-2021 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = require("fs");
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const command_1 = require("@oclif/command");
const cli_ux_1 = (0, tslib_1.__importDefault)(require("cli-ux"));
const build_controller_1 = require("../controller/build-controller");
const validate_1 = (0, tslib_1.__importDefault)(require("./validate"));
class Build extends command_1.Command {
    async run() {
        const { flags } = this.parse(Build);
        const directory = flags.location ? path_1.default.resolve(flags.location) : process.cwd();
        const isDev = flags.mode === 'development' || flags.mode === 'dev';
        if (!(0, fs_1.lstatSync)(directory).isDirectory()) {
            this.error('Argument `location` is not a valid directory');
        }
        // Check that we're in a valid project
        try {
            await validate_1.default.run(['--silent', '--location', directory]);
        }
        catch (e) {
            this.error('Directory is not a valid project');
        }
        // Get the output location from the project package.json main field
        const pjson = JSON.parse((0, fs_1.readFileSync)(path_1.default.join(directory, 'package.json')).toString());
        const outputPath = path_1.default.resolve(directory, pjson.main || 'dist/index.js');
        cli_ux_1.default.action.start('Building and packing code');
        await (0, build_controller_1.runWebpack)(path_1.default.join(directory, 'src/index.ts'), outputPath, isDev, true);
        cli_ux_1.default.action.stop();
    }
}
exports.default = Build;
Build.description = 'Build this SubQuery project code';
Build.flags = {
    location: command_1.flags.string({ char: 'l', description: 'local folder' }),
    mode: command_1.flags.enum({ options: ['production', 'prod', 'development', 'dev'], default: 'production' }),
};
//# sourceMappingURL=build.js.map