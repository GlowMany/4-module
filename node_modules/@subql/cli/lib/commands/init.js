"use strict";
// Copyright 2020-2021 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = (0, tslib_1.__importDefault)(require("fs"));
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const command_1 = require("@oclif/command");
const cli_ux_1 = (0, tslib_1.__importDefault)(require("cli-ux"));
const init_controller_1 = require("../controller/init-controller");
const jsonrpc_1 = require("../jsonrpc");
class Init extends command_1.Command {
    async run() {
        const { args, flags } = this.parse(Init);
        const project = {};
        const location = flags.location ? path_1.default.resolve(flags.location) : process.cwd();
        project.name = args.projectName
            ? args.projectName
            : await cli_ux_1.default.prompt('Project name', { default: 'subql-starter', required: true });
        if (fs_1.default.existsSync(path_1.default.join(location, `${project.name}`))) {
            throw new Error(`Directory ${project.name} exists, try another project name`);
        }
        project.repository = await cli_ux_1.default.prompt('Git repository', { required: false });
        project.endpoint = await cli_ux_1.default.prompt('RPC endpoint', {
            default: 'wss://polkadot.api.onfinality.io/public-ws',
            required: true,
        });
        if (flags.specVersion === '0.2.0') {
            cli_ux_1.default.action.start('Getting network genesis hash');
            project.genesisHash = await (0, jsonrpc_1.getGenesisHash)(project.endpoint);
            cli_ux_1.default.action.stop();
        }
        this.log('Prompting remaining details');
        project.author = await cli_ux_1.default.prompt('Authors', { required: true });
        project.description = await cli_ux_1.default.prompt('Description', { required: false });
        project.version = await cli_ux_1.default.prompt('Version:', { default: '1.0.0', required: true });
        project.license = await cli_ux_1.default.prompt('License:', { default: 'MIT', required: true });
        if (flags.starter && project.name) {
            try {
                cli_ux_1.default.action.start('Init the starter package');
                const projectPath = await (0, init_controller_1.createProject)(location, project);
                cli_ux_1.default.action.stop();
                if (flags['install-dependencies']) {
                    cli_ux_1.default.action.start('Installing dependencies');
                    (0, init_controller_1.installDependencies)(projectPath, flags.npm);
                    cli_ux_1.default.action.stop();
                }
                this.log(`${project.name} is ready`);
                /*
                 * Explicitly exit because getGenesisHash creates a polkadot api instance that keeps running
                 * Disconnecting the api causes undesired logging that cannot be disabled
                 */
                process.exit(0);
            }
            catch (e) {
                /* handle all errors here */
                this.error(e.message);
            }
        }
    }
}
exports.default = Init;
Init.description = 'Initialize a scaffold subquery project';
Init.flags = {
    force: command_1.flags.boolean({ char: 'f' }),
    starter: command_1.flags.boolean({
        default: true,
    }),
    location: command_1.flags.string({ char: 'l', description: 'local folder to create the project in' }),
    'install-dependencies': command_1.flags.boolean({ description: 'Install dependencies as well', default: false }),
    npm: command_1.flags.boolean({ description: 'Force using NPM instead of yarn, only works with `install-dependencies` flag' }),
    specVersion: command_1.flags.string({
        required: false,
        options: ['0.0.1', '0.2.0'],
        default: '0.2.0',
        description: 'The spec version to be used by the project',
    }),
};
Init.args = [
    {
        name: 'projectName',
        description: 'Give the starter project name',
    },
];
//# sourceMappingURL=init.js.map