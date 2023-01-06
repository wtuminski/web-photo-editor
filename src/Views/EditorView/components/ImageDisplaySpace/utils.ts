type CleanUpFunction = VoidFunction;

export const getImageURLAndCleanUp = (
  imageFile: ImageFile,
): [imageURL: string, cleanUp: CleanUpFunction] => {
  const imageURL = URL.createObjectURL(imageFile);
  return [imageURL, () => URL.revokeObjectURL(imageURL)];
};

export const drawImage = (context: CanvasRenderingContext2D, image: HTMLImageElement) => {
  context.canvas.width = image.naturalWidth;
  context.canvas.height = image.naturalHeight;
  context.drawImage(image, 0, 0);
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
