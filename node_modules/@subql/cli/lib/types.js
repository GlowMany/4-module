"use strict";
// Copyright 2020-2021 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.isProjectSpecV0_2_0 = exports.isProjectSpecV0_0_1 = void 0;
function isProjectSpecV0_0_1(projectSpec) {
    return !isProjectSpecV0_2_0(projectSpec);
}
exports.isProjectSpecV0_0_1 = isProjectSpecV0_0_1;
function isProjectSpecV0_2_0(projectSpec) {
    return !!projectSpec.genesisHash;
}
exports.isProjectSpecV0_2_0 = isProjectSpecV0_2_0;
//# sourceMappingURL=types.js.map