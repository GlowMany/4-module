"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.preimages = preimages;

var _rxjs = require("rxjs");

var _index = require("../util/index.cjs");

var _util = require("./util.cjs");

// Copyright 2017-2021 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0
function preimages(instanceId, api) {
  return (0, _index.memo)(instanceId, hashes => hashes.length ? api.query.democracy.preimages.multi(hashes).pipe((0, _rxjs.map)(images => images.map(imageOpt => (0, _util.parseImage)(api, imageOpt)))) : (0, _rxjs.of)([]));
}