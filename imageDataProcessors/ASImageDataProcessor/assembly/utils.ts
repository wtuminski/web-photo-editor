import { RGBAPixel, RGBPixel } from './types';

//
// constants
//
const MAX_RGB_VALUE: u8 = 255;

//
// helpers
//
export const round = (value: f32, decimals: u8 = 0): f32 =>
  Mathf.round(value * 10 ** decimals) / 10 ** decimals;

export const getMax = (values: StaticArray<f32>): f32 => values.sort().at(-1);

export const getMin = (values: StaticArray<f32>): f32 => values.sort()[0];

export const convertRgbaToRgbZeroOneRange = (rgba: RGBAPixel): RGBPixel =>
  StaticArray.fromArray(rgba.slice(0, 3).map((color: u8): f32 => (color as f32) / MAX_RGB_VALUE));
