import {
  adjustValueToRange,
  average,
  calculateFilterRate,
  convertRgbaToRgbZeroOneRange,
  getMax,
  getMin,
  mapPixels,
  round,
} from '../utils';
import { mapPixelsInputArray, mapPixelsOutputArray } from './utils.mocks';

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

  test('adjustValueToRange', () => {
    expect(adjustValueToRange({ maxValue: 360, minValue: 0, value: 200 })).toBe(200);
    expect(adjustValueToRange({ maxValue: 360, minValue: 0, value: 500 })).toBe(360);
    expect(adjustValueToRange({ maxValue: 360, minValue: 0, value: -10 })).toBe(0);
    expect(adjustValueToRange({ maxValue: 25.5, minValue: -15.4, value: -10.1 })).toBe(-10.1);
    expect(adjustValueToRange({ maxValue: 25.5, minValue: -15.4, value: 26.1 })).toBe(25.5);
    expect(adjustValueToRange({ maxValue: 25.5, minValue: -15.4, value: -16.4 })).toBe(-15.4);
  });

  test('average', () => {
    expect(average([1, 2, 5])).toBe(2.66666667);
    expect(average([10, 22, 255])).toBe(95.66666667);
    expect(average([0, 128, 255])).toBe(127.66666667);
    expect(average([0, 0, 0])).toBe(0);
    expect(average([255, 255, 255])).toBe(255);
  });

  test('calculateFilterRate', () => {
    expect(calculateFilterRate(10)).toBe(1.1);
    expect(calculateFilterRate(99)).toBe(1.99);
    expect(calculateFilterRate(0)).toBe(1);
    expect(calculateFilterRate(127)).toBe(2.27);
    expect(calculateFilterRate(-128)).toBe(-0.27999997);
    expect(calculateFilterRate(-11)).toBe(0.89);
  });

  test('mapPixels', () => {
    // given
    const input = new Uint8ClampedArray(mapPixelsInputArray.length);
    input.set(mapPixelsInputArray);
    const output = new Uint8ClampedArray(mapPixelsOutputArray.length);
    output.set(mapPixelsOutputArray);

    // when
    const potentialOutput = mapPixels(input, 50, (rgba, filterValue) => {
      const r = rgba[0];
      const g = rgba[1];
      const b = rgba[2];
      const a = rgba[3];
      const filterRate = calculateFilterRate(filterValue);
      return [
        round(
          adjustValueToRange({
            maxValue: 255,
            minValue: 0,
            value: r * filterRate,
          }),
        ) as u8,
        round(adjustValueToRange({ maxValue: 255, minValue: 0, value: g * filterRate })) as u8,
        round(adjustValueToRange({ maxValue: 255, minValue: 0, value: b * filterRate })) as u8,
        a,
      ];
    });

    // then
    expect(Reflect.equals(potentialOutput, output)).toBe(
      Reflect.SUCCESSFUL_MATCH,
      `${potentialOutput.toString()} should be ${output.toString()}`,
    );
  });
});
