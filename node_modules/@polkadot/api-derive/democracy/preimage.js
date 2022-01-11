// Copyright 2017-2021 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { map } from 'rxjs';
import { memo } from "../util/index.js";
import { parseImage } from "./util.js";
export function preimage(instanceId, api) {
  return memo(instanceId, hash => api.query.democracy.preimages(hash).pipe(map(imageOpt => parseImage(api, imageOpt))));
}