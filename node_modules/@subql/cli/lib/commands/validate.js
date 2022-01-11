"use strict";
// Copyright 2020-2021 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const command_1 = require("@oclif/command");
const validator_1 = require("@subql/validator");
const chalk_1 = (0, tslib_1.__importDefault)(require("chalk"));
class Validate extends command_1.Command {
    async run() {
        var _a;
        const { flags } = this.parse(Validate);
        const v = new validator_1.Validator((_a = flags.location) !== null && _a !== void 0 ? _a : process.cwd(), { ipfs: flags.ipfs });
        v.addRule(...validator_1.commonRules);
        const reports = await v.getValidateReports();
        const passed = reports.filter((r) => r.valid).length;
        const skipped = reports.filter((r) => r.skipped).length;
        const failed = reports.length - passed - skipped;
        if (!flags.silent) {
            for (const r of reports) {
                if (r.valid) {
                    this.log(`${chalk_1.default.bgGreen.bold(' PASS ')} ${r.name}`);
                }
                else if (r.skipped) {
                    this.log(`${chalk_1.default.yellow.bold(' SKIP ')} ${r.name}`);
                }
                else {
                    this.log(`${chalk_1.default.bgRed.bold(' FAIL ')} ${r.name}`);
                    this.log(`       ${chalk_1.default.redBright(r.description)}`);
                }
            }
            this.log('');
            this.log(`Result: ${passed} passed, ${failed} failed, ${skipped} skipped`);
            this.log('');
        }
        if (failed > 0) {
            this.exit(1);
        }
    }
}
exports.default = Validate;
Validate.description = 'Check a folder or github repo is a validate subquery project';
Validate.flags = {
    location: command_1.flags.string({ char: 'l', description: 'local folder, github repo url or IPFS cid' }),
    ipfs: command_1.flags.string({
        description: 'IPFS gateway endpoint, used for validating projects on IPFS',
        default: 'https://ipfs.thechainhub.com/api/v0',
    }),
    silent: command_1.flags.boolean(),
};
//# sourceMappingURL=validate.js.map