import {
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import { ChangeEventHandler, useMemo } from 'react';

import { FiltersVariant, ImageFileType } from '~/Utils/types';

interface Props {
  supportedImageFileTypes: Readonly<ImageFileType[]>;
  onImageChange: ChangeEventHandler<HTMLInputElement>;
  filtersVariant: FiltersVariant;
  setFiltersVariant: (fv: FiltersVariant) => void;
}

export const Controls: React.FC<Props> = ({
  supportedImageFileTypes,
  onImageChange,
  filtersVariant,
  setFiltersVariant,
}) => {
  const accept = useMemo(() => supportedImageFileTypes.join(', '), [supportedImageFileTypes]);
  return (
    <Grid
      container
      sx={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 2,
      }}
    >
      <Typography>Select filters variant</Typography>
      <ToggleButtonGroup
        value={filtersVariant}
        exclusive
        onChange={(_, variant) => variant && setFiltersVariant(variant)}
        aria-label="select filters variant"
        sx={{ mb: 2 }}
      >
        <ToggleButton value={'as' satisfies FiltersVariant}>
          <img src="as-logo-32x32.png" alt="AssemblyScript" width={32} height={32} />
        </ToggleButton>
        <ToggleButton value={'asSIMD' satisfies FiltersVariant}>
          <img src="as-simd-logo-32x32.png" alt="AssemblyScript with SIMD" width={32} height={32} />
        </ToggleButton>
        <ToggleButton value={'ts' satisfies FiltersVariant}>
          <img src="ts-logo-32x32.png" alt="TypeScript" width={32} height={32} />
        </ToggleButton>
      </ToggleButtonGroup>
      <Button variant="outlined" component="label">
        Upload image
        <input hidden accept={accept} type="file" onChange={onImageChange} />
      </Button>
    </Grid>
  );
};
