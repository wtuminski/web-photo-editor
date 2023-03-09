import { hslaToRgba, rgbaToHsla } from './colorConverters';
import {
  adjustValueToRange,
  average,
  calculateFilterRate,
  ImageFilter,
  mapPixles,
  MAX_RGB_VALUE,
  MIN_RGB_VALUE,
} from './utils';

export const grayscale: ImageFilter = (pixels, filterValue) =>
  mapPixles(pixels, ([r, g, b, a]) => {
    const avg = average([r, g, b]) * calculateFilterRate(filterValue);
    const adjustedAvg = adjustValueToRange({ max: MAX_RGB_VALUE, min: MIN_RGB_VALUE, value: avg });
    return [adjustedAvg, adjustedAvg, adjustedAvg, a];
  });

export const inversion: ImageFilter = (pixels, filterValue) => {
  const invert = (value: number) => {
    const inverted = (MAX_RGB_VALUE - value) * calculateFilterRate(filterValue);
    return adjustValueToRange({ max: MAX_RGB_VALUE, min: MIN_RGB_VALUE, value: inverted });
  };
  return mapPixles(pixels, ([r, g, b, a]) => [invert(r), invert(g), invert(b), a]);
};

export const hue: ImageFilter = (pixels, filterValue) =>
  mapPixles(pixels, rgba => {
    const [h, s, l, a] = rgbaToHsla(rgba);
    const hueWithFilterValue = h * calculateFilterRate(filterValue);
    const newHue = adjustValueToRange({ max: 360, min: 0, value: hueWithFilterValue });
    const newRgba = hslaToRgba([newHue, s, l, a]);

    return newRgba;
  });

export const saturation: ImageFilter = (pixels, filterValue) =>
  mapPixles(pixels, rgba => {
    const [h, s, l, a] = rgbaToHsla(rgba);
    const saturationWithFilterValue = s * calculateFilterRate(filterValue);
    const newSaturation = adjustValueToRange({ max: 1, min: 0, value: saturationWithFilterValue });
    const newRgba = hslaToRgba([h, newSaturation, l, a]);
    return newRgba;
  });

export const luminosity: ImageFilter = (pixels, filterValue) =>
  mapPixles(pixels, rgba => {
    const [h, s, l, a] = rgbaToHsla(rgba);
    const luminosityWithFilterValue = l * calculateFilterRate(filterValue);
    const newLuminosity = adjustValueToRange({ max: 1, min: 0, value: luminosityWithFilterValue });
    const newRgba = hslaToRgba([h, s, newLuminosity, a]);
    return newRgba;
  });
