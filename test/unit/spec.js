const test = require('tap').test;

const SB1 = require('../..');

test('spec', t => {
    t.type(SB1, Object);
    t.type(SB1.SB1File, Function);
    t.type(SB1.AssertionError, Function);
    t.type(SB1.ValidationError, Function);
    t.end();
});
