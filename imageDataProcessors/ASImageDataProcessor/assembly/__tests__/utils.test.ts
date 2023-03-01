import { convertRgbaToRgbZeroOneRange, getMax, getMin, round } from '../utils';

describe('utils', () => {
  test('round', () => {
    expect(round(0)).toBe(0);
    expect(round(100)).toBe(100);
    expect(round(0, 2)).toBe(0.0);
    expect(round(0.122)).toBe(0);
    expect(round(2.1346, 2)).toBe(2.13);
    expect(round(0.48235294222831726, 6)).toBe(0.482353);
  });

  test('getMax', () => {
    expect(getMax([1, 2, 9, 4, 10, 5, 6])).toBe(10);
    expect(getMax([-1, -2, 5, 3, -20, -1.6, 7.5, 2])).toBe(7.5);
  });

  test('getMin', () => {
    expect(getMin([2, 1, 9, 4, 10, 5, 6])).toBe(1);
    expect(getMin([1, -22, 9, -4, -23.1, 5, 6])).toBe(-23.1);
  });

  test('convertRgbaToRgbZeroOneRange', () => {
    convertRgbaToRgbZeroOneRange([255, 0, 0, 1]).forEach((value, index) => {
      const convertedValues = [1, 0, 0];
      expect(value).toBe(convertedValues[index] as f32);
    });

    convertRgbaToRgbZeroOneRange([123, 12, 23, 1]).forEach((value, index) => {
      const convertedValues: StaticArray<f32> = [
        0.48235294222831726, 0.0470588244497776, 0.09019608050584793,
      ];
      expect(value).toBe(convertedValues[index]);
    });
  });
});
