import { memoize } from './memoize';

const get2dContext = memoize((canvas: HTMLCanvasElement): CanvasRenderingContext2D => {
  const context = canvas.getContext('2d');
  if (context === null)
    throw new Error('Other type of context was already requested from provided canvas element');
  return context;
});

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

const drawImageInContext = (context: CanvasRenderingContext2D, image: HTMLImageElement) => {
  const { width, height } = image;
  context.canvas.setAttribute('width', width.toString());
  context.canvas.setAttribute('height', height.toString());
  context.drawImage(image, 0, 0, width, height);
};

//
// Public
//

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

export const getImageData = (canvas: HTMLCanvasElement): ImageData =>
  get2dContext(canvas).getImageData(0, 0, canvas.width, canvas.height);

export const applyImageData = (canvas: HTMLCanvasElement, imageData: ImageData) =>
  get2dContext(canvas).putImageData(imageData, 0, 0);
