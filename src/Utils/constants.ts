export const supportedImageFileTypes = [
  'image/jpeg',
  'image/png',
  'image/svg+xml',
] as const satisfies Readonly<ImageFileType[]>;

export const MAX_RGB_VALUE = 255;
export const MIN_RGB_VALUE = 0;
