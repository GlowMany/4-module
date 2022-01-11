'use strict';

var bytes = require('../src/bytes.js');
var chai = require('chai');
var base2 = require('../src/bases/base2.js');
var base8 = require('../src/bases/base8.js');
var base10 = require('../src/bases/base10.js');
var base16$1 = require('../src/bases/base16.js');
var base32$1 = require('../src/bases/base32.js');
var base36 = require('../src/bases/base36.js');
var base58 = require('../src/bases/base58.js');
var base64$1 = require('../src/bases/base64.js');
var testThrow = require('./fixtures/test-throw.js');

const {base16, base32, base58btc, base64} = {
  ...base16$1,
  ...base32$1,
  ...base58,
  ...base64$1
};
describe('multibase', () => {
  for (const base of [
      base16,
      base32,
      base58btc,
      base64
    ]) {
    describe(`basics ${ base.name }`, () => {
      it('encode/decode', () => {
        const string = base.encode(bytes.fromString('test'));
        chai.assert.deepStrictEqual(string[0], base.prefix);
        const buffer = base.decode(string);
        chai.assert.deepStrictEqual(buffer, bytes.fromString('test'));
      });
      it('pristine backing buffer', () => {
        const string = base.encode(bytes.fromString('test'));
        const buffer = base.decode(string);
        const expected = bytes.fromString('test');
        chai.assert.deepStrictEqual(new Uint8Array(buffer).join(','), new Uint8Array(expected.buffer).join(','));
      });
      it('empty', () => {
        const str = base.encode(bytes.fromString(''));
        chai.assert.deepStrictEqual(str, base.prefix);
        chai.assert.deepStrictEqual(base.decode(str), bytes.fromString(''));
      });
      it('bad chars', () => {
        const str = base.prefix + '#$%^&*&^%$#';
        const msg = `Non-${ base.name } character`;
        testThrow(() => base.decode(str), msg);
      });
    });
  }
  it('encode string failure', () => {
    const msg = 'Unknown type, must be binary type';
    testThrow(() => base32.encode('asdf'), msg);
    testThrow(() => base32.encoder.encode('asdf'), msg);
  });
  it('decode int failure', () => {
    const msg = 'Can only multibase decode strings';
    testThrow(() => base32.decode(1), msg);
    testThrow(() => base32.decoder.decode(1), msg);
  });
  const buff = bytes.fromString('test');
  const nonPrintableBuff = Uint8Array.from([
    239,
    250,
    254
  ]);
  const baseTest = bases => {
    for (const base of Object.values(bases)) {
      if (base && base.name) {
        it(`encode/decode ${ base.name }`, () => {
          const encoded = base.encode(buff);
          const decoded = base.decode(encoded);
          chai.assert.deepStrictEqual(decoded, buff);
          chai.assert.deepStrictEqual(encoded, base.encoder.encode(buff));
          chai.assert.deepStrictEqual(buff, base.decoder.decode(encoded));
        });
        it(`encode/decode ${ base.name } with non-printable values`, () => {
          const encoded = base.encode(nonPrintableBuff);
          const decoded = base.decode(encoded);
          chai.assert.deepStrictEqual(decoded, nonPrintableBuff);
          chai.assert.deepStrictEqual(encoded, base.encoder.encode(nonPrintableBuff));
          chai.assert.deepStrictEqual(nonPrintableBuff, base.decoder.decode(encoded));
        });
      }
    }
  };
  describe('base2', () => {
    baseTest(base2);
  });
  describe('base8', () => {
    baseTest(base8);
  });
  describe('base10', () => {
    baseTest(base10);
  });
  describe('base16', () => {
    baseTest(base16$1);
  });
  describe('base32', () => {
    baseTest(base32$1);
  });
  describe('base36', () => {
    baseTest(base36);
  });
  describe('base58', () => {
    baseTest(base58);
  });
  describe('base64', () => {
    baseTest(base64$1);
  });
  it('multibase mismatch', () => {
    const b64 = base64.encode(bytes.fromString('test'));
    const msg = `Unable to decode multibase string "${ b64 }", base32 decoder only supports inputs prefixed with ${ base32.prefix }`;
    testThrow(() => base32.decode(b64), msg);
  });
  it('decoder composition', () => {
    const base = base32.decoder.or(base58btc.decoder);
    const b32 = base32.encode(bytes.fromString('test'));
    chai.assert.deepStrictEqual(base.decode(b32), bytes.fromString('test'));
    const b58 = base58btc.encode(bytes.fromString('test'));
    chai.assert.deepStrictEqual(base.decode(b58), bytes.fromString('test'));
    const b64 = base64.encode(bytes.fromString('test'));
    const msg = `Unable to decode multibase string "${ b64 }", only inputs prefixed with ${ base32.prefix },${ base58btc.prefix } are supported`;
    testThrow(() => base.decode(b64), msg);
    const baseExt = base.or(base64);
    chai.assert.deepStrictEqual(baseExt.decode(b64), bytes.fromString('test'));
    testThrow(() => base.decode(b64), msg);
    const baseExt2 = base32.decoder.or(base64.decoder.or(base16.decoder));
    chai.assert.deepStrictEqual(baseExt2.decode(b64), bytes.fromString('test'));
    const baseExt3 = base.or(base64.decoder.or(base16.decoder));
    chai.assert.deepStrictEqual(baseExt3.decode(b64), bytes.fromString('test'));
  });
  it('truncated data', () => {
    const b64 = base64.encode(Uint8Array.from([
      245,
      250
    ]));
    testThrow(() => base64.decode(b64.substring(0, b64.length - 1)), 'Unexpected end of data');
  });
});
