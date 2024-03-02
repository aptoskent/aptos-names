import {Stack, Typography} from "@mui/material";

type DomainCostProps = {
  domainName: string;
};

/*
3 characters - 20 APT
4 characters - 10 APT
5 characters - 5 APT
6+ characters - 1 APT
*/

function getDomainCost(domainName: string) {
  switch (domainName.length) {
    case 3:
      return 20;
    case 4:
      return 10;
    case 5:
      return 5;
    default:
      return 1;
  }
}

export default function DomainCost({domainName}: DomainCostProps) {
  return (
    <Stack justifyContent="center" pt={1}>
      <Typography variant="h5">{getDomainCost(domainName)} APT</Typography>
      <Typography variant="body1" sx={{opacity: "0.5"}}>
        Domain Cost
      </Typography>
    </Stack>
  );
}
