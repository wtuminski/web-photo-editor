import { Unstable_Grid2 as Grid } from '@mui/material';
import { ChangeEventHandler } from 'react';
import { useStoreon } from 'storeon/react';

import { AppEvents, AppState, UpdateFiltersVariantEvent } from '~/appStore';
import { ImageFile, ImageFileType, ImageFiltersValues, ImageFilterType } from '~/Utils/types';

import { Controls } from '../Controls';
import { Filters } from '../Filters';

interface Props {
  imageFiltersValues: ImageFiltersValues;
  selectedImageFilter: ImageFilterType;
  setSelectedImageFilter: (imageFilterType: ImageFilterType) => void;
  setImageFilterValue: (filterValue: number) => void;
  supportedImageFileTypes: Readonly<ImageFileType[]>;
  isSupportedImageFile: (file: File | ImageFile) => file is ImageFile;
  loadImage: (image: ImageFile) => void;
  isImageFilterInProgress: boolean;
}

export const ImageConfigPane: React.FC<Props> = ({
  imageFiltersValues,
  selectedImageFilter,
  setSelectedImageFilter,
  setImageFilterValue,
  supportedImageFileTypes,
  isSupportedImageFile,
  loadImage,
  isImageFilterInProgress,
}) => {
  const { filtersVariant, dispatch } = useStoreon<AppState, AppEvents>('filtersVariant');

  const onImageChange: ChangeEventHandler<HTMLInputElement> = e => {
    const image = e.target.files?.[0];
    if (image && isSupportedImageFile(image)) loadImage(image);
  };

  return (
    <Grid
      container
      sx={{
        flexDirection: 'column',
        py: 4,
        px: 2,
        borderRight: '1px solid',
        borderColor: 'grey.300',
      }}
    >
      <Filters
        imageFiltersValues={imageFiltersValues}
        selectedImageFilter={selectedImageFilter}
        setSelectedImageFilter={setSelectedImageFilter}
        setImageFilterValue={setImageFilterValue}
        isImageFilterInProgress={isImageFilterInProgress}
      />
      <Controls
        supportedImageFileTypes={supportedImageFileTypes}
        onImageChange={onImageChange}
        filtersVariant={filtersVariant}
        setFiltersVariant={variant => dispatch(UpdateFiltersVariantEvent, variant)}
      />
    </Grid>
  );
};
