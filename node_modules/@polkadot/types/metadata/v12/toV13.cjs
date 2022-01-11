"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toV13 = toV13;

// Copyright 2017-2021 @polkadot/types authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @internal
 **/
function toV13(registry, metadata) {
  return registry.createType('MetadataV13', metadata);
}