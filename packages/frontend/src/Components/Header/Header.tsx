import { AppBar, Grid2 as Grid, Toolbar, Typography, useColorScheme } from '@mui/material';
import { useCallback } from 'react';

import { ModeToggle } from './components/ModeToggle';

export const Header: React.FC = () => {
  const { mode, setMode } = useColorScheme();

  const toggleMode = useCallback(
    () => setMode(mode === 'light' ? 'dark' : 'light'),
    [mode, setMode],
  );

  return (
    <AppBar
      sx={{
        position: 'sticky',
        height: 'min-content',
        color: 'text.primary',
        backgroundColor: 'background.default',
        backgroundImage: 'none',
        borderBottom: '1px solid',
        borderColor: 'grey.300',
        boxShadow: 'none',
      }}
    >
      <Toolbar>
        <Grid
          container
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: 1,
          }}
        >
          <Typography color="inherit" component="p" variant="h5">
            Web Photo Editor
          </Typography>
          <ModeToggle mode={mode ?? 'system'} toggleMode={toggleMode} />
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
