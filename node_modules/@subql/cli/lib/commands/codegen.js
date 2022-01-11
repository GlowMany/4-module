"use strict";
// Copyright 2020-2021 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const command_1 = require("@oclif/command");
const codegen_controller_1 = require("../controller/codegen-controller");
class Codegen extends command_1.Command {
    async run() {
        const { flags } = this.parse(Codegen);
        this.log('===============================');
        this.log('---------Subql Codegen---------');
        this.log('===============================');
        const location = flags.location ? path_1.default.resolve(flags.location) : process.cwd();
        try {
            await (0, codegen_controller_1.codegen)(location);
        }
        catch (err) {
            console.error(err.message);
            process.exit(1);
        }
    }
}
exports.default = Codegen;
Codegen.description = 'Generate schemas for graph node';
Codegen.flags = {
    force: command_1.flags.boolean({ char: 'f' }),
    file: command_1.flags.string(),
    location: command_1.flags.string({ char: 'l', description: 'local folder to run codegen in' }),
};
//# sourceMappingURL=codegen.js.map