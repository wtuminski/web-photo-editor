import assert from 'assert';
import test, { describe } from 'node:test';

import { add } from '../dist/debug/index.js';

describe('test', () => {
  test('add', () => {
    assert.strictEqual(add(2, 3), 5);
  });
});
