import _classPrivateFieldLooseBase from "@babel/runtime/helpers/esm/classPrivateFieldLooseBase";
import _classPrivateFieldLooseKey from "@babel/runtime/helpers/esm/classPrivateFieldLooseKey";
// Copyright 2017-2021 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { extractAuthor } from "./util.js";

function mapExtrinsics(extrinsics, records) {
  return extrinsics.map((extrinsic, index) => {
    let dispatchError;
    let dispatchInfo;
    const events = records.filter(({
      phase
    }) => phase.isApplyExtrinsic && phase.asApplyExtrinsic.eq(index)).map(({
      event
    }) => {
      if (event.section === 'system') {
        if (event.method === 'ExtrinsicSuccess') {
          dispatchInfo = event.data[0];
        } else if (event.method === 'ExtrinsicFailed') {
          dispatchError = event.data[0];
          dispatchInfo = event.data[1];
        }
      }

      return event;
    });
    return {
      dispatchError,
      dispatchInfo,
      events,
      extrinsic
    };
  });
}

export function createSignedBlockExtended(registry, block, events, validators) {
  // an instance of the base extrinsic for us to extend
  const SignedBlockBase = registry.createClass('SignedBlock');

  var _author = /*#__PURE__*/_classPrivateFieldLooseKey("author");

  var _events = /*#__PURE__*/_classPrivateFieldLooseKey("events");

  var _extrinsics = /*#__PURE__*/_classPrivateFieldLooseKey("extrinsics");

  class Implementation extends SignedBlockBase {
    constructor(registry, block, events, validators) {
      super(registry, block);
      Object.defineProperty(this, _author, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _events, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _extrinsics, {
        writable: true,
        value: void 0
      });
      _classPrivateFieldLooseBase(this, _author)[_author] = extractAuthor(this.block.header.digest, validators);
      _classPrivateFieldLooseBase(this, _events)[_events] = events || [];
      _classPrivateFieldLooseBase(this, _extrinsics)[_extrinsics] = mapExtrinsics(this.block.extrinsics, _classPrivateFieldLooseBase(this, _events)[_events]);
      this.createdAtHash = block === null || block === void 0 ? void 0 : block.createdAtHash;
    }
    /**
     * @description Convenience method, returns the author for the block
     */


    get author() {
      return _classPrivateFieldLooseBase(this, _author)[_author];
    }
    /**
     * @description Convenience method, returns the events associated with the block
     */


    get events() {
      return _classPrivateFieldLooseBase(this, _events)[_events];
    }
    /**
     * @description Returns the extrinsics and their events, mapped
     */


    get extrinsics() {
      return _classPrivateFieldLooseBase(this, _extrinsics)[_extrinsics];
    }

  }

  return new Implementation(registry, block, events, validators);
}