"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createHeaderExtended = createHeaderExtended;

var _classPrivateFieldLooseBase2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldLooseBase"));

var _classPrivateFieldLooseKey2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldLooseKey"));

var _util = require("./util.cjs");

// Copyright 2017-2021 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0
function createHeaderExtended(registry, header, validators) {
  // an instance of the base extrinsic for us to extend
  const HeaderBase = registry.createClass('Header');

  var _author = /*#__PURE__*/(0, _classPrivateFieldLooseKey2.default)("author");

  var _validators = /*#__PURE__*/(0, _classPrivateFieldLooseKey2.default)("validators");

  class Implementation extends HeaderBase {
    constructor(registry, header, validators) {
      super(registry, header);
      Object.defineProperty(this, _author, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _validators, {
        writable: true,
        value: void 0
      });
      (0, _classPrivateFieldLooseBase2.default)(this, _author)[_author] = (0, _util.extractAuthor)(this.digest, validators);
      (0, _classPrivateFieldLooseBase2.default)(this, _validators)[_validators] = validators;
      this.createdAtHash = header === null || header === void 0 ? void 0 : header.createdAtHash;
    }
    /**
     * @description Convenience method, returns the author for the block
     */


    get author() {
      return (0, _classPrivateFieldLooseBase2.default)(this, _author)[_author];
    }
    /**
     * @description Convenience method, returns the validators for the block
     */


    get validators() {
      return (0, _classPrivateFieldLooseBase2.default)(this, _validators)[_validators];
    }

  }

  return new Implementation(registry, header, validators);
}