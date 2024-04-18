import { Unstable_Grid2 as Grid } from '@mui/material';
import { RefObject } from 'react';

import styles from './ImageDisplaySpace.module.scss';

interface Props {
  canvasRef: RefObject<HTMLCanvasElement>;
}

export const ImageDisplaySpace: React.FC<Props> = ({ canvasRef }) => (
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
