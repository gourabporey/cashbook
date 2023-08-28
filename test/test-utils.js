const assert = require('assert');

const anyFunction = (value) => typeof value === 'function';

const matchArg = (expectedArg) => (actualArg) => {
  try {
    assert.deepStrictEqual(actualArg, expectedArg);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const expect = (fn) => {
  return {
    toNotHaveBeenCalled: () => assert.strictEqual(fn.mock.callCount(), 0),

    toHaveBeenCalledTimes: (noOfTimes) =>
      assert.strictEqual(fn.mock.callCount(), noOfTimes),

    toHaveBeenCalledWith: (...matchers) => {
      const lastCallIndex = fn.mock.callCount() - 1;
      const lastCall = fn.mock.calls[lastCallIndex];
      return lastCall.arguments.forEach((arg, index) =>
        assert.ok(matchers[index](arg))
      );
    },
  };
};

module.exports = { expect, anyFunction, matchArg };
