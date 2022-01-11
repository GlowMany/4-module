import _classPrivateFieldLooseBase from "@babel/runtime/helpers/esm/classPrivateFieldLooseBase";
import _classPrivateFieldLooseKey from "@babel/runtime/helpers/esm/classPrivateFieldLooseKey";

var _neverError = /*#__PURE__*/_classPrivateFieldLooseKey("neverError");

// Copyright 2017-2021 @polkadot/types authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @name DoNotConstruct
 * @description
 * An unknown type that fails on construction with the type info
 */
export class DoNotConstruct {
  constructor(registry, typeName = 'DoNotConstruct') {
    this.registry = void 0;
    this.createdAtHash = void 0;
    Object.defineProperty(this, _neverError, {
      writable: true,
      value: void 0
    });
    this.registry = registry;
    _classPrivateFieldLooseBase(this, _neverError)[_neverError] = new Error(`DoNotConstruct: Cannot construct unknown type ${typeName}`);
    throw _classPrivateFieldLooseBase(this, _neverError)[_neverError];
  }

  static with(typeName) {
    return class extends DoNotConstruct {
      constructor(registry) {
        super(registry, typeName);
      }

    };
  }
  /**
   * @description The length of the value when encoded as a Uint8Array
   */


  get encodedLength() {
    throw _classPrivateFieldLooseBase(this, _neverError)[_neverError];
  }
  /**
   * @description returns a hash of the contents
   */


  get hash() {
    throw _classPrivateFieldLooseBase(this, _neverError)[_neverError];
  }
  /**
   * @description Checks if the value is an empty value (always true)
   */


  get isEmpty() {
    throw _classPrivateFieldLooseBase(this, _neverError)[_neverError];
  }

  eq() {
    throw _classPrivateFieldLooseBase(this, _neverError)[_neverError];
  }

  toHex() {
    throw _classPrivateFieldLooseBase(this, _neverError)[_neverError];
  }

  toHuman() {
    throw _classPrivateFieldLooseBase(this, _neverError)[_neverError];
  }

  toJSON() {
    throw _classPrivateFieldLooseBase(this, _neverError)[_neverError];
  }

  toRawType() {
    throw _classPrivateFieldLooseBase(this, _neverError)[_neverError];
  }

  toString() {
    throw _classPrivateFieldLooseBase(this, _neverError)[_neverError];
  }

  toU8a() {
    throw _classPrivateFieldLooseBase(this, _neverError)[_neverError];
  }

}