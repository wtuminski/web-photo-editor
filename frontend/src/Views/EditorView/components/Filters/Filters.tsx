import {
  Fade,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import { ImageFilters, ImageFilterType } from '@web-photo-editor/utils';
import { ChangeEvent } from 'react';

import { isChangeEvent } from '~/Utils/typeGuards';

import styles from './Filters.module.scss';

interface Props {
  imageFilters: ImageFilters;
  selectedImageFilter: ImageFilterType;
  setSelectedImageFilter: (imageFilterType: ImageFilterType) => void;
  setImageFilterValue: (filterValue: number) => void;
  isImageFilterInProgress: boolean;
}

const MIN_FILTER_VALUE = -100;
const MAX_FILTER_VALUE = 100;

export const Filters: React.FC<Props> = ({
  imageFilters,
  selectedImageFilter,
  setSelectedImageFilter,
  setImageFilterValue,
  isImageFilterInProgress,
}) => {
  const selectedFilterValue = selectedImageFilter ? imageFilters[selectedImageFilter] : undefined;

  const onFilterTypeChange = (event: SelectChangeEvent) =>
    setSelectedImageFilter(event.target.value as ImageFilterType);

  function onFilterValueChange(event: Event, value: number | number[]): void;
  function onFilterValueChange(event: ChangeEvent<HTMLInputElement>): void;
  function onFilterValueChange(
    event: Event | ChangeEvent<HTMLInputElement>,
    value?: number | number[],
  ): void {
    if (typeof value === 'number') {
      return setImageFilterValue(value);
    }
    if (isChangeEvent(event)) {
      return setImageFilterValue(Number(event.target.value));
    }
    throw new Error('Incorrect event or value');
  }

  return (
    <div className={styles.root}>
      <FormControl fullWidth>
        <InputLabel id="filterSelector">Selected Filter</InputLabel>
        <Select
          labelId="filterSelector"
          label="Selected Filter"
          value={selectedImageFilter}
          onChange={onFilterTypeChange}
        >
          {Object.keys(imageFilters).map(filterType => (
            <MenuItem value={filterType} key={filterType}>
              {filterType}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <Typography id="filterValueSetter" gutterBottom mt={2}>
          Filter value
        </Typography>
        <Grid
          container
          display="grid"
          gridTemplateColumns="1fr 5rem"
          alignItems="center"
          spacing={2}
        >
          <Grid>
            <Slider
              value={selectedFilterValue}
              onChange={onFilterValueChange}
              aria-labelledby="filterValueSetter"
              min={MIN_FILTER_VALUE}
              max={MAX_FILTER_VALUE}
              step={10}
              size="small"
              sx={{ ml: 0.8 }}
            />
          </Grid>
          <Grid>
            <Input
              value={selectedFilterValue}
              size="small"
              onChange={onFilterValueChange}
              inputProps={{
                step: 1,
                min: MIN_FILTER_VALUE,
                max: MAX_FILTER_VALUE,
                type: 'number',
                'aria-labelledby': 'filterValueSetter',
              }}
            />
          </Grid>
        </Grid>
      </FormControl>
      <Fade in={isImageFilterInProgress}>
        <Typography align="center" variant="subtitle2" color="warning.main">
          ...in progress
        </Typography>
      </Fade>
    </div>
  );
};
