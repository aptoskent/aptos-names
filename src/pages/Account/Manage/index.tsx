import {useWallet} from "@aptos-labs/wallet-adapter-react";
import {Box, Link, Container, Tab, Tabs, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useParams, Link as RRDLink, Navigate} from "react-router-dom";
import GoBack from "../../../components/GoBack";
import RegisterSubdomain from "./RegisterSubdomain";
import SubdomainsTab from "./SubdomainsTab";
import SettingsTab from "./SettingsTab";
import {
  DomainDetails,
  fetchTableItem,
} from "../../Domains/hooks/useGetDomainNameInfo";
import {useGlobalState} from "../../../context";

type DomainNameURLParams = {
  domain: string;
};

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

export default function Manage() {
  const state = useGlobalState();
  const [tabValue, setTabValue] = useState(0);
  const {domain} = useParams() as DomainNameURLParams;
  const [parentDomainDetails, setParentDomainDetails] =
    useState<DomainDetails | null>(null);
  const [parentDomainExpirationTime, setParentDomainExpirationTime] =
    useState<string>("");

  const {account, connected} = useWallet();

  const refreshDomainDetails = async () => {
    if (state?.tableHandle) {
      fetchTableItem(domain, state.tableHandle).then(setParentDomainDetails);
    }
  };

  useEffect(() => {
    refreshDomainDetails();
  }, [domain, state]);

  useEffect(() => {
    if (parentDomainDetails) {
      setParentDomainExpirationTime(parentDomainDetails.expiration_time_sec);
    }
  }, [parentDomainDetails]);

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
      <GoBack to="/account" />
      <Typography variant="h4" mb={3}>
        Manage{" "}
        <Link to={`/name/${domain}`} component={RRDLink}>
          {domain}.apt
        </Link>
      </Typography>

      <Box sx={{borderBottom: 1, borderColor: "divider"}}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="basic tabs example"
        >
          <Tab label="Settings" {...a11yProps("Settings")} />
          <Tab label="Subdomains" {...a11yProps("Subdomains")} />
          <Tab
            label="Register Subdomain"
            {...a11yProps("Register-Subdomain")}
          />
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={0}>
        <SettingsTab
          domain={domain}
          parentDomainDetails={parentDomainDetails}
          refreshDomainDetails={refreshDomainDetails}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <SubdomainsTab domain={domain} setTabValue={setTabValue} />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <RegisterSubdomain
          setTabValue={setTabValue}
          domain={domain}
          parentDomainExpirationTime={parentDomainExpirationTime}
        />
      </TabPanel>
    </Container>
  );
}
