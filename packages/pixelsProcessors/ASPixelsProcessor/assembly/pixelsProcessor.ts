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
  MAX_HUE,
  MAX_LUMINOSITY,
  MAX_RGB_VALUE,
  MAX_SATURATION,
  memoryGet,
  memorySet,
  MIN_HUE,
  MIN_LUMINOSITY,
  MIN_RGB_VALUE,
  MIN_SATURATION,
  PIXEL_LENGTH,
  RED_COLOR_RATE,
  round,
} from './utils';

export function grayscale(numberOfRgbaPixels: u32, filterValue: u8): void {
  for (let currentIndex: u32 = 0; currentIndex < numberOfRgbaPixels; currentIndex += PIXEL_LENGTH) {
    const outputStartingIndex = currentIndex + numberOfRgbaPixels;
    const r = memoryGet(currentIndex);
    const g = memoryGet(currentIndex + 1);
    const b = memoryGet(currentIndex + 2);
    const a = memoryGet(currentIndex + 3);

    const avg = average(r, g, b) * calculateFilterRate(filterValue);
    const adjustedAvg = round(adjustValueToRange(MAX_RGB_VALUE, MIN_RGB_VALUE, avg)) as u8;

    memorySet(outputStartingIndex + 0, adjustedAvg);
    memorySet(outputStartingIndex + 1, adjustedAvg);
    memorySet(outputStartingIndex + 2, adjustedAvg);
    memorySet(outputStartingIndex + 3, a);
  }
}

export function inversion(numberOfRgbaPixels: u32, filterValue: u8): void {
  for (let currentIndex: u32 = 0; currentIndex < numberOfRgbaPixels; currentIndex += PIXEL_LENGTH) {
    const outputStartingIndex = currentIndex + numberOfRgbaPixels;
    const r = memoryGet(currentIndex);
    const g = memoryGet(currentIndex + 1);
    const b = memoryGet(currentIndex + 2);
    const a = memoryGet(currentIndex + 3);

    memorySet(outputStartingIndex + 0, invert(r, filterValue));
    memorySet(outputStartingIndex + 1, invert(g, filterValue));
    memorySet(outputStartingIndex + 2, invert(b, filterValue));
    memorySet(outputStartingIndex + 3, a);
  }
}

export function hue(numberOfRgbaPixels: u32, filterValue: u8): void {
  for (let currentIndex: u32 = 0; currentIndex < numberOfRgbaPixels; currentIndex += PIXEL_LENGTH) {
    const outputStartingIndex = currentIndex + numberOfRgbaPixels;
    const r = memoryGet(currentIndex);
    const g = memoryGet(currentIndex + 1);
    const b = memoryGet(currentIndex + 2);
    const a = memoryGet(currentIndex + 3);

    // convert rgba to hsla
    //    rgbInZeroOneRange
    const r0: f32 = (r as f32) / (MAX_RGB_VALUE as f32);
    const g0: f32 = (g as f32) / (MAX_RGB_VALUE as f32);
    const b0: f32 = (b as f32) / (MAX_RGB_VALUE as f32);

    const cMax = max(r0, max(g0, b0));
    const cMin = min(r0, min(g0, b0));
    const delta = cMax - cMin;

    const hueBase = calculateHueBase(r0, g0, b0, cMax, delta);

    const h = convertToDegrees(hueBase);
    const l = calculateLuminosity(cMax, cMin);
    const s = calculateSaturation(l, delta);

    // adjust hue
    const hueWithFilterValue = h * calculateFilterRate(filterValue);
    const newH = adjustValueToRange(MAX_HUE, MIN_HUE, hueWithFilterValue);

    // convert hsla to rgba
    const newR = getRgbColorFromHsl(RED_COLOR_RATE, newH, s, l);
    const newG = getRgbColorFromHsl(GREEN_COLOR_RATE, newH, s, l);
    const newB = getRgbColorFromHsl(BLUE_COLOR_RATE, newH, s, l);

    // set
    memorySet(outputStartingIndex + 0, newR);
    memorySet(outputStartingIndex + 1, newG);
    memorySet(outputStartingIndex + 2, newB);
    memorySet(outputStartingIndex + 3, a);
  }
}

export function saturation(numberOfRgbaPixels: u32, filterValue: u8): void {
  for (let currentIndex: u32 = 0; currentIndex < numberOfRgbaPixels; currentIndex += PIXEL_LENGTH) {
    const outputStartingIndex = currentIndex + numberOfRgbaPixels;
    const r = memoryGet(currentIndex);
    const g = memoryGet(currentIndex + 1);
    const b = memoryGet(currentIndex + 2);
    const a = memoryGet(currentIndex + 3);

    // convert rgba to hsla
    //    rgbInZeroOneRange
    const r0: f32 = (r as f32) / (MAX_RGB_VALUE as f32);
    const g0: f32 = (g as f32) / (MAX_RGB_VALUE as f32);
    const b0: f32 = (b as f32) / (MAX_RGB_VALUE as f32);

    const cMax = max(r0, max(g0, b0));
    const cMin = min(r0, min(g0, b0));
    const delta = cMax - cMin;

    const hueBase = calculateHueBase(r0, g0, b0, cMax, delta);

    const h = convertToDegrees(hueBase);
    const l = calculateLuminosity(cMax, cMin);
    const s = calculateSaturation(l, delta);

    // adjust saturation
    const saturationWithFilterValue = s * calculateFilterRate(filterValue);
    const newS = adjustValueToRange(MAX_SATURATION, MIN_SATURATION, saturationWithFilterValue);

    // convert hsla to rgba
    const newR = getRgbColorFromHsl(RED_COLOR_RATE, h, newS, l);
    const newG = getRgbColorFromHsl(GREEN_COLOR_RATE, h, newS, l);
    const newB = getRgbColorFromHsl(BLUE_COLOR_RATE, h, newS, l);

    // set
    memorySet(outputStartingIndex + 0, newR);
    memorySet(outputStartingIndex + 1, newG);
    memorySet(outputStartingIndex + 2, newB);
    memorySet(outputStartingIndex + 3, a);
  }
}

export function luminosity(numberOfRgbaPixels: u32, filterValue: u8): void {
  for (let currentIndex: u32 = 0; currentIndex < numberOfRgbaPixels; currentIndex += PIXEL_LENGTH) {
    const outputStartingIndex = currentIndex + numberOfRgbaPixels;
    const r = memoryGet(currentIndex);
    const g = memoryGet(currentIndex + 1);
    const b = memoryGet(currentIndex + 2);
    const a = memoryGet(currentIndex + 3);

    // convert rgba to hsla
    //    rgbInZeroOneRange
    const r0: f32 = (r as f32) / (MAX_RGB_VALUE as f32);
    const g0: f32 = (g as f32) / (MAX_RGB_VALUE as f32);
    const b0: f32 = (b as f32) / (MAX_RGB_VALUE as f32);

    const cMax = max(r0, max(g0, b0));
    const cMin = min(r0, min(g0, b0));
    const delta = cMax - cMin;

    const hueBase = calculateHueBase(r0, g0, b0, cMax, delta);

    const h = convertToDegrees(hueBase);
    const l = calculateLuminosity(cMax, cMin);
    const s = calculateSaturation(l, delta);

    // adjust luminosity
    const luminosityWithFilterValue = l * calculateFilterRate(filterValue);
    const newL = adjustValueToRange(MAX_LUMINOSITY, MIN_LUMINOSITY, luminosityWithFilterValue);

    // convert hsla to rgba
    const newR = getRgbColorFromHsl(RED_COLOR_RATE, h, s, newL);
    const newG = getRgbColorFromHsl(GREEN_COLOR_RATE, h, s, newL);
    const newB = getRgbColorFromHsl(BLUE_COLOR_RATE, h, s, newL);

    // set
    memorySet(outputStartingIndex + 0, newR);
    memorySet(outputStartingIndex + 1, newG);
    memorySet(outputStartingIndex + 2, newB);
    memorySet(outputStartingIndex + 3, a);
  }
}
