import {
  BLUE_COLOR_RATE,
  GREEN_COLOR_RATE,
  MAX_HUE,
  MAX_LUMINOSITY,
  MAX_RGB_VALUE,
  MAX_SATURATION,
  MIN_HUE,
  MIN_LUMINOSITY,
  MIN_SATURATION,
  PIXEL_LENGTH,
  RED_COLOR_RATE,
} from './utils';

const SIMD_WIDTH: u8 = 16;
const MIN_RGB_VALUES = f32x4.splat(0);
const MAX_RGB_VALUES = f32x4.splat(255);
const MINUS_ONES = f32x4.splat(-1);
const ONES = f32x4.splat(1);
const THREES = f32x4.splat(3);
const NINES = f32x4.splat(9);
const TWELVES = f32x4.splat(12);

export function grayscaleSIMD(numberOfRgbaPixels: u32, filterValue: i8): void {
  const filterRate = f32x4.splat(<f32>1 + <f32>filterValue / <f32>100);

  for (let currentIndex: usize = 0; currentIndex < numberOfRgbaPixels; currentIndex += SIMD_WIDTH) {
    const r = load<u8>(currentIndex);
    const g = load<u8>(currentIndex + 1);
    const b = load<u8>(currentIndex + 2);
    const a = load<u8>(currentIndex + 3);

    const r1 = load<u8>(currentIndex + 4);
    const g1 = load<u8>(currentIndex + 5);
    const b1 = load<u8>(currentIndex + 6);
    const a1 = load<u8>(currentIndex + 7);

    const r2 = load<u8>(currentIndex + 8);
    const g2 = load<u8>(currentIndex + 9);
    const b2 = load<u8>(currentIndex + 10);
    const a2 = load<u8>(currentIndex + 11);

    const r3 = load<u8>(currentIndex + 12);
    const g3 = load<u8>(currentIndex + 13);
    const b3 = load<u8>(currentIndex + 14);
    const a3 = load<u8>(currentIndex + 15);

    const avgs = f32x4.mul(
      f32x4.div(f32x4(r + g + b, r1 + g1 + b1, r2 + g2 + b2, r3 + g3 + b3), THREES),
      filterRate,
    );

    // f32x4.nearest rounds the value to the nearest integer using HALF_TO_EVEN rounding mode!
    const adjustedAvgs = f32x4.nearest(f32x4.max(MIN_RGB_VALUES, f32x4.min(avgs, MAX_RGB_VALUES)));
    const adjustedAvg = f32x4.extract_lane(adjustedAvgs, 0) as u8;
    const adjustedAvg1 = f32x4.extract_lane(adjustedAvgs, 1) as u8;
    const adjustedAvg2 = f32x4.extract_lane(adjustedAvgs, 2) as u8;
    const adjustedAvg3 = f32x4.extract_lane(adjustedAvgs, 3) as u8;

    v128.store(
      currentIndex + numberOfRgbaPixels,
      i8x16(
        adjustedAvg,
        adjustedAvg,
        adjustedAvg,
        a,
        adjustedAvg1,
        adjustedAvg1,
        adjustedAvg1,
        a1,
        adjustedAvg2,
        adjustedAvg2,
        adjustedAvg2,
        a2,
        adjustedAvg3,
        adjustedAvg3,
        adjustedAvg3,
        a3,
      ),
    );
  }
}

export function inversionSIMD(numberOfRgbaPixels: u32, filterValue: i8): void {
  const filterRate = f32x4.splat(<f32>1 + <f32>filterValue / <f32>100);

  for (
    let currentIndex: usize = 0;
    currentIndex < numberOfRgbaPixels;
    currentIndex += PIXEL_LENGTH
  ) {
    const rgbaPixels = f32x4(
      load<u8>(currentIndex),
      load<u8>(currentIndex + 1),
      load<u8>(currentIndex + 2),
      255,
    );

    const inverteds = f32x4.sub(MAX_RGB_VALUES, rgbaPixels);
    const adjustedInverteds = f32x4.max(
      MIN_RGB_VALUES,
      f32x4.min(f32x4.mul(inverteds, filterRate), MAX_RGB_VALUES),
    );

    store<u8>(currentIndex + numberOfRgbaPixels, f32x4.extract_lane(adjustedInverteds, 0) as u8);
    store<u8>(
      currentIndex + numberOfRgbaPixels + 1,
      f32x4.extract_lane(adjustedInverteds, 1) as u8,
    );
    store<u8>(
      currentIndex + numberOfRgbaPixels + 2,
      f32x4.extract_lane(adjustedInverteds, 2) as u8,
    );
    store<u8>(currentIndex + numberOfRgbaPixels + 3, MAX_RGB_VALUE);
  }
}

/**
 *
 * @param valueToUpdate - 0: hue, 1: saturation, 2: luminoisty
 * @param numberOfRgbaPixels - number of pixels (u32)
 * @param filterValue - filter value (i8)
 */
function hsl(valueToUpdate: u8, numberOfRgbaPixels: u32, filterValue: i8): void {
  if (valueToUpdate > 2) throw new Error('valueToUpdate should be 0, 1 or 2');
  const filterRate = <f32>1 + <f32>filterValue / <f32>100;

  for (
    let currentIndex: usize = 0;
    currentIndex < numberOfRgbaPixels;
    currentIndex += PIXEL_LENGTH
  ) {
    const outputStartingIndex = currentIndex + numberOfRgbaPixels;
    const r = load<u8>(currentIndex);
    const g = load<u8>(currentIndex + 1);
    const b = load<u8>(currentIndex + 2);
    const a = load<u8>(currentIndex + 3);

    // convert rgba to hsla
    //    rgbInZeroOneRange
    const r0: f32 = (r as f32) / (MAX_RGB_VALUE as f32);
    const g0: f32 = (g as f32) / (MAX_RGB_VALUE as f32);
    const b0: f32 = (b as f32) / (MAX_RGB_VALUE as f32);

    const cMax = max(r0, max(g0, b0));
    const cMin = min(r0, min(g0, b0));
    const delta = cMax - cMin;

    /* eslint-disable no-nested-ternary */
    const hueBase =
      delta === 0
        ? <f32>0
        : r0 === cMax
          ? (g0 - b0) / delta
          : g0 === cMax
            ? <f32>2 + (b0 - r0) / delta
            : <f32>4 + (r0 - g0) / delta;
    /* eslint-enable no-nested-ternary */

    if (hueBase < -6 || hueBase > 6)
      throw new Error('value should be grater than or egaul to -6 Or smaller than or egual to 6');

    // convert to degrees
    const h0: f32 = hueBase * <f32>60;
    const h = h0 < 0 ? h0 + <f32>360 : h0;

    const l = Mathf.round(((cMax + cMin) / <f32>2) * 10 ** 2) / 10 ** 2;
    const s =
      Mathf.round(
        ((l === 1 || delta === 0 ? <f32>0 : delta / (<f32>1 - abs(<f32>2 * l - <f32>1))) as f32) *
          10 ** 2,
      ) /
      10 ** 2;

    let newH: f32 = h;
    let newS: f32 = s;
    let newL: f32 = l;

    // adjust hsl
    if (valueToUpdate === 0) {
      const hueWithFilterValue = h * filterRate;
      newH = max<f32>(MIN_HUE, min<f32>(MAX_HUE, hueWithFilterValue));
    } else if (valueToUpdate === 1) {
      const saturationWithFilterValue = s * filterRate;
      newS = max<f32>(MIN_SATURATION, min<f32>(MAX_SATURATION, saturationWithFilterValue));
    } else if (valueToUpdate === 2) {
      const luminosityWithFilterValue = l * filterRate;
      newL = max<f32>(MIN_LUMINOSITY, min<f32>(MAX_LUMINOSITY, luminosityWithFilterValue));
    }

    // convert hsla to rgba
    const aRates = f32x4.splat(newS * min(newL, <f32>1 - newL));
    const colorRates = f32x4(RED_COLOR_RATE, GREEN_COLOR_RATE, BLUE_COLOR_RATE, 0);
    const ksBase = f32x4.add(colorRates, f32x4.splat(newH / <f32>30));
    const ks = f32x4.sub(ksBase, f32x4.mul(f32x4.floor(f32x4.div(ksBase, TWELVES)), TWELVES));
    const colorsInZeroOneRange = f32x4.sub(
      f32x4.splat(newL),
      f32x4.mul(
        aRates,
        f32x4.max(
          MINUS_ONES,
          f32x4.min(f32x4.sub(ks, THREES), f32x4.min(f32x4.sub(NINES, ks), ONES)),
        ),
      ),
    );
    const colors = f32x4.mul(colorsInZeroOneRange, MAX_RGB_VALUES);
    // f32x4.nearest rounds the value to the nearest integer using HALF_TO_EVEN rounding mode!
    const adjustedColors = f32x4.nearest(
      f32x4.max(MIN_RGB_VALUES, f32x4.min(MAX_RGB_VALUES, colors)),
    );

    // set
    store<u8>(outputStartingIndex, f32x4.extract_lane(adjustedColors, 0) as u8);
    store<u8>(outputStartingIndex + 1, f32x4.extract_lane(adjustedColors, 1) as u8);
    store<u8>(outputStartingIndex + 2, f32x4.extract_lane(adjustedColors, 2) as u8);
    store<u8>(outputStartingIndex + 3, a);
  }
}

export function hueSIMD(numberOfRgbaPixels: u32, filterValue: i8): void {
  hsl(0, numberOfRgbaPixels, filterValue);
}

export function saturationSIMD(numberOfRgbaPixels: u32, filterValue: i8): void {
  hsl(1, numberOfRgbaPixels, filterValue);
}

export function luminositySIMD(numberOfRgbaPixels: u32, filterValue: i8): void {
  hsl(2, numberOfRgbaPixels, filterValue);
}
