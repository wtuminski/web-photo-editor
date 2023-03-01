import { hslaToRgba, rgbaToHsla } from '../colorConverters';
import { HSLAPixel, RGBAPixel } from '../types';

class ColorSet {
  constructor(public rgba: RGBAPixel, public hsla: HSLAPixel) {}
}

const colors: Array<ColorSet> = [
  new ColorSet([0, 0, 0, 1], [0, 0, 0, 1]),
  new ColorSet([255, 255, 255, 1], [0, 0, 1, 1]),
  new ColorSet([255, 0, 0, 1], [0, 1, 0.5, 1]),
  new ColorSet([0, 255, 0, 1], [120, 1, 0.5, 1]),
  new ColorSet([0, 0, 255, 1], [240, 1, 0.5, 1]),
  new ColorSet([255, 255, 0, 1], [60, 1, 0.5, 1]),
  new ColorSet([0, 255, 255, 1], [180, 1, 0.5, 1]),
  new ColorSet([255, 0, 255, 1], [300, 1, 0.5, 1]),
  new ColorSet([191, 191, 191, 1], [0, 0, 0.75, 1]),
  new ColorSet([128, 128, 128, 1], [0, 0, 0.5, 1]),
  new ColorSet([128, 0, 0, 1], [0, 1, 0.25, 1]),
  new ColorSet([128, 128, 0, 1], [60, 1, 0.25, 1]),
  new ColorSet([0, 128, 0, 1], [120, 1, 0.25, 1]),
  new ColorSet([128, 0, 128, 1], [300, 1, 0.25, 1]),
  new ColorSet([0, 128, 128, 0], [180, 1, 0.25, 0]),
  new ColorSet([0, 0, 128, 0], [240, 1, 0.25, 0]),
  new ColorSet([33, 212, 45, 1], [124, 0.73, 0.48, 1]),
];

// index has to be global due to lack of closures
let currentRgbaToHslaTestIndex = 0;
let currentHslaToRgbaIndex = 0;

describe('colorConverters', () => {
  colors.forEach(() => {
    test('rgbaToHsla should convert RGBA to HSLA', () => {
      const rgba = colors[currentRgbaToHslaTestIndex].rgba;
      const hsla = colors[currentRgbaToHslaTestIndex].hsla;
      const convertedHsla = rgbaToHsla(rgba);

      expect(Reflect.equals(convertedHsla, hsla)).toBe(
        Reflect.SUCCESSFUL_MATCH,
        `[${convertedHsla}] should be [${hsla}]`,
      );

      currentRgbaToHslaTestIndex += 1;
    });
  });

  colors.forEach(() => {
    test('hslaToRgba should convert HSLA to RGBA', () => {
      const hsla = colors[currentHslaToRgbaIndex].hsla;
      const rgba = colors[currentHslaToRgbaIndex].rgba;
      const convertedRgba = hslaToRgba(hsla);

      expect(Reflect.equals(convertedRgba, rgba)).toBe(
        Reflect.SUCCESSFUL_MATCH,
        `[${convertedRgba}] should be [${rgba}]`,
      );

      currentHslaToRgbaIndex += 1;
    });
  });
});
