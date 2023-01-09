import { Button, Unstable_Grid2 as Grid } from '@mui/material';
import { ChangeEventHandler, useMemo } from 'react';

interface Props {
  onImageChange: ChangeEventHandler<HTMLInputElement>;
  supportedImageFileTypes: Readonly<ImageFileType[]>;
}

export const Controls: React.FC<Props> = ({ onImageChange, supportedImageFileTypes }) => {
  const accept = useMemo(() => supportedImageFileTypes.join(', '), [supportedImageFileTypes]);
  return (
    <Grid
      container
      sx={{
        justifyContent: 'center',
        alignContent: 'flex-end',
        gap: 2,
      }}
    >
      <Button variant="outlined">Reset Filters</Button>
      <Button variant="outlined" component="label">
        Upload image
        <input hidden accept={accept} type="file" onChange={onImageChange} />
      </Button>
      <Button variant="outlined">Save image</Button>
    </Grid>
  );
};
