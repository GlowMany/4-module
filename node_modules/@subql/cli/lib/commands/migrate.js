"use strict";
// Copyright 2020-2021 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const command_1 = require("@oclif/command");
const common_1 = require("@subql/common");
const migrate_controller_1 = require("../controller/migrate-controller");
class Migrate extends command_1.Command {
    async run() {
        const { flags } = this.parse(Migrate);
        const location = flags.location ? path_1.default.resolve(flags.location) : process.cwd();
        let manifest;
        try {
            manifest = (0, common_1.loadProjectManifest)(location);
        }
        catch (e) {
            this.error(`Please validate project manifest before migrate. \n ${e}`);
        }
        if (manifest.isV0_2_0) {
            this.log(`* You are already using manifest spec v0.2.0`);
        }
        else {
            console.log(`* Converting manifest v0.0.1 to v0.2.0, please provide:`);
            const [project, chainTypesRelativePath] = await (0, migrate_controller_1.prepare)(location, manifest);
            await (0, migrate_controller_1.migrate)(location, project, manifest, chainTypesRelativePath);
            this.log('* Migration completed');
            process.exit(0);
        }
    }
}
exports.default = Migrate;
Migrate.description = 'Migrate Subquery project manifest v0.0.1 to v0.2.0';
Migrate.flags = {
    force: command_1.flags.boolean({ char: 'f' }),
    file: command_1.flags.string(),
    location: command_1.flags.string({ char: 'l', description: 'local folder to run migrate in' }),
};
//# sourceMappingURL=migrate.js.map