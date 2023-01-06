import { AppBar, Typography, Unstable_Grid2 as Grid } from '@mui/material';

import { EditorView } from '~/Views/EditorView';

export const App = () => (
  <Grid container alignSelf="stretch" flexDirection="column" flex={1}>
    <AppBar position="sticky">
      <Typography color="inherit" component="p" variant="h5" px={4} py={1.5}>
        Web Photo Editor
      </Typography>
    </AppBar>
    <Grid display="flex" flexGrow={1} p={4}>
      <EditorView />
    </Grid>
  </Grid>
);
