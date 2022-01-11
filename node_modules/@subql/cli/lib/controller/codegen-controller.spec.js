"use strict";
// Copyright 2020-2021 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = (0, tslib_1.__importDefault)(require("fs"));
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const rimraf_1 = (0, tslib_1.__importDefault)(require("rimraf"));
const codegen_controller_1 = require("./codegen-controller");
jest.mock('fs', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fsMock = jest.createMockFromModule('fs');
    fsMock.promises = {
        mkdir: jest.fn(),
    };
    return fsMock;
});
jest.mock('rimraf', () => {
    return jest.createMockFromModule('rimraf');
});
jest.setTimeout(30000);
describe('Codegen can generate schema (mocked)', () => {
    const projectPath = path_1.default.join(__dirname, '../../test/test1');
    it('throw error when make directory failed at beginning of codegen', async () => {
        rimraf_1.default.mockImplementation((path, cb) => cb());
        fs_1.default.promises.mkdir.mockImplementation(async () => Promise.reject(new Error()));
        await expect((0, codegen_controller_1.codegen)(projectPath)).rejects.toThrow(/Failed to prepare/);
    });
});
//# sourceMappingURL=codegen-controller.spec.js.map