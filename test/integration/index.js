const test = require('tap').test;

const SB1 = require('../..');

test('loads package', t => {
    t.type(SB1, Object);
    t.end();
});
