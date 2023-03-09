import { Reducer, useEffect, useReducer, useRef, useState } from 'react';

import { applyImageData, getImageData, scheduleImageDrawingInCanvas } from '~/Utils/canvas';
import { createImageDataProcessor } from '~/Utils/imageDataProcessor';
import { Observable } from '~/Utils/observable';
import {
  CleanUpFunction,
  FiltersVariant,
  ImageDataProcessor,
  ImageFile,
  ImageFiltersValues,
  ImageFilterType,
} from '~/Utils/types';

import { useObservable } from './useObservable';

interface FiltersReducerAction {
  filterType: ImageFilterType;
  filterValue: number;
}

const initialImageFiltersValues: ImageFiltersValues = {
  grayscale: 0,
  inversion: 0,
  hue: 0,
  saturation: 0,
  luminosity: 0,
};

const filtersReducer: Reducer<ImageFiltersValues, FiltersReducerAction | 'resetFilters'> = (
  filters,
  action,
) =>
  action === 'resetFilters'
    ? { ...initialImageFiltersValues }
    : { ...filters, [action.filterType]: action.filterValue };

interface Props {
  canvas: HTMLCanvasElement | null;
  imageFile: ImageFile | null;
  filtersVariantObservable: Observable<FiltersVariant>;
}

interface UseEditImageHandlers {
  imageFiltersValues: ImageFiltersValues;
  setImageFilterValue: (filterValue: number) => void;
  selectedImageFilter: ImageFilterType;
  setSelectedImageFilter: (imageFilterType: ImageFilterType) => void;
  isImageFilterInProgress: boolean;
}

export const useEditImage = ({
  canvas,
  imageFile,
  filtersVariantObservable,
}: Props): UseEditImageHandlers => {
  const imageDataProcessor = useRef<ImageDataProcessor | null>(null);
  const [imageFiltersValues, dispatch] = useReducer(filtersReducer, initialImageFiltersValues);

  const [imageLoading, setImageLoading] = useState<'init' | 'loading' | 'ready'>('init');
  const [selectedImageFilter, setSelectedImageFilter] = useState<ImageFilterType>('grayscale');
  const [isImageFilterInProgress, setIsImageFilterInProgress] = useState<boolean>(false);
  const filtersVariant = useObservable(filtersVariantObservable);

  const currentFilterValue = imageFiltersValues[selectedImageFilter];

  const applyCurrentImageFilter = (): CleanUpFunction | void => {
    if (!canvas || !imageDataProcessor.current || imageLoading !== 'ready') return undefined;
    setIsImageFilterInProgress(true);

    const timeoutId = setTimeout(() => {
      const newImageData = imageDataProcessor.current![selectedImageFilter](currentFilterValue);
      applyImageData(canvas, newImageData);
      setIsImageFilterInProgress(false);
    }, 100);
    return () => clearTimeout(timeoutId);
  };

  const setImageFilterValue = (filterValue: number): void =>
    dispatch({ filterType: selectedImageFilter, filterValue });

  //
  // side effects
  //
  const onImageChange = (): CleanUpFunction | void => {
    if (!canvas || !imageFile) return undefined;
    setImageLoading('loading');
    dispatch('resetFilters');
    const { cleanUp, done } = scheduleImageDrawingInCanvas(canvas, imageFile);
    done.then(() => setImageLoading('ready'));
    return cleanUp;
  };

  const onImageLoaded = (): CleanUpFunction | void => {
    if (imageLoading !== 'ready') return undefined;
    // eslint-disable-next-line immutable/no-mutation
    imageDataProcessor.current = createImageDataProcessor(
      getImageData(canvas!), // at this point canvas must be defined
      filtersVariantObservable.get,
    );
    return applyCurrentImageFilter();
  };

  const onImageFilterUpdate = applyCurrentImageFilter;

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(onImageChange, [imageFile, canvas]);
  useEffect(onImageLoaded, [imageLoading]);
  useEffect(onImageFilterUpdate, [currentFilterValue, selectedImageFilter, filtersVariant]);
  /* eslint-enable react-hooks/exhaustive-deps */

  //
  // handlers
  //
  return {
    imageFiltersValues,
    setImageFilterValue,
    selectedImageFilter,
    setSelectedImageFilter,
    isImageFilterInProgress,
  };
};
