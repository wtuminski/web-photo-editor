type CleanUpFunction = VoidFunction;

type ImageFileType = 'image/jpeg' | 'image/png' | 'image/svg+xml';

interface ImageFile extends File {
  type: ImageFileType;
}

type ImageFilterType = 'brightness' | 'grayscale' | 'inversion' | 'saturation';

type ImageFilters = Record<ImageFilterType, number>;

type ImageDataProcessor = Record<ImageFilterType, (filterValue: number) => ImageData>;
