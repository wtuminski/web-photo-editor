import {
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
import { ChangeEvent, useState } from 'react';

import { isChangeEvent } from '~/Utils/typeGuards';

interface Props {
  imageFilters: ImageFilters;
  setImageFilter: (filterType: ImageFilterType, filterValue: number) => void;
}

export const Filters: React.FC<Props> = ({ imageFilters, setImageFilter }) => {
  const [selectedFilter, setSelectedFilter] = useState<ImageFilterType>('grayscale');

  const selectedFilterValue = selectedFilter ? imageFilters[selectedFilter] : undefined;

  const onFilterTypeChange = (event: SelectChangeEvent) =>
    setSelectedFilter(event.target.value as ImageFilterType);

  function onFilterValueChange(event: Event, value: number | number[]): void;
  function onFilterValueChange(event: ChangeEvent<HTMLInputElement>): void;
  function onFilterValueChange(
    event: Event | ChangeEvent<HTMLInputElement>,
    value?: number | number[],
  ): void {
    if (typeof value === 'number') {
      return setImageFilter(selectedFilter, value);
    }
    if (isChangeEvent(event)) {
      return setImageFilter(selectedFilter, Number(event.target.value));
    }
    throw new Error('Incorrect event or value');
  }

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="filterSelector">Selected Filter</InputLabel>
        <Select
          labelId="filterSelector"
          label="Selected Filter"
          value={selectedFilter}
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
          gridTemplateColumns="1fr 4rem"
          alignItems="center"
          spacing={2}
        >
          <Grid>
            <Slider
              value={selectedFilterValue}
              onChange={onFilterValueChange}
              aria-labelledby="filterValueSetter"
            />
          </Grid>
          <Grid>
            <Input
              value={selectedFilterValue}
              size="small"
              onChange={onFilterValueChange}
              inputProps={{
                step: 1,
                min: 0,
                max: 100,
                type: 'number',
                'aria-labelledby': 'filterValueSetter',
              }}
            />
          </Grid>
        </Grid>
      </FormControl>
    </div>
  );
};
