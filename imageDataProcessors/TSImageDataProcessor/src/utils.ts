//
// types

import type { RGBAPixel } from '@web-photo-editor/utils';

//
type RawMethod = (imageData: ImageData, filterValue: number) => ImageData;
type BoundMethod = (filterValue: number) => ReturnType<RawMethod>;
type ImageFilter = (pixels: Uint8ClampedArray, filterValue: number) => Uint8ClampedArray;

//
// constants
//
const PIXEL_LENGTH = 4;

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

export const copyImageData = (imageData: ImageData, replacements?: Partial<ImageData>): ImageData =>
  new ImageData(
    replacements?.data ?? imageData.data,
    replacements?.width ?? imageData.width,
    replacements?.height ?? imageData.height,
    { colorSpace: replacements?.colorSpace ?? imageData.colorSpace },
  );

export const bindMethodsWithImageData = <Key extends string>(
  module: Record<Key, RawMethod>,
  imageData: ImageData,
): Record<Key, BoundMethod> =>
  Object.fromEntries(
    Object.entries<RawMethod>(module).map(
      ([key, method]) => [key, method.bind(null, imageData)] as const,
    ),
  ) as Record<Key, BoundMethod>;

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

export const withApplyFilterOnImageDataCopy =
  (imageFilter: ImageFilter) =>
  (imageData: ImageData, filterValue: number): ImageData =>
    copyImageData(imageData, { data: imageFilter(imageData.data, filterValue) });

export type { ImageFilter };
