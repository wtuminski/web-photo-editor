export type CleanUpFunction = VoidFunction;

export type ImageFilterType = 'grayscale' | 'inversion' | 'saturation' | 'luminosity' | 'hue';

export type ImageFilters = Record<ImageFilterType, number>;

export type ImageDataProcessor = Record<ImageFilterType, (filterValue: number) => ImageData>;

export type RGBAPixel = [red: number, green: number, blue: number, alpha: number];

export type HSLAPixel = [hue: number, saturation: number, luminosity: number, alpha: number];
