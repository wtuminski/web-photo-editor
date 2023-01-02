import { Unstable_Grid2 as Grid } from '@mui/material';

import { EditorView } from '~/Views/EditorView';

export const App = () => (
  <Grid container alignSelf="stretch" flexDirection="column" flex={1} m={2} p={2}>
    <h1>Web Photo Editor</h1>
    <EditorView />
  </Grid>
);
