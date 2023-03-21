import { describe, expect, test } from 'vitest';

import { hslaToRgba, rgbaToHsla } from '../colorConverters';
import { HSLAPixel, RGBAPixel } from '../utils';

const colors: [rgba: RGBAPixel, hsla: HSLAPixel][] = [
  [
    [0, 0, 0, 1],
    [0, 0, 0, 1],
  ],
  [
    [255, 255, 255, 1],
    [0, 0, 1, 1],
  ],
  [
    [255, 0, 0, 1],
    [0, 1, 0.5, 1],
  ],
  [
    [0, 255, 0, 1],
    [120, 1, 0.5, 1],
  ],
  [
    [0, 0, 255, 1],
    [240, 1, 0.5, 1],
  ],
  [
    [255, 255, 0, 1],
    [60, 1, 0.5, 1],
  ],
  [
    [0, 255, 255, 1],
    [180, 1, 0.5, 1],
  ],
  [
    [255, 0, 255, 1],
    [300, 1, 0.5, 1],
  ],
  [
    [191, 191, 191, 1],
    [0, 0, 0.75, 1],
  ],
  [
    [128, 128, 128, 1],
    [0, 0, 0.5, 1],
  ],
  [
    [128, 0, 0, 1],
    [0, 1, 0.25, 1],
  ],
  [
    [128, 128, 0, 1],
    [60, 1, 0.25, 1],
  ],
  [
    [0, 128, 0, 1],
    [120, 1, 0.25, 1],
  ],
  [
    [128, 0, 128, 1],
    [300, 1, 0.25, 1],
  ],
  [
    [0, 128, 128, 0.5],
    [180, 1, 0.25, 0.5],
  ],
  [
    [0, 0, 128, 0.3],
    [240, 1, 0.25, 0.3],
  ],
  [
    [12, 212, 45, 1],
    [129.9, 0.89, 0.44, 1],
  ],
];

describe('colorConverters', () => {
  test.each(colors)('rgbaToHsla should convert rgba: %j to hsla: %j', (rgba, hsla) => {
    expect(rgbaToHsla(rgba)).toStrictEqual(hsla);
  });

  test.each(colors)('hslaToRgba should convert rgba: %j from hsla: %j', (rgba, hsla) => {
    expect(hslaToRgba(hsla)).toStrictEqual(rgba);
  });
});
