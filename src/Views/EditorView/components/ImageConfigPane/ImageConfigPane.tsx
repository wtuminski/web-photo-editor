import { Button, Unstable_Grid2 as Grid } from '@mui/material';
import { ChangeEventHandler, useMemo } from 'react';

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
  const accept = useMemo(() => supportedImageFileTypes.join(', '), [supportedImageFileTypes]);
  const onImageChange: ChangeEventHandler<HTMLInputElement> = e => {
    const image = e.target.files?.[0];
    if (image && isSupportedImageFile(image)) loadImage(image);
  };

  return (
    <Grid container alignItems="flex-start">
      <Button variant="contained" component="label">
        Upload
        <input hidden accept={accept} type="file" onChange={onImageChange} />
      </Button>
    </Grid>
  );
};
