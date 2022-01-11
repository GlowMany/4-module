// Copyright 2017-2021 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { map, of } from 'rxjs';
import { memo } from "../util/index.js";
import { parseImage } from "./util.js";
export function preimages(instanceId, api) {
  return memo(instanceId, hashes => hashes.length ? api.query.democracy.preimages.multi(hashes).pipe(map(images => images.map(imageOpt => parseImage(api, imageOpt)))) : of([]));
}