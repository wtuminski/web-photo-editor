import { isHTMLCanvasElement, isString } from './typeGuards';

export function get2dContext(selector?: string): CanvasRenderingContext2D | null;
export function get2dContext(element: HTMLCanvasElement): CanvasRenderingContext2D | null;
export function get2dContext(
  selectorOrElement?: string | HTMLCanvasElement,
): CanvasRenderingContext2D | null {
  const selector = isString(selectorOrElement) ? selectorOrElement : 'canvas';
  const element = isHTMLCanvasElement(selectorOrElement)
    ? selectorOrElement
    : document.querySelector(selector);
  return (isHTMLCanvasElement(element) && element.getContext('2d')) || null;
}

const getImageURLAndCleanUp = (
  imageFile: ImageFile,
): [imageURL: string, cleanUp: CleanUpFunction] => {
  const imageURL = URL.createObjectURL(imageFile);
  return [imageURL, () => URL.revokeObjectURL(imageURL)];
};

const scheduleImageDrawing = (
  imageURL: string,
  drawImage: (image: HTMLImageElement) => void,
): CleanUpFunction => {
  const abortController = new AbortController();
  const image = new Image();

  image.addEventListener('load', () => drawImage(image), { signal: abortController.signal });
  image.setAttribute('src', imageURL); // TODO - should it be moved somewhere else? (it's a hack

  return () => abortController.abort();
};

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

const drawImageInContext = (context: CanvasRenderingContext2D, image: HTMLImageElement) => {
  const [newWidth, newHeight] = getNewCanvasDimensions(context, image);
  context.canvas.setAttribute('width', newWidth.toString());
  context.canvas.setAttribute('height', newHeight.toString());
  context.drawImage(image, 0, 0, newWidth, newHeight);
};

export const scheduleImageDrawingInCanvas = (
  canvasElement: HTMLCanvasElement,
  imageFile: ImageFile,
): CleanUpFunction | void => {
  const context = get2dContext(canvasElement);

  if (!context) return undefined;

  const [imageURL, URLCleanUp] = getImageURLAndCleanUp(imageFile);
  const drawCleanUp = scheduleImageDrawing(imageURL, drawImageInContext.bind(null, context));

  return () => {
    URLCleanUp();
    drawCleanUp();
  };
};
