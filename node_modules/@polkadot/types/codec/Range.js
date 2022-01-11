import _classPrivateFieldLooseBase from "@babel/runtime/helpers/esm/classPrivateFieldLooseBase";
import _classPrivateFieldLooseKey from "@babel/runtime/helpers/esm/classPrivateFieldLooseKey";
// Copyright 2017-2021 @polkadot/types authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { Tuple } from "./Tuple.js";

var _rangeName = /*#__PURE__*/_classPrivateFieldLooseKey("rangeName");

/**
 * @name Range
 * @description
 * Rust `Range<T>` representation
 */
export class Range extends Tuple {
  constructor(registry, Type, value, rangeName = 'Range') {
    super(registry, {
      end: Type,
      start: Type
    }, value);
    Object.defineProperty(this, _rangeName, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldLooseBase(this, _rangeName)[_rangeName] = rangeName;
  }

  static with(Types) {
    return class extends Range {
      constructor(registry, value) {
        super(registry, Types, value);
      }

    };
  }
  /**
   * @description Returns the starting range value
   */


  get start() {
    return this[0];
  }
  /**
   * @description Returns the ending range value
   */


  get end() {
    return this[1];
  }
  /**
   * @description Returns the base runtime type name for this instance
   */


  toRawType() {
    return `${_classPrivateFieldLooseBase(this, _rangeName)[_rangeName]}<${this.start.toRawType()}>`;
  }

}
export class RangeInclusive extends Range {
  constructor(registry, type, value) {
    super(registry, type, value, 'RangeInclusive');
  }

  static with(Types) {
    return class extends RangeInclusive {
      constructor(registry, value) {
        super(registry, Types, value);
      }

    };
  }

}