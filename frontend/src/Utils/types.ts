export type ImageFileType = 'image/jpeg' | 'image/png' | 'image/svg+xml';

export interface ImageFile extends File {
  type: ImageFileType;
}
