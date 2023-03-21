import {
  BLUE_COLOR_RATE,
  GREEN_COLOR_RATE,
  ImageFilter,
  MAX_HUE,
  MAX_LUMINOSITY,
  MAX_RGB_VALUE,
  MAX_SATURATION,
  MIN_HUE,
  MIN_LUMINOSITY,
  MIN_RGB_VALUE,
  MIN_SATURATION,
  PIXEL_LENGTH,
  RED_COLOR_RATE,
} from './utils';

export const grayscale: ImageFilter = (pixels, filterValue) => {
  const numberOfRgbaPixels = pixels.length;
  const filterRate = 1 + filterValue / 100;
  const result = new Uint8ClampedArray(numberOfRgbaPixels);

  for (let currentIndex = 0; currentIndex < numberOfRgbaPixels; currentIndex += PIXEL_LENGTH) {
    const r = pixels[currentIndex];
    const g = pixels[currentIndex + 1];
    const b = pixels[currentIndex + 2];
    const a = pixels[currentIndex + 3];

    const avg = ((r + g + b) / 3) * filterRate;
    const adjustedAvg = Math.round(Math.max(MIN_RGB_VALUE, Math.min(MAX_RGB_VALUE, avg)));

    /* eslint-disable immutable/no-mutation */
    result[currentIndex] = adjustedAvg;
    result[currentIndex + 1] = adjustedAvg;
    result[currentIndex + 2] = adjustedAvg;
    result[currentIndex + 3] = a;
    /* eslint-enable immutable/no-mutation */
  }
  return result;
};

export const inversion: ImageFilter = (pixels, filterValue) => {
  const numberOfRgbaPixels = pixels.length;
  const filterRate = 1 + filterValue / 100;
  const result = new Uint8ClampedArray(numberOfRgbaPixels);

  for (let currentIndex = 0; currentIndex < numberOfRgbaPixels; currentIndex += PIXEL_LENGTH) {
    const r = pixels[currentIndex];
    const g = pixels[currentIndex + 1];
    const b = pixels[currentIndex + 2];
    const a = pixels[currentIndex + 3];

    const invertedR = Math.round((MAX_RGB_VALUE - r) * filterRate);
    const invertedG = Math.round((MAX_RGB_VALUE - g) * filterRate);
    const invertedB = Math.round((MAX_RGB_VALUE - b) * filterRate);

    const adjustedInvertedR = Math.max(MIN_RGB_VALUE, Math.min(MAX_RGB_VALUE, invertedR));
    const adjustedInvertedG = Math.max(MIN_RGB_VALUE, Math.min(MAX_RGB_VALUE, invertedG));
    const adjustedInvertedB = Math.max(MIN_RGB_VALUE, Math.min(MAX_RGB_VALUE, invertedB));

    /* eslint-disable immutable/no-mutation */
    result[currentIndex] = adjustedInvertedR;
    result[currentIndex + 1] = adjustedInvertedG;
    result[currentIndex + 2] = adjustedInvertedB;
    result[currentIndex + 3] = a;
    /* eslint-enable immutable/no-mutation */
  }
  return result;
};

/**
 *
 * @param valueToUpdate - 0: hue, 1: saturation, 2: luminoisty
 * @param numberOfRgbaPixels - number of pixels
 * @param filterValue - filter value (i8)
 */
const hsl = (
  valueToUpdate: number,
  pixels: Uint8ClampedArray,
  filterValue: number,
): ReturnType<ImageFilter> => {
  if (valueToUpdate > 2) throw new Error('valueToUpdate should be 0, 1 or 2');
  const numberOfRgbaPixels = pixels.length;
  const filterRate = 1 + filterValue / 100;
  const result = new Uint8ClampedArray(numberOfRgbaPixels);

  for (let currentIndex = 0; currentIndex < numberOfRgbaPixels; currentIndex += PIXEL_LENGTH) {
    const r = pixels[currentIndex];
    const g = pixels[currentIndex + 1];
    const b = pixels[currentIndex + 2];
    const a = pixels[currentIndex + 3];

    // convert rgba to hsla
    //    rgbInZeroOneRange
    const r0 = r / MAX_RGB_VALUE;
    const g0 = g / MAX_RGB_VALUE;
    const b0 = b / MAX_RGB_VALUE;

    const cMax = Math.max(r0, g0, b0);
    const cMin = Math.min(r0, g0, b0);
    const delta = cMax - cMin;

    /* eslint-disable no-nested-ternary */
    const hueBase =
      delta === 0
        ? 0
        : r0 === cMax
        ? (g0 - b0) / delta
        : g0 === cMax
        ? 2 + (b0 - r0) / delta
        : 4 + (r0 - g0) / delta;
    /* eslint-enable no-nested-ternary */

    if (hueBase < -6 || hueBase > 6)
      throw new Error('value should be grater than or egaul to -6 Or smaller than or egual to 6');

    // convert to degrees
    const h0 = hueBase * 60;
    const h = h0 < 0 ? h0 + 360 : h0;

    const l = Math.round(((cMax + cMin) / 2) * 10 ** 2) / 10 ** 2;
    const s =
      Math.round((l === 1 || delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))) * 10 ** 2) /
      10 ** 2;

    let newH = h;
    let newS = s;
    let newL = l;

    // adjust hsl
    if (valueToUpdate === 0) {
      const hueWithFilterValue = h * filterRate;
      newH = Math.max(MIN_HUE, Math.min(MAX_HUE, hueWithFilterValue));
    } else if (valueToUpdate === 1) {
      const saturationWithFilterValue = s * filterRate;
      newS = Math.max(MIN_SATURATION, Math.min(MAX_SATURATION, saturationWithFilterValue));
    } else if (valueToUpdate === 2) {
      const luminosityWithFilterValue = l * filterRate;
      newL = Math.max(MIN_LUMINOSITY, Math.min(MAX_LUMINOSITY, luminosityWithFilterValue));
    }

    let newR = 0;
    let newG = 0;
    let newB = 0;

    // convert hsla to rgba
    const aRate = newS * Math.min(newL, 1 - newL);
    for (let colorIndex = 0; colorIndex < 4; colorIndex += 1) {
      const colorRate =
        // eslint-disable-next-line no-nested-ternary
        colorIndex === 0 ? RED_COLOR_RATE : colorIndex === 1 ? GREEN_COLOR_RATE : BLUE_COLOR_RATE;
      const k = (colorRate + newH / 30) % 12;
      const colorInZeroOneRange = newL - aRate * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)));
      const color = Math.round(colorInZeroOneRange * 255);
      const adjustedColor = Math.max(MIN_RGB_VALUE, Math.min(MAX_RGB_VALUE, color));

      if (colorIndex === 0) newR = adjustedColor;
      if (colorIndex === 1) newG = adjustedColor;
      if (colorIndex === 2) newB = adjustedColor;
    }

    // set
    /* eslint-disable immutable/no-mutation */
    result[currentIndex] = newR;
    result[currentIndex + 1] = newG;
    result[currentIndex + 2] = newB;
    result[currentIndex + 3] = a;
    /* eslint-enable immutable/no-mutation */
  }
  return result;
};

export const hue: ImageFilter = (pixels, filterValue) => hsl(0, pixels, filterValue);

export const saturation: ImageFilter = (pixels, filterValue) => hsl(1, pixels, filterValue);

export const luminosity: ImageFilter = (pixels, filterValue) => hsl(2, pixels, filterValue);
