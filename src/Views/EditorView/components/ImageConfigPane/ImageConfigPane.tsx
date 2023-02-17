import { Unstable_Grid2 as Grid } from '@mui/material';
import { ChangeEventHandler } from 'react';

import { Controls } from '../Controls';
import { Filters } from '../Filters';

interface Props {
  imageFilters: ImageFilters;
  selectedImageFilter: ImageFilterType;
  setSelectedImageFilter: (imageFilterType: ImageFilterType) => void;
  setImageFilterValue: (filterValue: number) => void;
  supportedImageFileTypes: Readonly<ImageFileType[]>;
  isSupportedImageFile: (file: File | ImageFile) => file is ImageFile;
  loadImage: (image: ImageFile) => void;
  isImageFilterInProgress: boolean;
}

export const ImageConfigPane: React.FC<Props> = ({
  imageFilters,
  selectedImageFilter,
  setSelectedImageFilter,
  setImageFilterValue,
  supportedImageFileTypes,
  isSupportedImageFile,
  loadImage,
  isImageFilterInProgress,
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
      <Filters
        imageFilters={imageFilters}
        selectedImageFilter={selectedImageFilter}
        setSelectedImageFilter={setSelectedImageFilter}
        setImageFilterValue={setImageFilterValue}
        isImageFilterInProgress={isImageFilterInProgress}
      />
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
