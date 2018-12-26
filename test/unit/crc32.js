const test = require('tap').test;

const {CRC32} = require('../../src/coders/crc32');

test('spec', t => {
    const instance = new CRC32();
    t.type(CRC32, 'function');
    t.type(instance.update, 'function');
    t.type(instance.digest, 'number');
    t.end();
});

test('digest', t => {
    const instance = new CRC32();
    const buf = new Uint8Array(128);
    instance.update(buf, 0, buf.length);
    t.equal(instance.digest, 3265854109);
    t.end();
});
