"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MagicNumber = exports.MAGIC_NUMBER = void 0;

var _util = require("@polkadot/util");

var _index = require("../primitive/index.cjs");

// Copyright 2017-2021 @polkadot/types authors & contributors
// SPDX-License-Identifier: Apache-2.0
const MAGIC_NUMBER = 0x6174656d; // `meta`, reversed for Little Endian encoding

exports.MAGIC_NUMBER = MAGIC_NUMBER;

class MagicNumber extends _index.U32 {
  constructor(registry, value) {
    super(registry, value);

    if (!this.isEmpty) {
      (0, _util.assert)(this.eq(MAGIC_NUMBER), () => `MagicNumber mismatch: expected ${registry.createType('u32', MAGIC_NUMBER).toHex()}, found ${this.toHex()}`);
    }
  }

}

exports.MagicNumber = MagicNumber;