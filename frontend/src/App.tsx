import {
  CssBaseline,
  Experimental_CssVarsProvider as CSSVarsProvider,
  experimental_extendTheme as extendTheme,
  responsiveFontSizes,
  Unstable_Grid2 as Grid,
  useMediaQuery,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useMemo } from 'react';
import { createStoreon } from 'storeon';
import { StoreContext } from 'storeon/react';

import { EditorView } from '~/Views/EditorView';

import { AppEvents, AppState, filtersStoreonModule, initFiltersModule } from './appStore';
import { Header } from './Components/Header';

type ExtendedTheme = ReturnType<typeof extendTheme>;

const store = createStoreon<AppState, AppEvents>([filtersStoreonModule]);
const filtersModule = initFiltersModule(store);

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
          <EditorView filtersVariantObservable={filtersModule.filtersVariantObservable} />
        </StoreContext.Provider>
      </Grid>
    </CSSVarsProvider>
  );
};
