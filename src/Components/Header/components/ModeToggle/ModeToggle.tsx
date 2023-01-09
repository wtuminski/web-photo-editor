import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { IconButton } from '@mui/material';
import { Mode } from '@mui/system/cssVars/useCurrentColorScheme';

interface Props {
  mode: Mode;
  toggleMode: () => void;
}

export const ModeToggle: React.FC<Props> = ({ mode, toggleMode }) => (
  <IconButton sx={{ ml: 1 }} onClick={toggleMode} color="inherit">
    {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
  </IconButton>
);
