import { Unstable_Grid2 as Grid } from '@mui/material';
import { useEffect, useRef } from 'react';

import { scheduleImageDrawingInCanvas } from '~/Utils/canvas';

interface Props {
  imageFile?: ImageFile;
}

export const ImageDisplaySpace: React.FC<Props> = ({ imageFile }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!canvasRef.current || !imageFile) return undefined;
    return scheduleImageDrawingInCanvas(canvasRef.current, imageFile);
  }, [imageFile, canvasRef]);

  return (
    <Grid
      container
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'auto',
        p: 2,
      }}
    >
      <canvas ref={canvasRef} />
    </Grid>
  );
};
