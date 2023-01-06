import { AppBar, Toolbar, Typography } from '@mui/material';

export const Header: React.FC = () => (
  <AppBar position="sticky">
    <Toolbar>
      <Typography color="inherit" component="p" variant="h5">
        Web Photo Editor
      </Typography>
    </Toolbar>
  </AppBar>
);
