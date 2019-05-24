const test = require('tap').test;

const {Packet} = require('../../src/coders/byte-packets');
const {Uint8, Uint16LE} = require('../../src/coders/byte-primitives');

test('spec', t => {
    t.type(Packet, 'function');
    t.type(Packet.initConstructor, 'function');
    t.type(Packet.extend, 'function');

    const uint8a = new Uint8Array(128);
    const instance = new Packet(uint8a, 0);
    t.type(instance.uint8a, 'object');
    t.type(instance.offset, 'number');
    t.type(instance.equals, 'function');
    t.type(instance.view, 'function');
    t.end();
});

test('equals (true)', t => {
    const packet = new Packet();
    t.true(packet.equals({
        offset: 0
    }));
    t.end();
});

test('equals (false)', t => {
    const packet = new Packet();
    t.false(packet.equals({
        offset: 1
    }));
    t.end();
});

test('equals (undefined)', t => {
    const packet = new Packet();
    t.false(packet.equals({
        foo: 'bar'
    }));
    t.end();
});

test('view', t => {
    const packet = new Packet();
    const view = packet.view();
    t.type(view, 'object');
    t.type(view.toString, 'function');
    t.type(view.toString(), 'string');
    t.end();
});

test('extend (valid)', t => {
    class TestPacket extends Packet.extend({
        binaryType: Uint8,
        value: Uint16LE
    }) {}

    Packet.initConstructor(TestPacket);
    const packet = new TestPacket();
    t.type(packet, 'object');
    t.end();
});

test('extend (invalid)', t => {
    const shouldThrow = function () {
        Uint8.size = 0;
        class TestPacket extends Packet.extend({
            binaryType: Uint8,
            value: Uint16LE
        }) {}
        t.type(TestPacket, 'undefined');
    };
    t.throws(shouldThrow);
    t.end();
});
