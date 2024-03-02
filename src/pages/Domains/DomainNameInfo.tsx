import {useWallet} from "@aptos-labs/wallet-adapter-react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import DomainName from "../../components/DomainName";
import SearchInput from "../../components/SearchInput";
import {parseTimestampNoMillisecond} from "../../utils";
import TargetAddress from "./Components/DomainNameInfo/TargetAddress";
import {useDocumentTitle} from "../../hooks/setDocumentTitle";
import OwnerAddress from "./Components/DomainNameInfo/OwnerAddress";

type DomainDetails = {
  all_token_ownerships: {
    owner_address: string;
  };
  expiration_timestamp: string;
  registered_address: string;
  domain: string;
};

type DomainNameInfoProps = {
  domain: DomainDetails;
};

export default function DomainNameInfo({
  domain,
}: DomainNameInfoProps): JSX.Element {
  const [documentTitle, setDocumentTitle] = useDocumentTitle(
    `${domain.domain}.apt - Aptos Names`,
  );
  const {account} = useWallet();

  const targetAddressAccountConnected =
    account?.address === domain.registered_address;

  return (
    <Container>
      <Box sx={{mt: "5rem"}}>
        <SearchInput />
        <Card sx={{mt: "5rem"}}>
          <CardContent>
            <DomainName domain={domain.domain} text="Unavailable" />
            <hr />
            <Stack
              direction="column"
              spacing={4}
              mt={2}
              divider={
                <Divider
                  variant="inset"
                  orientation="horizontal"
                  sx={{mb: 0}}
                />
              }
            >
              <Stack direction="column" spacing={2}>
                <Typography noWrap variant="h6" fontWeight="bold">
                  Parent
                </Typography>
                <Box>
                  <Typography variant="h6">.apt</Typography>
                </Box>
              </Stack>

              <TargetAddress
                targetAddress={domain.registered_address}
                domainName={domain.domain}
                targetAddressAccountConnected={targetAddressAccountConnected}
              />

              {domain.all_token_ownerships[0] && (
                <OwnerAddress
                  ownerAddress={domain.all_token_ownerships[0].owner_address}
                />
              )}

              <Stack direction="column" spacing={2}>
                <Typography noWrap variant="h6" fontWeight="bold">
                  Expiration Date
                </Typography>
                <Box>
                  <Typography variant="h6">
                    {parseTimestampNoMillisecond(
                      domain.expiration_timestamp + "Z",
                    )}
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
