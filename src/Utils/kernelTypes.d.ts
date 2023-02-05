type CleanUpFunction = VoidFunction;

type ImageFileType = 'image/jpeg' | 'image/png' | 'image/svg+xml';

interface ImageFile extends File {
  type: ImageFileType;
}

type ImageFilterType = 'brightness' | 'saturation' | 'greyscale' | 'inversion';

type ImageFilters = Record<ImageFilterType, number>;
