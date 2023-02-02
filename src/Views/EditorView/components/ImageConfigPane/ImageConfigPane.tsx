import { Unstable_Grid2 as Grid } from '@mui/material';
import { ChangeEventHandler } from 'react';

import { Controls } from '../Controls';

interface Props {
  supportedImageFileTypes: Readonly<ImageFileType[]>;
  loadImage: (image: ImageFile) => void;
  isSupportedImageFile: (file: File | ImageFile) => file is ImageFile;
}

export const ImageConfigPane: React.FC<Props> = ({
  loadImage,
  supportedImageFileTypes,
  isSupportedImageFile,
}) => {
  const onImageChange: ChangeEventHandler<HTMLInputElement> = e => {
    const image = e.target.files?.[0];
    if (image && isSupportedImageFile(image)) loadImage(image);
  };

  return (
    <Grid
      container
      sx={{
        justifyContent: 'center',
        alignItems: 'space-between',
        py: 4,
        px: 2,
        borderRight: '1px solid',
        borderColor: 'grey.300',
      }}
    >
      <Grid
        sx={{
          flex: 1,
        }}
      >
        Editor
      </Grid>
      <Controls
        supportedImageFileTypes={supportedImageFileTypes}
        onImageChange={onImageChange}
        // this is just a placeholder for now
        // eslint-disable-next-line no-console
        onFiltersReset={() => console.log('Reset filters')}
        // this is just a placeholder for now
        // eslint-disable-next-line no-console
        onSaveImage={() => console.log('Save image')}
      />
    </Grid>
  );
};
