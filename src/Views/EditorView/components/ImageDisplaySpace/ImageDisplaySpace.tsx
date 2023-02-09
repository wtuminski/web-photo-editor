import { Unstable_Grid2 as Grid } from '@mui/material';
import { RefObject, useEffect } from 'react';

import { scheduleImageDrawingInCanvas } from '~/Utils/canvas';

import styles from './ImageDisplaySpace.module.scss';

interface Props {
  canvasRef: RefObject<HTMLCanvasElement>;
  imageFile?: ImageFile;
}

export const ImageDisplaySpace: React.FC<Props> = ({ canvasRef, imageFile }) => {
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
      <canvas ref={canvasRef} className={styles.canvas} />
    </Grid>
  );
};
