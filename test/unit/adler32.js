const test = require('tap').test;

const {Adler32} = require('../../src/coders/adler32');

test('spec', t => {
    const instance = new Adler32();
    t.type(Adler32, 'function');
    t.type(instance.update, 'function');
    t.type(instance.digest, 'number');
    t.end();
});

test('digest', t => {
    const instance = new Adler32();
    const buf = new Uint8Array(128);
    instance.update(buf, 0, buf.length);
    t.equal(instance.digest, 8388609);
    t.end();
});
