/**
 * A `scratch-sb1-converter` assertion.
 */
class AssertionError extends Error {}

/**
 * A `scratch-sb1-converter` validation error.
 */
class ValidationError extends Error {
    constructor (assertion) {
        super(assertion.message);
        this.assertion = assertion;
    }

    get stack () {
        return this.assertion.stack;
    }
}

const assert = function (test, message) {
    if (!test) throw new AssertionError(message);
};

assert.validate = function (region) {
    try {
        return region();
    } catch (e) {
        if (e instanceof AssertionError) {
            throw new ValidationError(e);
        }
        throw e;
    }
};

export {
    assert,
    AssertionError,
    ValidationError
};
