import { Unstable_Grid2 as Grid } from '@mui/material';
import { Reducer, useReducer, useRef, useState } from 'react';

import { supportedImageFileTypes } from '~/Utils/constants';
import { isSupportedImageFile } from '~/Utils/typeGuards';

import { ImageConfigPane } from './components/ImageConfigPane';
import { ImageDisplaySpace } from './components/ImageDisplaySpace';

interface FiltersReducerAction {
  filterType: ImageFilterType;
  filterValue: number;
}

const initialImageFilters: ImageFilters = {
  grayscale: 0,
  inversion: 0,
  hue: 0,
  saturation: 0,
  luminosity: 0,
};

const filtersReducer: Reducer<ImageFilters, FiltersReducerAction | 'reset'> = (filters, action) =>
  action === 'reset'
    ? { ...initialImageFilters }
    : { ...filters, [action.filterType]: action.filterValue };

export const EditorView: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageFile, setImageFile] = useState<ImageFile>();
  const [imageFilters, disptach] = useReducer(filtersReducer, initialImageFilters);

  const setImageFilter = (filterType: ImageFilterType, filterValue: number) =>
    disptach({ filterType, filterValue });

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
        imageFilters={imageFilters}
        setImageFilter={setImageFilter}
        supportedImageFileTypes={supportedImageFileTypes}
        isSupportedImageFile={isSupportedImageFile}
        loadImage={setImageFile}
      />
      <ImageDisplaySpace canvasRef={canvasRef} imageFile={imageFile} />
    </Grid>
  );
};
