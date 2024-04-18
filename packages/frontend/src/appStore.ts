import { StoreonModule, StoreonStore } from 'storeon';

import { createObservable, Observable } from './Utils/observable';
import { FiltersVariant, ImageFiltersValues } from './Utils/types';

export const UpdateFiltersVariantEvent = Symbol('UpdateFiltersVariantEvent');
export const UpdateImageFiltersValuesEvent = Symbol('UpdateImageFiltersValuesEvent');
export const ResetImageFiltersValuesEvent = Symbol('ResetImageFiltersValuesEvent');

export interface AppState {
  filtersVariant: FiltersVariant;
  imageFiltersValues: ImageFiltersValues;
}

export interface AppEvents {
  [UpdateFiltersVariantEvent]: FiltersVariant;
  [UpdateImageFiltersValuesEvent]: Partial<ImageFiltersValues>;
  [ResetImageFiltersValuesEvent]: never;
}

export interface FiltersModule {
  store: StoreonStore<AppState, AppEvents>;
  filtersVariantObservable: Observable<FiltersVariant>;
  imageFiltersValuesObservable: Observable<ImageFiltersValues>;
}

const initialImageFiltersValues: ImageFiltersValues = {
  grayscale: 0,
  inversion: 0,
  hue: 0,
  saturation: 0,
  luminosity: 0,
};

export const filtersStoreonModule: StoreonModule<AppState, AppEvents> = store => {
  store.on('@init', () => ({
    filtersVariant: 'as',
    imageFiltersValues: initialImageFiltersValues,
  }));
  store.on(UpdateFiltersVariantEvent, (_, filtersVariant) => ({ filtersVariant }));
  store.on(UpdateImageFiltersValuesEvent, (state, imageFiltersValues) => ({
    imageFiltersValues: {
      ...state.imageFiltersValues,
      ...imageFiltersValues,
    },
  }));
  store.on(ResetImageFiltersValuesEvent, () => ({ imageFiltersValues: initialImageFiltersValues }));
};

export const initFiltersModule = (store: StoreonStore<AppState, AppEvents>): FiltersModule => {
  const filtersVariantObservable = createObservable<FiltersVariant>(store.get().filtersVariant);
  const imageFiltersValuesObservable = createObservable<ImageFiltersValues>(
    store.get().imageFiltersValues,
  );

  store.on('@changed', (_, stateChanges) => {
    if (stateChanges.filtersVariant) filtersVariantObservable.set(stateChanges.filtersVariant);
    if (stateChanges.imageFiltersValues)
      imageFiltersValuesObservable.set(stateChanges.imageFiltersValues);
  });

  return {
    store,
    filtersVariantObservable,
    imageFiltersValuesObservable,
  };
};
