// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { decodeAddress } from "./decode.js";
export function addressToU8a(who) {
  return decodeAddress(who);
}