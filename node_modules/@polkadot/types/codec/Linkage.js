// Copyright 2017-2021 @polkadot/types authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { Option } from "./Option.js";
import { Struct } from "./Struct.js";
import { Tuple } from "./Tuple.js";
import { Vec } from "./Vec.js";
const EMPTY = new Uint8Array();
/**
 * @name Linkage
 * @description The wrapper for the result from a LinkedMap
 */

export class Linkage extends Struct {
  constructor(registry, Type, value) {
    super(registry, {
      previous: Option.with(Type),
      // eslint-disable-next-line sort-keys
      next: Option.with(Type)
    }, value);
  }

  static withKey(Type) {
    return class extends Linkage {
      constructor(registry, value) {
        super(registry, Type, value);
      }

    };
  }

  get previous() {
    return this.get('previous');
  }

  get next() {
    return this.get('next');
  }
  /**
   * @description Returns the base runtime type name for this instance
   */


  toRawType() {
    return `Linkage<${this.next.toRawType(true)}>`;
  }
  /**
   * @description Custom toU8a which with bare mode does not return the linkage if empty
   */


  toU8a() {
    // As part of a storage query (where these appear), in the case of empty, the values
    // are NOT populated by the node - follow the same logic, leaving it empty
    return this.isEmpty ? EMPTY : super.toU8a();
  }

}
/**
 * @name LinkageResult
 * @description A Linkage keys/Values tuple
 */

export class LinkageResult extends Tuple {
  constructor(registry, [TypeKey, keys], [TypeValue, values]) {
    super(registry, {
      Keys: Vec.with(TypeKey),
      Values: Vec.with(TypeValue)
    }, [keys, values]);
  }

}