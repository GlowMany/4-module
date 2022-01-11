// Copyright 2017-2021 @polkadot/types authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { Int } from "../codec/Int.js";
/**
 * @name i128
 * @description
 * A 128-bit signed integer
 */

export class i128 extends Int.with(128) {
  constructor(...args) {
    super(...args);
    this.__IntType = 'i128';
  }

}