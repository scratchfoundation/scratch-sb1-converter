/**
 * A `scratch-sb1-converter` assertion.
 */
class AssertionError extends Error {}

const assert = function (test, message) {
    if (!test) throw new AssertionError(message);
};

export {
    AssertionError,
    assert
};
