import { flow } from '@mobily/ts-belt';
import { Unstable_Grid2 as Grid } from '@mui/material';
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
    <Grid container justifyContent="center" alignItems="center" overflow="auto">
      <canvas ref={canvasRef}></canvas>
    </Grid>
  );
};
