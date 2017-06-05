import { Map } from 'immutable';

describe('testClass', () => {
  let testClass;

  beforeEach(() => {
    // eslint-disable-next-line global-require, import/no-webpack-loader-syntax
    testClass = require('inject-loader?domain/Config!./')({
      'domain/Config': new Map({ enableTestClasses: true }),
    }).default;
  });

  it('throws an error if the given class contains unacceptable characters', () => {
    expect(() => testClass('my thing')).toThrowError();
  });

  it('does not throw if the given class is okay', () => {
    expect(() => testClass('my-thing-5')).not.toThrowError();
  });
});
