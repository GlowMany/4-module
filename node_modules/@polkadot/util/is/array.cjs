"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isArray = isArray;

// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @name isArray
 * @summary Tests for a Array instance.
 */
function isArray(value) {
  return Array.isArray(value);
}