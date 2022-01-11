"use strict";
// Copyright 2020-2021 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const util_1 = require("util");
const rimraf_1 = (0, tslib_1.__importDefault)(require("rimraf"));
const codegen_controller_1 = require("./codegen-controller");
jest.setTimeout(30000);
describe('Codegen can generate schema', () => {
    afterEach(async () => {
        await (0, util_1.promisify)(rimraf_1.default)(path_1.default.join(__dirname, '../../test/schemaTest1/src'));
        await (0, util_1.promisify)(rimraf_1.default)(path_1.default.join(__dirname, '../../test/schemaTest2/src'));
    });
    it('codegen with correct schema should pass', async () => {
        const projectPath = path_1.default.join(__dirname, '../../test/schemaTest1');
        await (0, codegen_controller_1.codegen)(projectPath);
    });
    it('codegen with incorrect schema field should fail', async () => {
        const projectPath = path_1.default.join(__dirname, '../../test/schemaTest2');
        await expect((0, codegen_controller_1.codegen)(projectPath)).rejects.toThrow(/is not an valid type/);
    });
});
//# sourceMappingURL=codegen-controller.test.js.map