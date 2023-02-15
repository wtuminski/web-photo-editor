import { Reducer, useEffect, useReducer, useRef, useState } from 'react';

import { createImageDataProcessor } from '~/ImageDataProcessors/TSImageDataProcessor';
import { applyImageData, getImageData, scheduleImageDrawingInCanvas } from '~/Utils/canvas';

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

const filtersReducer: Reducer<ImageFilters, FiltersReducerAction | 'resetFilters'> = (
  filters,
  action,
) =>
  action === 'resetFilters'
    ? { ...initialImageFilters }
    : { ...filters, [action.filterType]: action.filterValue };

interface Props {
  canvas: HTMLCanvasElement | null;
  imageFile: ImageFile | null;
}

interface UseEditImageHandlers {
  imageFilters: ImageFilters;
  setImageFilterValue: (filterValue: number) => void;
  selectedImageFilter: ImageFilterType;
  setSelectedImageFilter: (imageFilterType: ImageFilterType) => void;
}

export const useEditImage = ({ canvas, imageFile }: Props): UseEditImageHandlers => {
  const imageDataProcessorRef = useRef<ImageDataProcessor | null>(null);
  const [imageFilters, dispatch] = useReducer(filtersReducer, initialImageFilters);

  const [imageLoading, setImageLoading] = useState<'init' | 'loading' | 'ready'>('init');
  const [selectedImageFilter, setSelectedImageFilter] = useState<ImageFilterType>('grayscale');

  const applyCurrentImageFilter = (filterValue?: number) => {
    if (!canvas || !imageDataProcessorRef.current) return;
    const currentFilterValue = filterValue ?? imageFilters[selectedImageFilter];
    const newImageData = imageDataProcessorRef.current[selectedImageFilter](currentFilterValue);
    applyImageData(canvas, newImageData);
  };

  const setImageFilterValue = (filterValue: number) => {
    applyCurrentImageFilter(filterValue);
    dispatch({ filterType: selectedImageFilter, filterValue });
  };

  //
  // side effects
  //
  const onImageChange = () => {
    if (!canvas || !imageFile) return undefined;
    const { cleanUp, done } = scheduleImageDrawingInCanvas(canvas, imageFile);
    setImageLoading('loading');
    done.then(() => setImageLoading('ready'));
    return cleanUp;
  };

  const onImageLoaded = () => {
    if (imageLoading !== 'ready') return;
    dispatch('resetFilters');
    // eslint-disable-next-line immutable/no-mutation
    imageDataProcessorRef.current = createImageDataProcessor(getImageData(canvas!)); // at this point canvas must be defined
    applyCurrentImageFilter();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(onImageChange, [imageFile, canvas]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(onImageLoaded, [imageLoading]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(applyCurrentImageFilter, [selectedImageFilter]);

  //
  // handlers
  //
  return {
    imageFilters,
    setImageFilterValue,
    selectedImageFilter,
    setSelectedImageFilter,
  };
};
