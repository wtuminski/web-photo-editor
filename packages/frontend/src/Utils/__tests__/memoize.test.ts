import { describe, expect, test, vi } from 'vitest';

import { memoize } from '../memoize';

describe('memoize', () => {
  test('Memoized function should return proper value', () => {
    const identity = vi.fn(arg => arg);
    const memoizedIdentity = memoize(identity);
    const squere = vi.fn((value: number) => value * value);
    const memoizedSquere = memoize(squere);

    expect(memoizedIdentity('1')).toBe('1');
    expect(memoizedSquere(5)).toBe(25);
  });

  test('Memoized function should be called only once if the same arg is passed', () => {
    const identity = vi.fn(arg => arg);
    const memoizedIdentity = memoize(identity);
    const args = [5, 5, 5, 5, 5];

    args.forEach(argument => memoizedIdentity(argument));

    expect(identity).toHaveBeenNthCalledWith(1, 5);
  });

  test('Memoized function should be always called if it gets some arg for the fist time', () => {
    const identity = vi.fn(arg => arg);
    const memoizedIdentity = memoize(identity);
    const args = [1, 2, 3, 4, 5];

    args.forEach(argument => {
      memoizedIdentity(argument);
      expect(identity).toBeCalledWith(argument);
    });

    expect(identity).toHaveBeenCalledTimes(args.length);
  });
});
