import {useState, useContext} from "react";
import RegistrationPeriod from "./RegistrationPeriod";
import RegisterButton from "./RegisterButton";
import {
  Card,
  CardContent,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import {colors as colors} from "@mui/material";
import {DOMAIN_REGISTER_MAX_YEARS} from "./utils/constants";
import DomainCost from "./DomainCost";
import DomainName from "./DomainName";
import {Types} from "aptos";
import {ConnectorContext} from "./context/ConnectorContext";

type DomainNameURLParams = {
  name: string;
};

export default function DomainNameRegister({
  name,
}: DomainNameURLParams): JSX.Element {
  const [years, setYears] = useState<number>(1);

  const onAddYearsClick = () => {
    if (years === DOMAIN_REGISTER_MAX_YEARS) return;
    setYears(years + 1);
  };

  const onReduceYearsClick = () => {
    if (years === 1) return;
    setYears(years - 1);
  };
  const {isWalletConnected} = useContext(ConnectorContext);

  return (
    <Card padding-top="24px">
      <CardContent>
        <Stack
          direction={{xs: "column", sm: "row"}}
          justifyContent="space-between"
          spacing={4}
          divider={
            <Divider variant="inset" orientation="horizontal" sx={{mb: 0}} />
          }
        >
          <DomainName domain={name} text="Available" />
          <RegistrationPeriod />
          <DomainCost domainName={name} />
          <Stack justifyContent="center">
            <RegisterButton domainName={name} years={years} />
            {!isWalletConnected && (
              <Typography color={colors.orange[500]}>
                Please connect a wallet to register the domain
              </Typography>
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
