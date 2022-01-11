// Copyright 2017-2021 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { map } from 'rxjs';
import { u8aConcat, u8aToHex } from '@polkadot/util';
import { blake2AsU8a } from '@polkadot/util-crypto';
import { memo } from "../util/index.js";

function createChildKey({
  trieIndex
}) {
  return u8aToHex(u8aConcat(':child_storage:default:', blake2AsU8a(u8aConcat('crowdloan', trieIndex.toU8a()))));
}

export function childKey(instanceId, api) {
  return memo(instanceId, paraId => api.query.crowdloan.funds(paraId).pipe(map(optInfo => optInfo.isSome ? createChildKey(optInfo.unwrap()) : null)));
}