export type ImageFileType = 'image/jpeg' | 'image/png' | 'image/svg+xml';

export interface ImageFile extends File {
  type: ImageFileType;
}

export type ImageFilterType = 'grayscale' | 'inversion' | 'saturation' | 'luminosity' | 'hue';

export type ImageFiltersValues = Record<ImageFilterType, number>;

export type FiltersVariant = 'ts' | 'as' | 'asSIMD';

export type ImageDataProcessor = Record<ImageFilterType, (filterValue: number) => ImageData>;

export type CleanUpFunction = VoidFunction;
