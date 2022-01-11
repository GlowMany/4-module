import _classPrivateFieldLooseBase from "@babel/runtime/helpers/esm/classPrivateFieldLooseBase";
import _classPrivateFieldLooseKey from "@babel/runtime/helpers/esm/classPrivateFieldLooseKey";
// Copyright 2017-2021 @polkadot/api authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { isFunction } from '@polkadot/util';

var _allHasFired = /*#__PURE__*/_classPrivateFieldLooseKey("allHasFired");

var _callback = /*#__PURE__*/_classPrivateFieldLooseKey("callback");

var _fired = /*#__PURE__*/_classPrivateFieldLooseKey("fired");

var _fns = /*#__PURE__*/_classPrivateFieldLooseKey("fns");

var _isActive = /*#__PURE__*/_classPrivateFieldLooseKey("isActive");

var _results = /*#__PURE__*/_classPrivateFieldLooseKey("results");

var _subscriptions = /*#__PURE__*/_classPrivateFieldLooseKey("subscriptions");

export class Combinator {
  constructor(fns, callback) {
    Object.defineProperty(this, _allHasFired, {
      writable: true,
      value: false
    });
    Object.defineProperty(this, _callback, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _fired, {
      writable: true,
      value: []
    });
    Object.defineProperty(this, _fns, {
      writable: true,
      value: []
    });
    Object.defineProperty(this, _isActive, {
      writable: true,
      value: true
    });
    Object.defineProperty(this, _results, {
      writable: true,
      value: []
    });
    Object.defineProperty(this, _subscriptions, {
      writable: true,
      value: []
    });
    _classPrivateFieldLooseBase(this, _callback)[_callback] = callback; // eslint-disable-next-line @typescript-eslint/require-await

    _classPrivateFieldLooseBase(this, _subscriptions)[_subscriptions] = fns.map(async (input, index) => {
      const [fn, ...args] = Array.isArray(input) ? input : [input];

      _classPrivateFieldLooseBase(this, _fired)[_fired].push(false);

      _classPrivateFieldLooseBase(this, _fns)[_fns].push(fn); // Not quite 100% how to have a variable number at the front here
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/ban-types


      return fn(...args, this._createCallback(index));
    });
  }

  _allHasFired() {
    var _classPrivateFieldLoo;

    (_classPrivateFieldLoo = _classPrivateFieldLooseBase(this, _allHasFired))[_allHasFired] || (_classPrivateFieldLoo[_allHasFired] = _classPrivateFieldLooseBase(this, _fired)[_fired].filter(hasFired => !hasFired).length === 0);
    return _classPrivateFieldLooseBase(this, _allHasFired)[_allHasFired];
  }

  _createCallback(index) {
    return value => {
      _classPrivateFieldLooseBase(this, _fired)[_fired][index] = true;
      _classPrivateFieldLooseBase(this, _results)[_results][index] = value;

      this._triggerUpdate();
    };
  }

  _triggerUpdate() {
    if (!_classPrivateFieldLooseBase(this, _isActive)[_isActive] || !isFunction(_classPrivateFieldLooseBase(this, _callback)[_callback]) || !this._allHasFired()) {
      return;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      _classPrivateFieldLooseBase(this, _callback)[_callback](_classPrivateFieldLooseBase(this, _results)[_results]);
    } catch (error) {// swallow, we don't want the handler to trip us up
    }
  }

  unsubscribe() {
    if (!_classPrivateFieldLooseBase(this, _isActive)[_isActive]) {
      return;
    }

    _classPrivateFieldLooseBase(this, _isActive)[_isActive] = false; // eslint-disable-next-line @typescript-eslint/no-misused-promises

    _classPrivateFieldLooseBase(this, _subscriptions)[_subscriptions].forEach(async subscription => {
      try {
        const unsubscribe = await subscription;

        if (isFunction(unsubscribe)) {
          unsubscribe();
        }
      } catch (error) {// ignore
      }
    });
  }

}