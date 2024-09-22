import {
  createTheme,
  CssBaseline,
  Grid2 as Grid,
  responsiveFontSizes,
  ThemeProvider,
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
  const theme = useMemo(
    () =>
      responsiveFontSizes(
        createTheme({
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
      ),
    [],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme>
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
      </CssBaseline>
    </ThemeProvider>
  );
};
