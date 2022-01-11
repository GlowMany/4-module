'use strict';

var bytes = require('../src/bytes.js');
var chai = require('chai');
var sha256 = require('@stablelib/sha256');
var sha512 = require('@stablelib/sha512');
var validMultihash = require('./fixtures/valid-multihash.js');
var invalidMultihash = require('./fixtures/invalid-multihash.js');
var sha2Browser = require('../src/hashes/sha2-browser.js');
var identity = require('../src/hashes/identity.js');
var digest = require('../src/hashes/digest.js');

const sample = (code, size, hex) => {
  const toHex = i => {
    if (typeof i === 'string')
      return i;
    const h = i.toString(16);
    return h.length % 2 === 1 ? `0${ h }` : h;
  };
  return bytes.fromHex(`${ toHex(code) }${ toHex(size) }${ hex }`);
};
const testThrowAsync = async (fn, message) => {
  try {
    await fn();
  } catch (e) {
    if (e.message !== message)
      throw e;
    return;
  }
  throw new Error('Test failed to throw');
};
describe('multihash', () => {
  const empty = new Uint8Array(0);
  describe('encode', () => {
    it('valid', () => {
      for (const test of validMultihash) {
        const {encoding, hex, size} = test;
        const {code, varint} = encoding;
        const buf = sample(varint || code, size, hex);
        chai.assert.deepStrictEqual(digest.create(code, hex ? bytes.fromHex(hex) : empty).bytes, buf);
      }
    });
    it('hash sha2-256', async () => {
      const hash = await sha2Browser.sha256.digest(bytes.fromString('test'));
      chai.assert.deepStrictEqual(hash.code, sha2Browser.sha256.code);
      chai.assert.deepStrictEqual(hash.digest, sha256.hash(bytes.fromString('test')));
      const hash2 = digest.decode(hash.bytes);
      chai.assert.deepStrictEqual(hash2.code, sha2Browser.sha256.code);
      chai.assert.deepStrictEqual(hash2.bytes, hash.bytes);
    });
    it('hash sha2-512', async () => {
      const hash = await sha2Browser.sha512.digest(bytes.fromString('test'));
      chai.assert.deepStrictEqual(hash.code, sha2Browser.sha512.code);
      chai.assert.deepStrictEqual(hash.digest, sha512.hash(bytes.fromString('test')));
      const hash2 = digest.decode(hash.bytes);
      chai.assert.deepStrictEqual(hash2.code, sha2Browser.sha512.code);
      chai.assert.deepStrictEqual(hash2.bytes, hash.bytes);
    });
    it('hash identity', async () => {
      const hash = await identity.identity.digest(bytes.fromString('test'));
      chai.assert.deepStrictEqual(hash.code, identity.identity.code);
      chai.assert.deepStrictEqual(identity.identity.code, 0);
      chai.assert.deepStrictEqual(hash.digest, bytes.fromString('test'));
      const hash2 = digest.decode(hash.bytes);
      chai.assert.deepStrictEqual(hash2.code, identity.identity.code);
      chai.assert.deepStrictEqual(hash2.bytes, hash.bytes);
    });
  });
  describe('decode', () => {
    for (const {encoding, hex, size} of validMultihash) {
      it(`valid fixture ${ hex }`, () => {
        const {code, varint} = encoding;
        const bytes$1 = sample(varint || code, size, hex);
        const digest$1 = hex ? bytes.fromHex(hex) : empty;
        const hash = digest.decode(bytes$1);
        chai.assert.deepStrictEqual(hash.bytes, bytes$1);
        chai.assert.deepStrictEqual(hash.code, code);
        chai.assert.deepStrictEqual(hash.size, size);
        chai.assert.deepStrictEqual(hash.digest, digest$1);
      });
    }
    it('get from buffer', async () => {
      const hash = await sha2Browser.sha256.digest(bytes.fromString('test'));
      chai.assert.deepStrictEqual(hash.code, 18);
    });
  });
  describe('validate', async () => {
    it('invalid fixtures', async () => {
      for (const test of invalidMultihash) {
        const buff = bytes.fromHex(test.hex);
        await testThrowAsync(() => digest.decode(buff), test.message);
      }
    });
  });
  it('throw on hashing non-buffer', async () => {
    await testThrowAsync(() => sha2Browser.sha256.digest('asdf'), 'Unknown type, must be binary type');
  });
});
