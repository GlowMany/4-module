// Copyright 2017-2021 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { map, switchMap } from 'rxjs';
import { memo } from "../util/index.js";
export function referendumsFinished(instanceId, api) {
  return memo(instanceId, () => api.derive.democracy.referendumIds().pipe(switchMap(ids => api.query.democracy.referendumInfoOf.multi(ids)), map(infos => infos.map(optInfo => optInfo.unwrapOr(null)).filter(info => !!info && info.isFinished).map(info => info.asFinished))));
}