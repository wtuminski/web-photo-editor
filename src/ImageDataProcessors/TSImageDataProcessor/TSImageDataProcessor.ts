import { MAX_RGB_VALUE } from '~/Utils/constants';

import { hslaToRgba, rgbaToHsla } from './colorConverters';
import {
  adjustValueToRange,
  average,
  bindMethodsWithImageData,
  calculateFilterRate,
  ImageFilter,
  mapPixles,
  withApplyFilterOnImageDataCopy,
} from './utils';

//
// Filters
//

const grayscale: ImageFilter = (pixels, filterValue) =>
  mapPixles(pixels, ([r, g, b, a]) => {
    const avg = average([r, g, b]) * calculateFilterRate(filterValue);
    return [avg, avg, avg, a];
  });

const inversion: ImageFilter = (pixels, filterValue) => {
  const invert = (value: number) => (MAX_RGB_VALUE - value) * calculateFilterRate(filterValue);
  return mapPixles(pixels, ([r, g, b, a]) => [invert(r), invert(g), invert(b), a]);
};

const hue: ImageFilter = (pixels, filterValue) =>
  mapPixles(pixels, rgba => {
    const [h, s, l, a] = rgbaToHsla(rgba);
    const hueWithFilterValue = h * calculateFilterRate(filterValue);
    const newHue = adjustValueToRange({ max: 360, min: 0, value: hueWithFilterValue });
    const newRgba = hslaToRgba([newHue, s, l, a]);
    return newRgba;
  });

const saturation: ImageFilter = (pixels, filterValue) =>
  mapPixles(pixels, rgba => {
    const [h, s, l, a] = rgbaToHsla(rgba);
    const saturationWithFilterValue = s * calculateFilterRate(filterValue);
    const newSaturation = adjustValueToRange({ max: 1, min: 0, value: saturationWithFilterValue });
    const newRgba = hslaToRgba([h, newSaturation, l, a]);
    return newRgba;
  });

const luminosity: ImageFilter = (pixels, filterValue) =>
  mapPixles(pixels, rgba => {
    const [h, s, l, a] = rgbaToHsla(rgba);
    const luminosityWithFilterValue = l * calculateFilterRate(filterValue);
    const newLuminosity = adjustValueToRange({ max: 1, min: 0, value: luminosityWithFilterValue });
    const newRgba = hslaToRgba([h, s, newLuminosity, a]);
    return newRgba;
  });

//
// Module factory
//

export const createImageDataProcessor = (imageData: ImageData): ImageDataProcessor =>
  bindMethodsWithImageData<ImageFilterType>(
    {
      grayscale: withApplyFilterOnImageDataCopy(grayscale),
      inversion: withApplyFilterOnImageDataCopy(inversion),
      hue: withApplyFilterOnImageDataCopy(hue),
      saturation: withApplyFilterOnImageDataCopy(saturation),
      luminosity: withApplyFilterOnImageDataCopy(luminosity),
    },
    imageData,
  );
