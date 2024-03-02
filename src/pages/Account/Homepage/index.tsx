import {useWallet} from "@aptos-labs/wallet-adapter-react";
import {Box, Container, Tab, Tabs, Typography} from "@mui/material";
import {useState} from "react";
import {Navigate} from "react-router-dom";
import {SubdomainsTab} from "./SubdomainsTab";
import {DomainsTab} from "./DomainsTab";
import SearchInput from "../../../components/SearchInput";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`${value}-tabpanel`}
      aria-labelledby={`s${value}-tab`}
      {...other}
    >
      {value === index && <Box sx={{p: 3}}>{children}</Box>}
    </div>
  );
}

function a11yProps(tabLabel: string) {
  return {
    id: `${tabLabel}-tab`,
    "aria-controls": `${tabLabel}-tabpanel`,
  };
}

export default function Account(): JSX.Element {
  const [tabValue, setTabValue] = useState(0);

  const {account, connected} = useWallet();

  if (!connected) {
    return <Navigate to="/" />;
  }

  if (!account) {
    return <Navigate to="/account" />;
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container>
      <Box sx={{mt: "5rem"}}>
        <SearchInput />
        <Box sx={{mt: "5rem"}}>
          <Typography variant="h4">
            {account
              ? "Account"
              : "Please connect a wallet to view your account"}
          </Typography>
          <Box sx={{borderBottom: 1, borderColor: "divider", mt: "3rem"}}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="account-tabs"
            >
              <Tab label="Domains" {...a11yProps("Domains")} />
              <Tab label="Subdomains" {...a11yProps("Subdomains")} />
            </Tabs>
          </Box>
          <TabPanel value={tabValue} index={0}>
            <DomainsTab />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <SubdomainsTab />
          </TabPanel>
        </Box>
      </Box>
    </Container>
  );
}
