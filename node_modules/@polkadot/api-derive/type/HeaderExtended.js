import _classPrivateFieldLooseBase from "@babel/runtime/helpers/esm/classPrivateFieldLooseBase";
import _classPrivateFieldLooseKey from "@babel/runtime/helpers/esm/classPrivateFieldLooseKey";
// Copyright 2017-2021 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { extractAuthor } from "./util.js";
export function createHeaderExtended(registry, header, validators) {
  // an instance of the base extrinsic for us to extend
  const HeaderBase = registry.createClass('Header');

  var _author = /*#__PURE__*/_classPrivateFieldLooseKey("author");

  var _validators = /*#__PURE__*/_classPrivateFieldLooseKey("validators");

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
      _classPrivateFieldLooseBase(this, _author)[_author] = extractAuthor(this.digest, validators);
      _classPrivateFieldLooseBase(this, _validators)[_validators] = validators;
      this.createdAtHash = header === null || header === void 0 ? void 0 : header.createdAtHash;
    }
    /**
     * @description Convenience method, returns the author for the block
     */


    get author() {
      return _classPrivateFieldLooseBase(this, _author)[_author];
    }
    /**
     * @description Convenience method, returns the validators for the block
     */


    get validators() {
      return _classPrivateFieldLooseBase(this, _validators)[_validators];
    }

  }

  return new Implementation(registry, header, validators);
}