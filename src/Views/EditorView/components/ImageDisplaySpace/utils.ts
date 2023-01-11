type CleanUpFunction = VoidFunction;

const getCanvasMaxDimensions = (
  context: CanvasRenderingContext2D,
): { maxWidth: number; maxHeight: number } => {
  const maxImageCoverage = 0.8;
  const { height: parentHeight, width: parentWidth } =
    context.canvas.parentElement!.getBoundingClientRect();

  return { maxHeight: parentHeight * maxImageCoverage, maxWidth: parentWidth * maxImageCoverage };
};

const getNewCanvasDimensions = (
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
): [width: number, height: number] => {
  const { maxWidth, maxHeight } = getCanvasMaxDimensions(context);
  const { naturalWidth: imageWidth, naturalHeight: imageHeight } = image;
  const ratio = imageWidth / imageHeight;

  // TODO - test this logic
  if (imageHeight > maxHeight) return [maxHeight * ratio, maxHeight];
  if (imageWidth > maxWidth) return [maxWidth, maxWidth / ratio];
  return [imageWidth, imageHeight];
};

export const drawImageInContext = (context: CanvasRenderingContext2D, image: HTMLImageElement) => {
  const [newWidth, newHeight] = getNewCanvasDimensions(context, image);
  context.canvas.setAttribute('width', `${newWidth}`);
  context.canvas.setAttribute('height', `${newHeight}`);
  context.drawImage(image, 0, 0, newWidth, newHeight);
};

export const scheduleImageDrawing = (
  imageURL: string,
  drawImage: (image: HTMLImageElement) => void,
): CleanUpFunction => {
  const abortController = new AbortController();
  const image = new Image();

  image.addEventListener('load', () => drawImage(image), { signal: abortController.signal });
  image.setAttribute('src', imageURL); // TODO - should it be moved somewhere else? (it's a hack

  return () => abortController.abort();
};

export const getImageURLAndCleanUp = (
  imageFile: ImageFile,
): [imageURL: string, cleanUp: CleanUpFunction] => {
  const imageURL = URL.createObjectURL(imageFile);
  return [imageURL, () => URL.revokeObjectURL(imageURL)];
};
