import {
  BLUE_COLOR_RATE,
  GREEN_COLOR_RATE,
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

export function grayscale(numberOfRgbaPixels: u32, filterValue: i8): void {
  const filterRate = <f32>1 + <f32>filterValue / <f32>100;

  for (
    let currentIndex: usize = 0;
    currentIndex < numberOfRgbaPixels;
    currentIndex += PIXEL_LENGTH
  ) {
    const outputStartingIndex = currentIndex + numberOfRgbaPixels;
    const r = load<u8>(currentIndex) as f32;
    const g = load<u8>(currentIndex + 1) as f32;
    const b = load<u8>(currentIndex + 2) as f32;
    const a = load<u8>(currentIndex + 3);

    const avg = ((r + g + b) / <f32>3) * filterRate;
    const adjustedAvg = Mathf.round(max<f32>(MIN_RGB_VALUE, min<f32>(MAX_RGB_VALUE, avg))) as u8;

    store<u8>(outputStartingIndex, adjustedAvg);
    store<u8>(outputStartingIndex + 1, adjustedAvg);
    store<u8>(outputStartingIndex + 2, adjustedAvg);
    store<u8>(outputStartingIndex + 3, a);
  }
}

export function inversion(numberOfRgbaPixels: u32, filterValue: i8): void {
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

    const invertedR = Mathf.round(((MAX_RGB_VALUE - r) as f32) * filterRate);
    const invertedG = Mathf.round(((MAX_RGB_VALUE - g) as f32) * filterRate);
    const invertedB = Mathf.round(((MAX_RGB_VALUE - b) as f32) * filterRate);

    const adjustedInvertedR = max<u8>(MIN_RGB_VALUE, min<f32>(MAX_RGB_VALUE, invertedR) as u8);
    const adjustedInvertedG = max<u8>(MIN_RGB_VALUE, min<f32>(MAX_RGB_VALUE, invertedG) as u8);
    const adjustedInvertedB = max<u8>(MIN_RGB_VALUE, min<f32>(MAX_RGB_VALUE, invertedB) as u8);

    store<u8>(outputStartingIndex, adjustedInvertedR);
    store<u8>(outputStartingIndex + 1, adjustedInvertedG);
    store<u8>(outputStartingIndex + 2, adjustedInvertedB);
    store<u8>(outputStartingIndex + 3, a);
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

    // convert hueBase to degrees
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

    let newR = 0;
    let newG = 0;
    let newB = 0;

    // convert hsla to rgba
    const aRate: f32 = newS * min(newL, <f32>1 - newL);
    for (let colorIndex = 0; colorIndex < 4; colorIndex += 1) {
      const colorRate =
        // eslint-disable-next-line no-nested-ternary
        colorIndex === 0 ? RED_COLOR_RATE : colorIndex === 1 ? GREEN_COLOR_RATE : BLUE_COLOR_RATE;
      const k: f32 = (colorRate + newH / <f32>30) % <f32>12;
      const colorInZeroOneRange: f32 =
        newL - aRate * max(<f32>-1, min(k - <f32>3, min(<f32>9 - k, <f32>1)));
      const color: u8 = Mathf.round(colorInZeroOneRange * <f32>255) as u8;
      const adjustedColor = max<u8>(MIN_RGB_VALUE, min<u8>(MAX_RGB_VALUE, color));

      if (colorIndex === 0) newR = adjustedColor;
      if (colorIndex === 1) newG = adjustedColor;
      if (colorIndex === 2) newB = adjustedColor;
    }

    // set
    store<u8>(outputStartingIndex, newR);
    store<u8>(outputStartingIndex + 1, newG);
    store<u8>(outputStartingIndex + 2, newB);
    store<u8>(outputStartingIndex + 3, a);
  }
}

export function hue(numberOfRgbaPixels: u32, filterValue: i8): void {
  hsl(0, numberOfRgbaPixels, filterValue);
}

export function saturation(numberOfRgbaPixels: u32, filterValue: i8): void {
  hsl(1, numberOfRgbaPixels, filterValue);
}

export function luminosity(numberOfRgbaPixels: u32, filterValue: i8): void {
  hsl(2, numberOfRgbaPixels, filterValue);
}
