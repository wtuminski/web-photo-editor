import { Button, Unstable_Grid2 as Grid } from '@mui/material';
import { ChangeEventHandler, useMemo } from 'react';

import { ImageFileType } from '~/Utils/types';

interface Props {
  supportedImageFileTypes: Readonly<ImageFileType[]>;
  onImageChange: ChangeEventHandler<HTMLInputElement>;
  onFiltersReset: () => void;
  onSaveImage: () => void;
}

export const Controls: React.FC<Props> = ({
  supportedImageFileTypes,
  onImageChange,
  onFiltersReset,
  onSaveImage,
}) => {
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
      <Button variant="outlined" onClick={onFiltersReset}>
        Reset Filters
      </Button>
      <Button variant="outlined" component="label">
        Upload image
        <input hidden accept={accept} type="file" onChange={onImageChange} />
      </Button>
      <Button variant="outlined" onClick={onSaveImage}>
        Save image
      </Button>
    </Grid>
  );
};
