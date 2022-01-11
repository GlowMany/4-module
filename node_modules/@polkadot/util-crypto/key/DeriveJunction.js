import _classPrivateFieldLooseBase from "@babel/runtime/helpers/esm/classPrivateFieldLooseBase";
import _classPrivateFieldLooseKey from "@babel/runtime/helpers/esm/classPrivateFieldLooseKey";
// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { BN, bnToU8a, compactAddLength, hexToU8a, isBigInt, isBn, isHex, isNumber, isString, stringToU8a } from '@polkadot/util';
import { blake2AsU8a } from "../blake2/asU8a.js";
import { BN_LE_256_OPTS } from "../bn.js";
const RE_NUMBER = /^\d+$/;
const JUNCTION_ID_LEN = 32;

var _chainCode = /*#__PURE__*/_classPrivateFieldLooseKey("chainCode");

var _isHard = /*#__PURE__*/_classPrivateFieldLooseKey("isHard");

export class DeriveJunction {
  constructor() {
    Object.defineProperty(this, _chainCode, {
      writable: true,
      value: new Uint8Array(32)
    });
    Object.defineProperty(this, _isHard, {
      writable: true,
      value: false
    });
  }

  static from(value) {
    const result = new DeriveJunction();
    const [code, isHard] = value.startsWith('/') ? [value.substr(1), true] : [value, false];
    result.soft(RE_NUMBER.test(code) ? new BN(code, 10) : code);
    return isHard ? result.harden() : result;
  }

  get chainCode() {
    return _classPrivateFieldLooseBase(this, _chainCode)[_chainCode];
  }

  get isHard() {
    return _classPrivateFieldLooseBase(this, _isHard)[_isHard];
  }

  get isSoft() {
    return !_classPrivateFieldLooseBase(this, _isHard)[_isHard];
  }

  hard(value) {
    return this.soft(value).harden();
  }

  harden() {
    _classPrivateFieldLooseBase(this, _isHard)[_isHard] = true;
    return this;
  }

  soft(value) {
    if (isNumber(value) || isBn(value) || isBigInt(value)) {
      return this.soft(bnToU8a(value, BN_LE_256_OPTS));
    } else if (isHex(value)) {
      return this.soft(hexToU8a(value));
    } else if (isString(value)) {
      return this.soft(compactAddLength(stringToU8a(value)));
    } else if (value.length > JUNCTION_ID_LEN) {
      return this.soft(blake2AsU8a(value));
    }

    _classPrivateFieldLooseBase(this, _chainCode)[_chainCode].fill(0);

    _classPrivateFieldLooseBase(this, _chainCode)[_chainCode].set(value, 0);

    return this;
  }

  soften() {
    _classPrivateFieldLooseBase(this, _isHard)[_isHard] = false;
    return this;
  }

}