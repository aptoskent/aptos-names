import {useEffect, useState} from "react";
import {Box, Link, Stack, Typography} from "@mui/material";
import {explorerURL} from "../../../../utils/constant";
import ClearButton from "./ClearButton";

type TargetAddressProps = {
  domainName: string;
  targetAddressAccountConnected: boolean;
  targetAddress: string | undefined;
};

export default function TargetAddress({
  targetAddress,
  domainName,
  targetAddressAccountConnected,
}: TargetAddressProps) {
  const [address, setAddress] = useState<string | undefined>(undefined);

  useEffect(() => {
    setAddress(targetAddress);
  }, [targetAddress]);

  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="column" spacing={2}>
          <Typography noWrap variant="h6" fontWeight="bold">
            Target Address
          </Typography>
          <Box>
            <Link
              href={`${explorerURL}/account/${address}`}
              color="primary"
              target="_blank"
            >
              <Typography variant="h6">{address}</Typography>
            </Link>
          </Box>
        </Stack>
        {address && (
          <ClearButton
            domainName={domainName}
            disable={targetAddressAccountConnected}
            callback={setAddress}
          />
        )}
      </Stack>
    </Box>
  );
}
