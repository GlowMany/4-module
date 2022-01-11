// Copyright 2017-2021 @polkadot/types authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { UInt } from "../codec/UInt.js";
/**
 * @name u128
 * @description
 * A 128-bit unsigned integer
 */

export class u128 extends UInt.with(128) {
  constructor(...args) {
    super(...args);
    this.__UIntType = 'u128';
  }

}