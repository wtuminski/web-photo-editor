import {
  CssBaseline,
  Experimental_CssVarsProvider as CSSVarsProvider,
  experimental_extendTheme as extendTheme,
  responsiveFontSizes,
  Unstable_Grid2 as Grid,
  useMediaQuery,
} from '@mui/material';
import React, { useMemo } from 'react';

import { EditorView } from '~/Views/EditorView';

import { Header } from './Components/Header';

type ExtendedTheme = ReturnType<typeof extendTheme>;

export const App: React.FC = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(
    () =>
      responsiveFontSizes(
        extendTheme({
          typography: {
            fontFamily: 'Lato, sans-serif',
          },
        }),
      ) as ExtendedTheme,
    [],
  );

  return (
    <CSSVarsProvider theme={theme} defaultMode={prefersDarkMode ? 'dark' : 'light'}>
      <CssBaseline enableColorScheme />
      <Grid container alignSelf="stretch" flexDirection="column" flex={1}>
        <Header />
        <Grid display="flex" flexGrow={1} p={4}>
          <EditorView />
        </Grid>
      </Grid>
    </CSSVarsProvider>
  );
};
