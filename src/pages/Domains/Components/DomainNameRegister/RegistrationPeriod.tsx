import {Box, IconButton, Stack, Typography} from "@mui/material";
import {AddCircleOutline as AddCircleOutlineIcon} from "@mui/icons-material";
import {RemoveCircleOutline as RemoveCircleOutlineIcon} from "@mui/icons-material";

type RegistrationPeriodProps = {
  years: number;
  onAddYearsClick: () => void;
  onReduceYearsClick: () => void;
};

export default function RegistrationPeriod({
  years,
  onReduceYearsClick,
  onAddYearsClick,
}: RegistrationPeriodProps): JSX.Element {
  const yearLabel = years === 1 ? "year" : "years";
  return (
    <Box>
      <Stack direction="row" alignItems="center">
        <IconButton
          color="primary"
          aria-label="reduce years"
          component="label"
          onClick={onReduceYearsClick}
          sx={{pl: "0px"}}
        >
          <RemoveCircleOutlineIcon />
        </IconButton>
        <Typography
          variant="h5"
          sx={{mx: 2}}
        >{`${years} ${yearLabel}`}</Typography>
        <IconButton
          color="primary"
          aria-label="add years"
          component="label"
          onClick={onAddYearsClick}
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </Stack>
      <Typography variant="body1" sx={{opacity: "0.5"}}>
        Registration Period
      </Typography>
    </Box>
  );
}
