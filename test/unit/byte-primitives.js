const test = require('tap').test;

const {
    BytePrimitive,
    Uint8,
    Uint16BE,
    Uint16LE,
    Uint32BE,
    Uint32LE,
    Int16BE,
    Int32BE,
    DoubleBE,
    FixedAsciiString
} = require('../../src/coders/byte-primitives');

test('spec', t => {
    t.type(BytePrimitive, 'function');

    const instance = new BytePrimitive({size: 1});
    t.type(instance, 'object');
    t.type(instance.asPropertyObject, 'function');
    t.end();
});

test('Uint8', t => {
    t.type(Uint8, 'object');
    t.type(Uint8.size, 'number');
    t.type(Uint8.read, 'function');
    t.type(Uint8.write, 'function');
    t.type(Uint8.toBytes, 'object');

    const bytes = new Uint8Array(2);
    t.equal(Uint8.write(bytes, 0, 255), 255);
    t.equal(Uint8.read(bytes, 0), 255);
    t.equal(Uint8.read(bytes, 1), 0);
    t.end();
});

test('Uint16BE', t => {
    t.type(Uint16BE, 'object');
    t.type(Uint16BE.size, 'number');
    t.type(Uint16BE.read, 'function');
    t.type(Uint16BE.write, 'function');
    t.type(Uint16BE.toBytes, 'object');

    const bytes = new Uint8Array(3);
    t.equal(Uint16BE.write(bytes, 0, 65535), 65535);
    t.equal(Uint16BE.read(bytes, 0), 65535);
    t.equal(Uint16BE.read(bytes, 1), 65280);
    t.equal(Uint16BE.read(bytes, 2), 0);
    t.end();
});

test('Uint16LE', t => {
    t.type(Uint16LE, 'object');
    t.type(Uint16LE.size, 'number');
    t.type(Uint16LE.read, 'function');
    t.type(Uint16LE.write, 'function');
    t.type(Uint16LE.toBytes, 'object');

    const bytes = new Uint8Array(3);
    t.equal(Uint16LE.write(bytes, 0, 65535), 65535);
    t.equal(Uint16LE.read(bytes, 0), 65535);
    t.equal(Uint16LE.read(bytes, 1), 255);
    t.equal(Uint16LE.read(bytes, 2), 0);
    t.end();
});

test('Uint32BE', t => {
    t.type(Uint32BE, 'object');
    t.type(Uint32BE.size, 'number');
    t.type(Uint32BE.read, 'function');
    t.type(Uint32BE.write, 'function');
    t.type(Uint32BE.toBytes, 'object');

    const bytes = new Uint8Array(5);
    t.equal(Uint32BE.write(bytes, 0, 4294967295), 4294967295);
    t.equal(Uint32BE.read(bytes, 0), 4294967295);
    t.equal(Uint32BE.read(bytes, 1), 4294967040);
    t.equal(Uint32BE.read(bytes, 2), 4294901760);
    t.equal(Uint32BE.read(bytes, 3), 4278190080);
    t.equal(Uint32BE.read(bytes, 4), 0);
    t.end();
});

test('Uint32LE', t => {
    t.type(Uint32LE, 'object');
    t.type(Uint32LE.size, 'number');
    t.type(Uint32LE.read, 'function');
    t.type(Uint32LE.write, 'function');
    t.type(Uint32LE.toBytes, 'object');

    const bytes = new Uint8Array(5);
    t.equal(Uint32LE.write(bytes, 0, 4294967295), 4294967295);
    t.equal(Uint32LE.read(bytes, 0), 4294967295);
    t.equal(Uint32LE.read(bytes, 1), 16777215);
    t.equal(Uint32LE.read(bytes, 2), 65535);
    t.equal(Uint32LE.read(bytes, 3), 255);
    t.equal(Uint32LE.read(bytes, 4), 0);
    t.end();
});

test('Int16BE', t => {
    t.type(Int16BE, 'object');
    t.type(Int16BE.size, 'number');
    t.type(Int16BE.read, 'function');
    t.type(Int16BE.write, 'function');
    t.type(Int16BE.toBytes, 'object');

    const bytes = new Uint8Array(3);
    t.equal(Int16BE.write(bytes, 0, 65535), 65535);
    t.equal(Int16BE.read(bytes, 0), -1);
    t.equal(Int16BE.read(bytes, 1), -256);
    t.equal(Int16BE.read(bytes, 2), 0);
    t.end();
});

test('Int32BE', t => {
    t.type(Int32BE, 'object');
    t.type(Int32BE.size, 'number');
    t.type(Int32BE.read, 'function');
    t.type(Int32BE.write, 'function');
    t.type(Int32BE.toBytes, 'object');

    const bytes = new Uint8Array(5);
    t.equal(Int32BE.write(bytes, 0, 4294967295), 4294967295);
    t.equal(Int32BE.read(bytes, 0), -1);
    t.equal(Int32BE.read(bytes, 1), -256);
    t.equal(Int32BE.read(bytes, 2), -65536);
    t.equal(Int32BE.read(bytes, 3), -16777216);
    t.equal(Int32BE.read(bytes, 4), 0);
    t.end();
});

test('DoubleBE', t => {
    t.type(DoubleBE, 'object');
    t.type(DoubleBE.size, 'number');
    t.type(DoubleBE.read, 'function');
    t.type(DoubleBE.write, 'function');
    t.type(DoubleBE.toBytes, 'object');

    const bytes = new Uint8Array([1, 0, 0, 0, 0, 0, 0, 0, 0]);
    t.true(DoubleBE.read(bytes, 0) > 0);
    t.throws(() => {
        DoubleBE.write(bytes, 0, -1);
    });
    t.end();
});

test('FixedAsciiString', t => {
    const instance = new FixedAsciiString(3);
    t.type(instance, 'object');
    t.type(instance.size, 'number');
    t.type(instance.read, 'function');
    t.type(instance.write, 'function');
    t.type(instance.toBytes, 'object');

    const bytes = new Uint8Array(3);
    t.equal(instance.write(bytes, 0, 'foo'), 'foo');
    t.equal(instance.read(bytes, 0), 'foo');
    t.end();
});
