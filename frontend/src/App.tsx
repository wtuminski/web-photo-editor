import {
  CssBaseline,
  Experimental_CssVarsProvider as CSSVarsProvider,
  experimental_extendTheme as extendTheme,
  responsiveFontSizes,
  Unstable_Grid2 as Grid,
  useMediaQuery,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { ComponentProps, useMemo } from 'react';
import { createStoreon } from 'storeon';
import { StoreContext } from 'storeon/react';

import { EditorView } from '~/Views/EditorView';

import {
  AppEvents,
  AppState,
  filtersStoreonModule,
  initFiltersModule,
  ResetImageFiltersValuesEvent,
  UpdateImageFiltersValuesEvent,
} from './appStore';
import { Header } from './Components/Header';
import { prepareImageFiltersPerformanceMeasurer } from './Utils/performanceUtils';

type ExtendedTheme = ReturnType<typeof extendTheme>;

const store = createStoreon<AppState, AppEvents>([filtersStoreonModule]);
const filtersModule = initFiltersModule(store);

type UpdateImageFilters = ComponentProps<typeof EditorView>['updateImageFilters'];
const updateImageFilters: UpdateImageFilters = (
  flagOrImageFiltersValues,
): ReturnType<UpdateImageFilters> =>
  flagOrImageFiltersValues === 'resetFiltersValues'
    ? store.dispatch(ResetImageFiltersValuesEvent)
    : store.dispatch(UpdateImageFiltersValuesEvent, flagOrImageFiltersValues);

prepareImageFiltersPerformanceMeasurer(updateImageFilters);

export const App: React.FC = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(
    () =>
      responsiveFontSizes(
        extendTheme({
          typography: {
            fontFamily: 'Lato, sans-serif',
          },
          colorSchemes: {
            dark: {
              palette: {
                background: {
                  default: grey[900],
                },
              },
            },
          },
        }),
      ) as ExtendedTheme,
    [],
  );

  return (
    <CSSVarsProvider theme={theme} defaultMode={prefersDarkMode ? 'dark' : 'light'}>
      <CssBaseline enableColorScheme />
      <Grid
        container
        sx={{
          width: '100vw',
          height: '100vh',
          flexDirection: 'column',
          flexWrap: 'nowrap',
        }}
      >
        <StoreContext.Provider value={filtersModule.store}>
          <Header />
          <EditorView
            filtersVariantObservable={filtersModule.filtersVariantObservable}
            imageFiltersValuesObservable={filtersModule.imageFiltersValuesObservable}
            updateImageFilters={updateImageFilters}
          />
        </StoreContext.Provider>
      </Grid>
    </CSSVarsProvider>
  );
};
