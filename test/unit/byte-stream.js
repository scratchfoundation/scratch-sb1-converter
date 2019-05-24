const test = require('tap').test;

const {ByteStream} = require('../../src/coders/byte-stream');
const {Packet} = require('../../src/coders/byte-packets');
const {Uint8} = require('../../src/coders/byte-primitives');

test('spec', t => {
    t.type(ByteStream, 'function');

    const buffer = new ArrayBuffer(128);
    const instance = new ByteStream(buffer, 0);
    t.type(instance.buffer, 'object');
    t.type(instance.position, 'number');
    t.type(instance.uint8a, 'object');
    t.type(instance.read, 'function');
    t.type(instance.readStruct, 'function');
    t.type(instance.resize, 'function');
    t.type(instance.write, 'function');
    t.type(instance.writeStruct, 'function');
    t.type(instance.writeBytes, 'function');
    t.end();
});

test('read', t => {
    const buffer = new Uint8Array([0, 1, 255]).buffer;
    const instance = new ByteStream(buffer);
    t.equal(instance.read(Uint8), 0);
    t.equal(instance.read(Uint8), 1);
    t.equal(instance.read(Uint8), 255);
    t.type(instance.read(Uint8), 'undefined');
    t.end();
});

test('readStruct', t => {
    const buffer = new Uint8Array([0, 1, 10, 255]).buffer;
    const instance = new ByteStream(buffer);
    const result = instance.readStruct(Packet);
    t.type(result, 'object');
    // @todo This should use a "Packet" subclass and validate the contents of
    //       the returned packet
    t.end();
});

test('resize', t => {
    const buffer = new Uint8Array([]).buffer;
    const instance = new ByteStream(buffer);
    t.equal(instance.buffer.byteLength, 0);
    instance.resize(8);
    t.equal(instance.buffer.byteLength, 8);
    instance.resize(2);
    t.equal(instance.buffer.byteLength, 8);
    t.end();
});

test('write', t => {
    const buffer = new Uint8Array([0, 1, 255]).buffer;
    const instance = new ByteStream(buffer);
    t.equal(instance.read(Uint8), 0);
    t.equal(instance.read(Uint8), 1);
    t.equal(instance.read(Uint8), 255);
    t.equal(instance.write(Uint8, 255), 255);
    t.type(instance.read(Uint8), 'undefined');
    t.end();
});

test('writeStruct', t => {
    const buffer = new Uint8Array([0, 1, 255]).buffer;
    const bytes = new Uint8Array([0, 0, 0]);
    const instance = new ByteStream(buffer);
    const result = instance.writeStruct(Packet, bytes);
    t.type(result, 'object');
    // @todo This should use a "Packet" subclass and validate the contents of
    //       the returned packet
    t.end();
});

test('writeBytes', t => {
    const buffer = new Uint8Array([0, 1, 255]).buffer;
    const bytes = new Uint8Array([0, 0, 0]);
    const instance = new ByteStream(buffer);
    const result = instance.writeBytes(bytes);
    t.type(result, 'object');
    t.equal(result, bytes);
    t.end();
});

test('writeBytes (invalid)', t => {
    const buffer = new Uint8Array([0, 1, 255]).buffer;
    const instance = new ByteStream(buffer);
    t.throws(() => {
        instance.writeBytes([0, 0, 0]);
    });
    t.end();
});
