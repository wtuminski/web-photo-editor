import {
  adjustValueToRange,
  average,
  BLUE_COLOR_RATE,
  calculateFilterRate,
  calculateHueBase,
  calculateLuminosity,
  calculateSaturation,
  convertToDegrees,
  getRgbColorFromHsl,
  GREEN_COLOR_RATE,
  invert,
  memoryGet,
  memorySet,
  RED_COLOR_RATE,
  round,
} from '../utils';

describe('utils', () => {
  test('round', () => {
    expect(round(0)).toBe(0);
    expect(round(100)).toBe(100);
    expect(round(0, 2)).toBe(0.0);
    expect(round(0.122)).toBe(0);
    expect(round(2.1346, 2)).toBe(2.13);
    expect(round(0.48235294222831726, 6)).toBe(0.482353);
  });

  test('adjustValueToRange', () => {
    expect(adjustValueToRange(360, 0, 200)).toBe(200);
    expect(adjustValueToRange(360, 0, 500)).toBe(360);
    expect(adjustValueToRange(360, 0, -10)).toBe(0);
    expect(adjustValueToRange(25.5, -15.4, -10.1)).toBe(-10.1);
    expect(adjustValueToRange(25.5, -15.4, 26.1)).toBe(25.5);
    expect(adjustValueToRange(25.5, -15.4, -16.4)).toBe(-15.4);
    expect((): void => {
      adjustValueToRange(-3, 0, 1);
    }).toThrow('maxValue must be grater than or equal to minValue');
  });

  test('average', () => {
    expect(average(1, 2, 5)).toBe(2.66666667);
    expect(average(10, 22, 255)).toBe(95.66666667);
    expect(average(0, 128, 255)).toBe(127.66666667);
    expect(average(0, 0, 0)).toBe(0);
    expect(average(255, 255, 255)).toBe(255);
  });

  test('calculateFilterRate', () => {
    expect(calculateFilterRate(10)).toBe(1.1);
    expect(calculateFilterRate(99)).toBe(1.99);
    expect(calculateFilterRate(0)).toBe(1);
    expect(calculateFilterRate(127)).toBe(2.27);
    expect(calculateFilterRate(-128)).toBe(-0.27999997);
    expect(calculateFilterRate(-11)).toBe(0.89);
  });

  test('convertToDegrees', () => {
    expect(convertToDegrees(-6)).toBe(<f32>0);
    expect(convertToDegrees(6)).toBe(<f32>360);
    expect(convertToDegrees(0)).toBe(<f32>0);
    expect(convertToDegrees(2)).toBe(<f32>120);
    expect(convertToDegrees(-2)).toBe(<f32>240);
    expect((): void => {
      convertToDegrees(-6.1);
    }).toThrow('value should be grater than or egaul to -6 Or smaller than or egual to 6');
    expect((): void => {
      convertToDegrees(6.1);
    }).toThrow('value should be grater than or egaul to -6 Or smaller than or egual to 6');
  });

  test('getRgbColorFromHsl', () => {
    expect(getRgbColorFromHsl(RED_COLOR_RATE, 0, 0, 1)).toBe(255);
    expect(getRgbColorFromHsl(GREEN_COLOR_RATE, 0, 0, 1)).toBe(255);
    expect(getRgbColorFromHsl(BLUE_COLOR_RATE, 0, 0, 1)).toBe(255);
    expect(getRgbColorFromHsl(RED_COLOR_RATE, 112, 0.46, 0.55)).toBe(102);
    expect(getRgbColorFromHsl(GREEN_COLOR_RATE, 112, 0.46, 0.55)).toBe(193);
    expect(getRgbColorFromHsl(BLUE_COLOR_RATE, 112, 0.46, 0.55)).toBe(87);
  });

  test('invert', () => {
    expect(invert(0, 0)).toBe(255);
    expect(invert(255, 0)).toBe(0);
    expect(invert(200, 0)).toBe(55);
    expect(invert(200, 50)).toBe(83);
    expect(invert(255, -128)).toBe(0);
    expect(invert(55, -128)).toBe(0);
    expect(invert(180, -128)).toBe(0);
    expect(invert(180, 127)).toBe(170);
    expect(invert(0, 127)).toBe(255);
  });

  test('calculateHueBase', () => {
    expect(calculateHueBase(0, 0, 0, 0, 0)).toBe(0);
    expect(calculateHueBase(1, 1, 1, 1, 0)).toBe(0);
    expect(calculateHueBase(1, 0, 0, 1, 0.5)).toBe(0);
    expect(calculateHueBase(1, 1, 0, 1, 0.5)).toBe(2);
    expect(calculateHueBase(0, 1, 0, 1, 0.5)).toBe(2);
    expect(calculateHueBase(0.9, 1, 0, 1, 0.5)).toBeCloseTo(0.2, 7);
    expect(calculateHueBase(0, 0, 1, 1, 0.5)).toBe(4);
    expect(calculateHueBase(0, 0.8, 1, 1, 0.5)).toBe(2.4);
  });

  test('calculateLuminosity', () => {
    expect(calculateLuminosity(0, 0)).toBe(0);
    expect(calculateLuminosity(1, 1)).toBe(1);
    expect(calculateLuminosity(1, 0)).toBe(0.5);
    expect(calculateLuminosity(0, 1)).toBe(0.5);
    expect(calculateLuminosity(0.4, 0.7)).toBe(0.55);
  });

  test('calculateSaturation', () => {
    expect(calculateSaturation(1, 0)).toBe(0);
    expect(calculateSaturation(1, 0.5)).toBe(0);
    expect(calculateSaturation(0.5, 0)).toBe(0);
    expect(calculateSaturation(0.5, 0.5)).toBe(0.5);
    expect(calculateSaturation(0.4, 0.8)).toBe(1);
    expect(calculateSaturation(0.4, 0.7)).toBe(0.88);
  });

  test('memoryGet', () => {
    memory.fill(0, 5, 3);
    memory.fill(3, 10, 8);

    expect(memoryGet(0)).toBe(5, '0');
    expect(memoryGet(2)).toBe(5, '2');
    expect(memoryGet(3)).toBe(10, '3');
    expect(memoryGet(10)).toBe(10, '10');

    // clean up
    memory.fill(0, 0, 10);
  });

  test('memorySet', () => {
    memorySet(15, 7);
    memorySet(20, 9);

    expect(memoryGet(15)).toBe(7);
    expect(memoryGet(20)).toBe(9);

    // clean up
    memory.fill(15, 0, 5);
  });
});
