// Copyright 2017-2021 @polkadot/x-randomvalues authors & contributors
// SPDX-License-Identifier: Apache-2.0
export { packageInfo } from "./packageInfo.js";
export function getRandomValues(arr) {
  return crypto.getRandomValues(arr);
}