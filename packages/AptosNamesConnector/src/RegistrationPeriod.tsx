import {Box, IconButton, Stack, Typography} from "@mui/material";

export default function RegistrationPeriod(): JSX.Element {
  return (
    <Stack justifyContent="center">
      <Typography variant="h6">1 year</Typography>
      <Typography fontSize="0.75rem" sx={{opacity: "0.5"}}>
        Registration Period
      </Typography>
    </Stack>
  );
}
