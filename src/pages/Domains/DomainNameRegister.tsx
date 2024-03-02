import {useState} from "react";
import RegistrationPeriod from "./Components/DomainNameRegister/RegistrationPeriod";
import DomainName from "../../components/DomainName";
import RegisterButton from "./Components/DomainNameRegister/RegisterButton";
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {orange} from "@mui/material/colors";
import {useWallet} from "@aptos-labs/wallet-adapter-react";
import {useParams} from "react-router-dom";
import SearchInput from "../../components/SearchInput";
import {useDocumentTitle} from "../../hooks/setDocumentTitle";
import {DOMAIN_REGISTER_MAX_YEARS} from "../../utils/constant";
import {extractAptFromDomainName} from "../../utils";
import DomainCost from "./Components/DomainNameRegister/DomainCost";

type DomainNameURLParams = {
  domain: string;
};

export default function DomainNameRegister(): JSX.Element {
  const {domain} = useParams() as DomainNameURLParams;
  const [years, setYears] = useState<number>(1);
  const {connected} = useWallet();
  const [documentTitle, setDocumentTitle] = useDocumentTitle(
    `Register ${domain}.apt - Aptos Names`,
  );
  const domainName = extractAptFromDomainName(domain);

  const onAddYearsClick = () => {
    if (years === DOMAIN_REGISTER_MAX_YEARS) return;
    setYears(years + 1);
  };

  const onReduceYearsClick = () => {
    if (years === 1) return;
    setYears(years - 1);
  };

  return (
    <Container>
      <Box sx={{mt: "5rem"}}>
        <SearchInput />
        <Card sx={{mt: "5rem"}}>
          <CardContent>
            <Stack
              direction={{xs: "column", sm: "row"}}
              justifyContent="space-between"
              spacing={4}
              divider={
                <Divider
                  variant="inset"
                  orientation="horizontal"
                  sx={{mb: 0}}
                />
              }
            >
              <DomainName domain={domainName} text="Available" />
              <RegistrationPeriod
                years={years}
                onAddYearsClick={onAddYearsClick}
                onReduceYearsClick={onReduceYearsClick}
              />
              <DomainCost domainName={domain} />
              <Stack justifyContent="center">
                <RegisterButton domainName={domainName} years={years} />
                {!connected && (
                  <Typography color={orange[500]}>
                    Please connect a wallet to register the domain
                  </Typography>
                )}
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
