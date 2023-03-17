//
// types
//
export type RGBAPixel = [red: number, green: number, blue: number, alpha: number];
export type HSLAPixel = [hue: number, saturation: number, luminosity: number, alpha: number];
export type ImageFilter = (pixels: Uint8ClampedArray, filterValue: number) => Uint8ClampedArray;

//
// constants
//
export const PIXEL_LENGTH = 4;
export const MAX_RGB_VALUE = 255;
export const MIN_RGB_VALUE = 0;
export const MIN_HUE = 0;
export const MAX_HUE = 360;
export const MIN_LUMINOSITY = 0;
export const MAX_LUMINOSITY = 1;
export const MIN_SATURATION = 0;
export const MAX_SATURATION = 1;
export const RED_COLOR_RATE = 0;
export const GREEN_COLOR_RATE = 8;
export const BLUE_COLOR_RATE = 4;

//
// private
//

const getPixel = (data: Uint8ClampedArray, startingIndex: number): RGBAPixel => {
  const r = data[startingIndex];
  const g = data[startingIndex + 1];
  const b = data[startingIndex + 2];
  const a = data[startingIndex + 3];

  return [r, g, b, a];
};

//
// public
//

// mapPixles isn't written in a functional way due to performance issues (e.g. lack of proper tail call optimization)
export const mapPixles = (
  data: Uint8ClampedArray,
  callbackfn: (RGBAPixel: RGBAPixel) => RGBAPixel,
): Uint8ClampedArray => {
  const newData = new Uint8ClampedArray(data.length);

  for (let currentIndex = 0; currentIndex < data.length; currentIndex += PIXEL_LENGTH) {
    const currentPixel = getPixel(data, currentIndex);
    const [r, g, b, a] = callbackfn(currentPixel);

    /* eslint-disable immutable/no-mutation */
    newData[currentIndex] = r;
    newData[currentIndex + 1] = g;
    newData[currentIndex + 2] = b;
    newData[currentIndex + 3] = a;
    /* eslint-enable immutable/no-mutation */
  }

  return newData;
};

export const calculateFilterRate = (filterValue: number): number => 1 + filterValue / 100;
export const average = (values: number[]): number =>
  values.reduce((sum, currentValue) => sum + currentValue, 0) / values.length;

export const adjustValueToRange = ({
  value,
  max,
  min,
}: {
  value: number;
  max: number;
  min: number;
}): number => Math.max(min, Math.min(max, value));
