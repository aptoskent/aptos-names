import {Box, Link, Stack, Typography} from "@mui/material";
import {explorerURL} from "../../../../utils/constant";

type OwnerAddressProps = {
  ownerAddress: string;
};

export default function OwnerAddress({ownerAddress}: OwnerAddressProps) {
  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="column" spacing={2}>
          <Typography noWrap variant="h6" fontWeight="bold">
            Owner Address
          </Typography>
          <Box>
            <Link
              href={`${explorerURL}/account/${ownerAddress}`}
              color="primary"
              target="_blank"
            >
              <Typography variant="h6">{ownerAddress}</Typography>
            </Link>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}
