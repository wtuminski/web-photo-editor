import { HSLAPixel, MAX_RGB_VALUE, RGBAPixel } from '@web-photo-editor/utils';

const round = (v: number, decimals: number = 0) => Math.round(v * 10 ** decimals) / 10 ** decimals;

const converRgbaToRgbZeroOneRange = (rgba: RGBAPixel) =>
  rgba.slice(0, 3).map(color => color / MAX_RGB_VALUE) as [number, number, number];

const calculateHue = (rgba: RGBAPixel, cMax: number, delta: number): number => {
  const [r, g, b] = converRgbaToRgbZeroOneRange(rgba);
  const calculateHueBase = () => {
    if (delta === 0) return 0;
    if (r === cMax) return (g - b) / delta;
    if (g === cMax) return 2 + (b - r) / delta;
    return 4 + (r - g) / delta;
  };
  const convertToDegrees = (value: number) =>
    ((valueInDegrees: number) => (valueInDegrees < 0 ? valueInDegrees + 360 : valueInDegrees))(
      value * 60,
    );

  return round(convertToDegrees(calculateHueBase()));
};

const calculateSaturation = (luminosity: number, delta: number): number => {
  const saturation =
    luminosity === 1 || delta === 0 ? 0 : delta / (1 - Math.abs(2 * luminosity - 1));
  return round(saturation, 2);
};

const calculateLuminosity = (cMax: number, cMin: number): number => {
  const luminosity = (cMax + cMin) / 2;
  return round(luminosity, 2);
};

export const rgbaToHsla = (rgba: RGBAPixel) => {
  const rgbInZeroOneRange = converRgbaToRgbZeroOneRange(rgba);
  const alpha = rgba[3];
  const cMax = Math.max(...rgbInZeroOneRange);
  const cMin = Math.min(...rgbInZeroOneRange);
  const delta = cMax - cMin;

  const hue = calculateHue(rgba, cMax, delta);
  const luminosity = calculateLuminosity(cMax, cMin);
  const saturation = calculateSaturation(luminosity, delta);

  return [hue, saturation, luminosity, alpha];
};

export const hslaToRgba = ([h, s, l, alpha]: HSLAPixel): RGBAPixel => {
  const k = (colorFactor: number) => (colorFactor + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const calculateColor = (colorFactor: number) => {
    const color =
      l - a * Math.max(-1, Math.min(k(colorFactor) - 3, Math.min(9 - k(colorFactor), 1)));
    return round(color * 255);
  };
  return [calculateColor(0), calculateColor(8), calculateColor(4), alpha];
};
