import { StoreonModule, StoreonStore } from 'storeon';

import { createObservable, Observable } from './Utils/observable';
import { FiltersVariant } from './Utils/types';

export const FiltersVariantUpdateEvent = Symbol('FiltersVariantUpdateEvent');

export interface AppState {
  filtersVariant: FiltersVariant;
}

export interface AppEvents {
  [FiltersVariantUpdateEvent]: FiltersVariant;
}

export interface FiltersModule {
  store: StoreonStore<AppState, AppEvents>;
  filtersVariantObservable: Observable<FiltersVariant>;
}

export const filtersStoreonModule: StoreonModule<AppState, AppEvents> = store => {
  store.on('@init', () => ({ filtersVariant: 'as' }));
  store.on(FiltersVariantUpdateEvent, (_, filtersVariant) => ({ filtersVariant }));
};

export const initFiltersModule = (store: StoreonStore<AppState, AppEvents>): FiltersModule => {
  const filtersVariantObservable = createObservable<FiltersVariant>(store.get().filtersVariant);

  store.on(FiltersVariantUpdateEvent, (_, filtersVariant) => {
    filtersVariantObservable.set(filtersVariant);
  });

  return {
    store,
    filtersVariantObservable,
  };
};
