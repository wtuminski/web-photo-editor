import * as asPixelsProcessor from '@web-photo-editor/as-pixels-processor';
import { PixelsProcessors, SIMDPixelsProcessors } from '@web-photo-editor/rust-pixels-processor';
import * as tsFilters from '@web-photo-editor/ts-pixels-processor';
import { match, P } from 'ts-pattern';
import { simd } from 'wasm-feature-detect';

import { FiltersVariant, ImageDataProcessor, ImageFilterType } from './types';

//
// types
//

type RawMethod = (imageData: ImageData, filterValue: number) => ImageData;
type BoundMethod = (filterValue: number) => ReturnType<RawMethod>;
type ImageFilter = (pixels: Uint8ClampedArray, filterValue: number) => Uint8ClampedArray;

//
// AS utils
//

const bytesPerPage = 64 * 1024;
const operationMemorySizeRatio = 2;
const isSimdSupported = await simd();

const prepareMemoryBinding = (numberOfBytes: number): Uint8ClampedArray => {
  const { memory } = asPixelsProcessor;
  const expectedMemorySize = Math.ceil(numberOfBytes / bytesPerPage) * operationMemorySizeRatio;
  if (memory.buffer.byteLength < numberOfBytes * operationMemorySizeRatio)
    memory.grow(expectedMemorySize);

  return new Uint8ClampedArray(memory.buffer);
};

const getASImageFilter =
  (filterType: ImageFilterType, filtersVariant: FiltersVariant): ImageFilter =>
  (pixels, filterValue) => {
    const numberOfRgbaPixels = pixels.length;
    const memoryBinding = prepareMemoryBinding(numberOfRgbaPixels);

    memoryBinding.set(pixels);
    if (filtersVariant === 'as') {
      asPixelsProcessor[filterType](numberOfRgbaPixels, filterValue);
    }
    if (filtersVariant === 'asSIMD') {
      const simdSuffix = isSimdSupported ? 'SIMD' : '';
      asPixelsProcessor[`${filterType}${simdSuffix}`](numberOfRgbaPixels, filterValue);
    }

    return memoryBinding.subarray(
      numberOfRgbaPixels,
      numberOfRgbaPixels * operationMemorySizeRatio,
    );
  };

const getRustImageFilter =
  (filterType: ImageFilterType, filtersVariant: FiltersVariant): ImageFilter =>
  (pixels, filterValue) => {
    const simdPixelsProcessors = isSimdSupported ? SIMDPixelsProcessors : PixelsProcessors;
    const newPixels = match(filtersVariant)
      .with('rust', () => PixelsProcessors[filterType](pixels, filterValue))
      .with('rustSIMD', () => simdPixelsProcessors[filterType](pixels, filterValue))
      .otherwise(() => {
        throw new Error('Rust filters are not implemented yet');
      });
    return newPixels;
  };

//
// module utils
//

const copyImageData = (imageData: ImageData, replacements?: Partial<ImageData>): ImageData =>
  new ImageData(
    replacements?.data ?? imageData.data,
    replacements?.width ?? imageData.width,
    replacements?.height ?? imageData.height,
    { colorSpace: replacements?.colorSpace ?? imageData.colorSpace },
  );

const bindMethodsWithImageData = <Key extends string>(
  module: Record<Key, RawMethod>,
  imageData: ImageData,
): Record<Key, BoundMethod> =>
  Object.fromEntries(
    Object.entries<RawMethod>(module).map(
      ([key, method]) => [key, method.bind(null, imageData)] as const,
    ),
  ) as Record<Key, BoundMethod>;

const withApplyFilterOnImageDataCopy =
  (imageFilter: ImageFilter) =>
  (imageData: ImageData, filterValue: number): ImageData =>
    copyImageData(imageData, { data: imageFilter(imageData.data, filterValue) });

//
// ImageDataProcessor factory
//

export const createImageDataProcessor = (
  imageData: ImageData,
  getFiltersVariant: () => FiltersVariant,
): ImageDataProcessor => {
  const withFilterVersions =
    (filterType: ImageFilterType): ImageFilter =>
    (pixles, filterValue) => {
      const filtersVariant = getFiltersVariant();
      const imageFilter: ImageFilter = match(filtersVariant)
        .with('ts', () => tsFilters[filterType])
        .with(P.union('as', 'asSIMD'), () => getASImageFilter(filterType, filtersVariant))
        .with(P.union('rust', 'rustSIMD'), () => getRustImageFilter(filterType, filtersVariant))
        .exhaustive();
      return imageFilter(pixles, filterValue);
    };

  return {
    ...bindMethodsWithImageData<ImageFilterType>(
      {
        grayscale: withApplyFilterOnImageDataCopy(withFilterVersions('grayscale')),
        inversion: withApplyFilterOnImageDataCopy(withFilterVersions('inversion')),
        hue: withApplyFilterOnImageDataCopy(withFilterVersions('hue')),
        saturation: withApplyFilterOnImageDataCopy(withFilterVersions('saturation')),
        luminosity: withApplyFilterOnImageDataCopy(withFilterVersions('luminosity')),
      },
      imageData,
    ),
  };
};
