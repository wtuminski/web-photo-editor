import { RGBAPixel, RGBPixel } from './types';

//
// constants
//
const PIXEL_LENGTH = 4;
export const MAX_RGB_VALUE: u8 = 255;
export const MIN_RGB_VALUE: u8 = 0;

//
// private
//
const getPixel = (data: Uint8ClampedArray, startingIndex: u32): RGBAPixel => {
  const r = data[startingIndex];
  const g = data[startingIndex + 1];
  const b = data[startingIndex + 2];
  const a = data[startingIndex + 3];

  return [r, g, b, a];
};

//
// public
//

//
// Math helpers
class AdjustValueToRangeProps {
  public value!: f32;
  public maxValue!: f32;
  public minValue!: f32;
}
export const adjustValueToRange = (a: AdjustValueToRangeProps): f32 =>
  max(a.minValue, min(a.maxValue, a.value));

export const round = (value: f32, decimals: u8 = 0): f32 =>
  Mathf.round(value * 10 ** decimals) / 10 ** decimals;

export const getMax = (values: StaticArray<f32>): f32 => values.sort().at(-1);

export const getMin = (values: StaticArray<f32>): f32 => values.sort()[0];

export const average = (values: u8[]): f32 =>
  (values.reduce((sum, currentValue) => sum + currentValue, 0) as f32) / (values.length as f32);

//
// Transformation helpers

export const convertRgbaToRgbZeroOneRange = (rgba: RGBAPixel): RGBPixel =>
  StaticArray.fromArray(rgba.slice(0, 3).map((color: u8): f32 => (color as f32) / MAX_RGB_VALUE));

export const calculateFilterRate = (filterValue: i8): f32 => 1 + (filterValue as f32) / 100;

// mapPixles isn't written in a functional way due to performance issues (e.g. lack of proper tail call optimization)
export const mapPixels = (
  data: Uint8ClampedArray,
  filterValue: i8,
  callbackfn: (RGBAPixel: RGBAPixel, filterValue: i8) => RGBAPixel,
): Uint8ClampedArray => {
  const newData = new Uint8ClampedArray(data.length);

  for (let currentIndex = 0; currentIndex < data.length; currentIndex += PIXEL_LENGTH) {
    const currentPixel = getPixel(data, currentIndex);
    const rgba = callbackfn(currentPixel, filterValue);

    /* eslint-disable immutable/no-mutation */
    newData[currentIndex] = rgba[0];
    newData[currentIndex + 1] = rgba[1];
    newData[currentIndex + 2] = rgba[2];
    newData[currentIndex + 3] = rgba[3];
    /* eslint-enable immutable/no-mutation */
  }

  return newData;
};
