type ImageFileType = 'image/jpeg' | 'image/png' | 'image/svg+xml';

interface ImageFile extends File {
  type: ImageFileType;
}
