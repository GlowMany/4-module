// Copyright 2017-2021 @polkadot/types authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { Int } from "../codec/Int.js";
/**
 * @name i64
 * @description
 * A 64-bit signed integer
 */

export class i64 extends Int.with(64) {
  constructor(...args) {
    super(...args);
    this.__IntType = 'i64';
  }

}