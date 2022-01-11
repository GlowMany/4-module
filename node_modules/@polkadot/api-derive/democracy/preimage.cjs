"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.preimage = preimage;

var _rxjs = require("rxjs");

var _index = require("../util/index.cjs");

var _util = require("./util.cjs");

// Copyright 2017-2021 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0
function preimage(instanceId, api) {
  return (0, _index.memo)(instanceId, hash => api.query.democracy.preimages(hash).pipe((0, _rxjs.map)(imageOpt => (0, _util.parseImage)(api, imageOpt))));
}