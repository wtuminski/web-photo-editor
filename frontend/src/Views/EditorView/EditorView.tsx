import { Unstable_Grid2 as Grid } from '@mui/material';
import { useRef, useState } from 'react';

import { useEditImage } from '~/Hooks';
import { supportedImageFileTypes } from '~/Utils/constants';
import { Observable } from '~/Utils/observable';
import { isSupportedImageFile } from '~/Utils/typeGuards';
import { FiltersVariant, ImageFile, ImageFiltersValues } from '~/Utils/types';

import { ImageConfigPane } from './components/ImageConfigPane';
import { ImageDisplaySpace } from './components/ImageDisplaySpace';

interface Props {
  filtersVariantObservable: Observable<FiltersVariant>;
  imageFiltersValuesObservable: Observable<ImageFiltersValues>;
  updateImageFilters: Parameters<typeof useEditImage>['0']['updateImageFilters'];
}

export const EditorView: React.FC<Props> = ({
  filtersVariantObservable,
  imageFiltersValuesObservable,
  updateImageFilters,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageFile, setImageFile] = useState<ImageFile | null>(null);

  const {
    imageFiltersValues,
    setImageFilterValue,
    selectedImageFilter,
    setSelectedImageFilter,
    isImageFilterInProgress,
  } = useEditImage({
    canvas: canvasRef.current,
    imageFile,
    filtersVariantObservable,
    imageFiltersValuesObservable,
    updateImageFilters,
  });

  return (
    <Grid
      display="grid"
      flex={1}
      gridTemplateColumns="1fr 4fr"
      sx={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 4fr',
        minWidth: 0,
        minHeight: 0,
      }}
    >
      <ImageConfigPane
        imageFiltersValues={imageFiltersValues}
        setImageFilterValue={setImageFilterValue}
        selectedImageFilter={selectedImageFilter}
        setSelectedImageFilter={setSelectedImageFilter}
        supportedImageFileTypes={supportedImageFileTypes}
        isSupportedImageFile={isSupportedImageFile}
        loadImage={setImageFile}
        isImageFilterInProgress={isImageFilterInProgress}
      />
      <ImageDisplaySpace canvasRef={canvasRef} />
    </Grid>
  );
};
