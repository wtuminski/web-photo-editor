import { Unstable_Grid2 as Grid } from '@mui/material';
import { Reducer, useEffect, useReducer, useRef, useState } from 'react';

import { createImageDataProcessor } from '~/ImageDataProcessors/TSImageDataProcessor';
import { applyImageData, getImageData, scheduleImageDrawingInCanvas } from '~/Utils/canvas';
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
  const imageDataProcessorRef = useRef<ImageDataProcessor | null>(null);
  const canvas = canvasRef.current;

  const [imageFile, setImageFile] = useState<ImageFile | null>(null);
  const [imageFilters, dispatchFilterValueChange] = useReducer(filtersReducer, initialImageFilters);

  const setImageFilter = (filterType: ImageFilterType, filterValue: number) => {
    if (!canvas || !imageDataProcessorRef.current) return;
    const newImageData = imageDataProcessorRef.current[filterType](filterValue);
    applyImageData(canvas, newImageData);
    dispatchFilterValueChange({ filterType, filterValue });
  };

  const onImageChange = () => {
    if (!canvas || !imageFile) return undefined;
    const { cleanUp, done } = scheduleImageDrawingInCanvas(canvas, imageFile);
    done.then(() => {
      // eslint-disable-next-line immutable/no-mutation
      imageDataProcessorRef.current = createImageDataProcessor(getImageData(canvas));
      dispatchFilterValueChange('reset');
    });
    return cleanUp;
  };
  useEffect(onImageChange, [imageFile, canvas]);

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
      <ImageDisplaySpace canvasRef={canvasRef} />
    </Grid>
  );
};
