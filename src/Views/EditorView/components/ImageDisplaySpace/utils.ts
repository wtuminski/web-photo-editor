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
  return imageHeight > maxHeight
    ? [maxHeight * ratio, maxHeight]
    : imageWidth > maxWidth
    ? [maxWidth, maxWidth / ratio]
    : [imageWidth, imageHeight];
};

export const drawImage = (context: CanvasRenderingContext2D, image: HTMLImageElement) => {
  const [newWidth, newHeight] = getNewCanvasDimensions(context, image);
  context.canvas.width = newWidth;
  context.canvas.height = newHeight;
  context.drawImage(image, 0, 0, newWidth, newHeight);
};

export const scheduleImageDrawing = (
  imageURL: string,
  drawImage: (image: HTMLImageElement) => void,
) => {
  const image = new Image();
  const onLoad = () => drawImage(image);
  image.addEventListener('load', onLoad);
  image.src = imageURL; // TODO - should it be moved somewhere else?

  return () => image.removeEventListener('load', onLoad);
};

export const getImageURLAndCleanUp = (
  imageFile: ImageFile,
): [imageURL: string, cleanUp: CleanUpFunction] => {
  const imageURL = URL.createObjectURL(imageFile);
  return [imageURL, () => URL.revokeObjectURL(imageURL)];
};
