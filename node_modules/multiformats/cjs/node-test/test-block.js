'use strict';

var json = require('../src/codecs/json.js');
var sha2 = require('../src/hashes/sha2.js');
var block = require('../src/block.js');
require('../src/index.js');
var chai = require('chai');
var cid = require('../src/cid.js');
var bytes = require('../src/bytes.js');

const fixture = { hello: 'world' };
const link = cid.CID.parse('bafyreidykglsfhoixmivffc5uwhcgshx4j465xwqntbmu43nb2dzqwfvae');
const buff = bytes.fromString('sadf');
describe('block', () => {
  it('basic encode/decode roundtrip', async () => {
    const block$1 = await block.encode({
      value: fixture,
      codec: json,
      hasher: sha2.sha256
    });
    const block2 = await block.decode({
      bytes: block$1.bytes,
      codec: json,
      hasher: sha2.sha256
    });
    chai.assert.deepStrictEqual(block$1.cid.equals(block2.cid), true);
    chai.assert.deepStrictEqual(block$1.cid.equals(block2.cid), true);
    chai.assert.deepStrictEqual(fixture, block2.value);
    const block3 = await block.create({
      bytes: block$1.bytes,
      cid: block$1.cid,
      codec: json,
      hasher: sha2.sha256
    });
    chai.assert.deepStrictEqual(block3.cid.equals(block2.cid), true);
  });
  it('createUnsafe', async () => {
    const block$1 = await block.encode({
      value: fixture,
      codec: json,
      hasher: sha2.sha256
    });
    const block2 = block.createUnsafe({
      bytes: block$1.bytes,
      cid: block$1.cid,
      codec: json
    });
    chai.assert.deepStrictEqual(block$1.cid.equals(block2.cid), true);
  });
  describe('reader', () => {
    const value = {
      link,
      nope: 'skip',
      arr: [link],
      obj: { arr: [{ obj: {} }] },
      bytes: Uint8Array.from('1234')
    };
    const block$1 = block.createUnsafe({
      value,
      codec: json,
      hasher: sha2.sha256,
      cid: true,
      bytes: true
    });
    it('links', () => {
      const expected = [
        'link',
        'arr/0'
      ];
      for (const [path, cid] of block$1.links()) {
        chai.assert.deepStrictEqual(path, expected.shift());
        chai.assert.deepStrictEqual(cid.toString(), link.toString());
      }
    });
    it('tree', () => {
      const expected = [
        'link',
        'nope',
        'arr',
        'arr/0',
        'obj',
        'obj/arr',
        'obj/arr/0',
        'obj/arr/0/obj',
        'bytes'
      ];
      for (const path of block$1.tree()) {
        chai.assert.deepStrictEqual(path, expected.shift());
      }
    });
    it('get', () => {
      let ret = block$1.get('link/test');
      chai.assert.deepStrictEqual(ret.remaining, 'test');
      chai.assert.deepStrictEqual(ret.value.toString(), link.toString());
      ret = block$1.get('nope');
      chai.assert.deepStrictEqual(ret, { value: 'skip' });
    });
    it('null links/tree', () => {
      const block$1 = block.createUnsafe({
        value: null,
        codec: json,
        hasher: sha2.sha256,
        bytes: true,
        cid: true
      });
      for (const x of block$1.tree()) {
        throw new Error(`tree should have nothing, got "${ x }"`);
      }
      for (const x of block$1.links()) {
        throw new Error(`links should have nothing, got "${ x }"`);
      }
    });
  });
  it('kitchen sink', () => {
    const sink = {
      one: {
        two: {
          arr: [
            true,
            false,
            null
          ],
          three: 3,
          buff,
          link
        }
      }
    };
    const block$1 = block.createUnsafe({
      value: sink,
      codec: json,
      bytes: true,
      cid: true
    });
    chai.assert.deepStrictEqual(sink, block$1.value);
  });
  describe('errors', () => {
    it('constructor missing args', () => {
      let threw = true;
      try {
        threw = new block.Block({});
        threw = false;
      } catch (e) {
        if (e.message !== 'Missing required argument')
          throw e;
      }
      chai.assert.deepStrictEqual(threw, true);
    });
    const errTest = async (method, arg, message) => {
      let threw = true;
      try {
        await method(arg);
        threw = false;
      } catch (e) {
        if (e.message !== message)
          throw e;
      }
      chai.assert.deepStrictEqual(threw, true);
    };
    it('encode', async () => {
      await errTest(block.encode, {}, 'Missing required argument "value"');
      await errTest(block.encode, { value: true }, 'Missing required argument: codec or hasher');
    });
    it('decode', async () => {
      await errTest(block.decode, {}, 'Missing required argument "bytes"');
      await errTest(block.decode, { bytes: true }, 'Missing required argument: codec or hasher');
    });
    it('createUnsafe', async () => {
      await errTest(block.createUnsafe, {}, 'Missing required argument, must either provide "value" or "codec"');
    });
    it('create', async () => {
      await errTest(block.create, {}, 'Missing required argument "bytes"');
      await errTest(block.create, { bytes: true }, 'Missing required argument "hasher"');
      const block$1 = await block.encode({
        value: fixture,
        codec: json,
        hasher: sha2.sha256
      });
      const block2 = await block.encode({
        value: {
          ...fixture,
          test: 'blah'
        },
        codec: json,
        hasher: sha2.sha256
      });
      await errTest(block.create, {
        bytes: block$1.bytes,
        cid: block2.cid,
        codec: json,
        hasher: sha2.sha256
      }, 'CID hash does not match bytes');
    });
    it('get', async () => {
      const block$1 = await block.encode({
        value: fixture,
        codec: json,
        hasher: sha2.sha256
      });
      await errTest(path => block$1.get(path), '/asd/fs/dfasd/f', 'Object has no property at ["asd"]');
    });
  });
});
