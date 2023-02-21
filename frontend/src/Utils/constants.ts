import { ImageFileType } from './types';

export const supportedImageFileTypes = [
  'image/jpeg',
  'image/png',
  'image/svg+xml',
] as const satisfies Readonly<ImageFileType[]>;
