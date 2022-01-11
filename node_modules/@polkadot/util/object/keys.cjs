"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.objectKeys = objectKeys;

// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @name objectKeys
 * @summary A version of Object.keys that is typed for TS
 */
function objectKeys(value) {
  return Object.keys(value);
}