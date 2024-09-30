//
// constants
//

export const PIXEL_LENGTH: u8 = 4;
export const MAX_RGB_VALUE: u8 = 255;
export const MIN_RGB_VALUE: u8 = 0;
export const MIN_HUE: u8 = 0;
export const MAX_HUE: u16 = 360;
export const MIN_LUMINOSITY: u8 = 0;
export const MAX_LUMINOSITY: u8 = 1;
export const MIN_SATURATION: u8 = 0;
export const MAX_SATURATION: u8 = 1;
export const RED_COLOR_RATE: u8 = 0;
export const GREEN_COLOR_RATE: u8 = 8;
export const BLUE_COLOR_RATE: u8 = 4;

//
// Math utils
//

@inline
export function adjustValueToRange(maxValue: f32, minValue: f32, value: f32): f32 {
  if (maxValue < minValue) throw new Error('maxValue must be grater than or equal to minValue');
  return max(minValue, min(maxValue, value));
}

/**
 *
 * @param a - 0 - 255
 * @param b - 0 - 255
 * @param c - 0 - 255
 */
@inline
export function average(a: u8, b: u8, c: u8): f32 {
  return (((a as f32 + b as f32 + c as f32) as f32) / 3 as f32) as f32;
}

/**
 *
 * @param value - -6 to 6
 */
@inline
export function convertToDegrees(value: f32): f32 {
  if (value < -6 || value > 6)
    throw new Error('value should be grater than or egaul to -6 Or smaller than or egual to 6');
  const valueInDegrees: f32 = value * <f32>60;
  return valueInDegrees < 0 ? valueInDegrees + <f32>360 : valueInDegrees;
}

@inline
export function round(value: f32, decimals: u8 = 0): f32 {
  return Mathf.round(value * 10 ** decimals) / 10 ** decimals;
}

//
// Transformation helpers
//

/**
 *
 * @param filterValue - -128 - 127
 */
@inline
export function calculateFilterRate(filterValue: i8): f32 {
  return 1 + (filterValue as f32) / 100;
}

/**
 *
 * @param colorRate - 0 | 8 | 4
 * @param h - 0 - 360
 * @param s - 0 - 1
 * @param l - 0 -1
 */
export function getRgbColorFromHsl(colorRate: f32, h: f32, s: f32, l: f32): u8 {
  const a: f32 = s * min(l, <f32>1 - l);
  const k: f32 = (colorRate + h / <f32>30) % <f32>12;
  const colorInZeroOneRange: f32 = l - a * max(<f32>-1, min(k - <f32>3, min(<f32>9 - k, <f32>1)));
  const color: u8 = round(colorInZeroOneRange * <f32>255) as u8;
  const adjustedColor = adjustValueToRange(MAX_RGB_VALUE, MIN_RGB_VALUE, color) as u8;

  return adjustedColor;
}

/**
 *
 * @param value - 0 - 255
 * @param filterValue - -128 - 127
 */
@inline
export function invert(value: u8, filterValue: i8): u8 {
  const inverted = (MAX_RGB_VALUE - value) * calculateFilterRate(filterValue);
  return round(adjustValueToRange(MAX_RGB_VALUE, MIN_RGB_VALUE, inverted)) as u8;
}

//
// color utils
//

/**
 * @param r - 0 to 1
 * @param g  - 0 to 1
 * @param b  - 0 to 1
 * @param cMax - 0 to 1
 * @param delta  - 0 to 1
 */
export function calculateHueBase(r: f32, g: f32, b: f32, cMax: f32, delta: f32): f32 {
  if (delta === 0) return 0;
  if (r === cMax) return (g - b) / delta;
  if (g === cMax) return <f32>2 + (b - r) / delta;
  return <f32>4 + (r - g) / delta;
}

/**
 * @param cMax - 0 to 1
 * @param cMin  - 0 to 1
 */
@inline
export function calculateLuminosity(cMax: f32, cMin: f32): f32 {
  const luminosity = (cMax + cMin) / <f32>2;
  return round(luminosity, 2);
}

/**
 * @param luminosity - 0 to 1
 * @param delta - 0 to 1
 */
@inline
export function calculateSaturation(luminosity: f32, delta: f32): f32 {
  const saturation: f32 = (
    luminosity === 1 || delta === 0 ? 0 : delta / (<f32>1 - abs(<f32>2 * luminosity - <f32>1))
  ) as f32;
  return round(saturation, 2);
}

//
// memory helpers
//

@inline
export function memoryGet(index: u32): u8 {
  return load<u8>(index);
}

@inline
export function memorySet(index: u32, value: u8): void {
  store<u8>(index, value);
}
