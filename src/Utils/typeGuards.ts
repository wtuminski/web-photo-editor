import { supportedImageFileTypes } from './constants';

export const isSupportedImageFile = (file: File | ImageFile): file is ImageFile =>
  supportedImageFileTypes.includes(file.type as ImageFileType);

export const isString = (value: unknown): value is string => typeof value === 'string';
