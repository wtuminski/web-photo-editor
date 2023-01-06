import { flow } from '@mobily/ts-belt';
import { useEffect, useRef } from 'react';

import { get2dContext } from '~/Utils/canvas';

import { drawImage, getImageURLAndCleanUp, scheduleImageDrawing } from './utils';

interface Props {
  imageFile?: ImageFile;
}

export const ImageDisplaySpace: React.FC<Props> = ({ imageFile }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !imageFile) return;

    const context = get2dContext(canvasRef.current);

    if (!context) return;

    const [imageURL, URLCleanUp] = getImageURLAndCleanUp(imageFile);
    const drawCleanUp = scheduleImageDrawing(imageURL, drawImage.bind(null, context));

    return flow(URLCleanUp, drawCleanUp);
  }, [imageFile, canvasRef]);

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};
