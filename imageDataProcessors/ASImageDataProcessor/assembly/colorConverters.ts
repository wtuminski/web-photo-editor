import { HSLAPixel, RGBAPixel, RGBPixel } from './types';
import { convertRgbaToRgbZeroOneRange, getMax, getMin, round } from './utils';

//
// private
//

/**
 * @param rgb - RGBPixel in 0 - 1 range
 * @param cMax - 0 to 1
 * @param delta - 0 to 1
 */
const calculateHueBase = (rgb: RGBPixel, cMax: f32, delta: f32): f32 => {
  const r: f32 = rgb[0];
  const g: f32 = rgb[1];
  const b: f32 = rgb[2];
  if (delta === 0) return 0;
  if (r === cMax) return (g - b) / delta;
  if (g === cMax) return 2 + (b - r) / delta;
  return 4 + (r - g) / delta;
};

/**
 * @param cMax - 0 to 1
 * @param cMin  - 0 to 1
 * @param delta - 0 to 1
 */
const calculateHue = (rgba: RGBAPixel, cMax: f32, delta: f32): u16 => {
  const rgb = convertRgbaToRgbZeroOneRange(rgba);
  const convertToDegrees = (value: f32): f32 =>
    ((valueInDegrees: f32): f32 => (valueInDegrees < 0 ? valueInDegrees + 360 : valueInDegrees))(
      value * 60,
    );

  return round(convertToDegrees(calculateHueBase(rgb, cMax, delta))) as u16;
};

/**
 * @param luminosity - 0 to 1
 * @param delta - 0 to 1
 */
const calculateSaturation = (luminosity: f32, delta: f32): f32 => {
  const saturation: f32 = (
    luminosity === 1 || delta === 0 ? 0 : delta / (1 - abs(2.0 * luminosity - 1))
  ) as f32;
  return round(saturation, 2);
};

/**
 * @param cMax - 0 to 1
 * @param cMin  - 0 to 1
 */
const calculateLuminosity = (cMax: f32, cMin: f32): f32 => {
  const luminosity = (cMax + cMin) / 2;
  return round(luminosity, 2);
};

//
// public
//

export function rgbaToHsla(rgba: RGBAPixel): HSLAPixel {
  const rgbInZeroOneRange = convertRgbaToRgbZeroOneRange(rgba);
  const alpha = rgba[3];
  const cMax = getMax(rgbInZeroOneRange);
  const cMin = getMin(rgbInZeroOneRange);
  const delta = cMax - cMin;

  const hue = calculateHue(rgba, cMax, delta);
  const luminosity = calculateLuminosity(cMax, cMin);
  const saturation = calculateSaturation(luminosity, delta);

  return StaticArray.fromArray([hue, saturation, luminosity, alpha]);
}

export function hslaToRgba(hsla: HSLAPixel): RGBAPixel {
  const h = hsla[0] as u16;
  const s = hsla[1];
  const l = hsla[2];
  const alpha = hsla[3] as u8;

  const k = (colorFactor: u8, hue: f32): f32 => (colorFactor + hue / 30) % 12;
  const calculateColor = (colorFactor: u8, hue: u16, saturation: f32, luminosity: f32): u8 => {
    const a = saturation * min(luminosity, 1 - luminosity);
    const color: f32 =
      luminosity -
      a * max(-1 as f32, min(k(colorFactor, hue) - 3, min((9 as f32) - k(colorFactor, hue), 1)));
    return round(color * 255) as u8;
  };

  return [
    calculateColor(0, h, s, l),
    calculateColor(8, h, s, l),
    calculateColor(4, h, s, l),
    alpha,
  ];
}
