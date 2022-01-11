'use strict';

var bytes = require('../src/bytes.js');
var chai = require('chai');
var raw = require('../src/codecs/raw.js');
var json = require('../src/codecs/json.js');
var testThrow = require('./fixtures/test-throw.js');

describe('multicodec', () => {
  it('encode/decode raw', () => {
    const buff = raw.encode(bytes.fromString('test'));
    chai.assert.deepStrictEqual(buff, bytes.fromString('test'));
    chai.assert.deepStrictEqual(raw.decode(buff, 'raw'), bytes.fromString('test'));
  });
  it('encode/decode json', () => {
    const buff = json.encode({ hello: 'world' });
    chai.assert.deepStrictEqual(buff, bytes.fromString(JSON.stringify({ hello: 'world' })));
    chai.assert.deepStrictEqual(json.decode(buff), { hello: 'world' });
  });
  it('raw cannot encode string', async () => {
    await testThrow(() => raw.encode('asdf'), 'Unknown type, must be binary type');
  });
});
