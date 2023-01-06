import {
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
  Unstable_Grid2 as Grid,
  useMediaQuery,
} from '@mui/material';
import { useMemo } from 'react';

import { EditorView } from '~/Views/EditorView';

import { Header } from './Components/Header';

export const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      responsiveFontSizes(
        createTheme({
          palette: {
            mode: prefersDarkMode ? 'dark' : 'light',
          },
          typography: {
            fontFamily: 'Lato, sans-serif',
          },
        }),
      ),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Grid container alignSelf="stretch" flexDirection="column" flex={1}>
        <Header />
        <Grid display="flex" flexGrow={1} p={4}>
          <EditorView />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
