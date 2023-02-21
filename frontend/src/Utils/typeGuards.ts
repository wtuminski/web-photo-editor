import { ChangeEvent } from 'react';

import { supportedImageFileTypes } from './constants';
import { ImageFile, ImageFileType } from './types';

// TODO - check what can be deleted

export const isSupportedImageFile = (file: File | ImageFile): file is ImageFile =>
  supportedImageFileTypes.includes(file.type as ImageFileType);

export const isString = (value: unknown): value is string => typeof value === 'string';

export const isChangeEvent = (event: { type: string }): event is ChangeEvent =>
  event.type === 'change';

export const isHTMLCanvasElement = (element: unknown): element is HTMLCanvasElement =>
  element instanceof HTMLCanvasElement;
