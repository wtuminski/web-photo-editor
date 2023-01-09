import { DarkMode, LightMode } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Mode } from '@mui/system/cssVars/useCurrentColorScheme';

interface Props {
  mode: Mode;
  toggleMode: () => void;
}

export const ModeToggle: React.FC<Props> = ({ mode, toggleMode }) => (
  <IconButton sx={{ ml: 1 }} onClick={toggleMode} color="inherit">
    {mode === 'dark' ? <DarkMode /> : <LightMode />}
  </IconButton>
);
