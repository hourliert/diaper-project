/* eslint-disable */
jest.dontMock('../Counter.js');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Counter from '../Counter';

describe('Counter', () => {
  it('should work', () => {
    expect(Counter).toBeDefined();
  });
});

/*eslint-enable */
