import {useWallet} from "@aptos-labs/wallet-adapter-react";
import {Button, Card, CardContent, Stack, Typography} from "@mui/material";
import {useEffect} from "react";
import {Navigate} from "react-router-dom";

import LoadingModal from "../../../components/LoadingModal";
import {useGlobalState} from "../../../context";
import SubdomainsTable from "./components/SubdomainsTable";
import {useGetAccountSubdomainCount} from "./api/useGetAccountSubdomainCount";
import {useGetAccountSubomains} from "./api/useGetAccountSubdomains";

type SubdomainsTabProps = {
  domain: string;
  setTabValue: React.Dispatch<React.SetStateAction<number>>;
};

export default function SubdomainsTab({
  domain,
  setTabValue,
}: SubdomainsTabProps) {
  const state = useGlobalState();
  const {account, connected} = useWallet();
  const {gotTotalSubdomain, totaSubdomainsCount} =
    useGetAccountSubdomainCount();
  const {gotSubdomains, fetchMoreSubdomains, loading, subdomains} =
    useGetAccountSubomains();

  useEffect(() => {
    if (state && account?.address) {
      gotTotalSubdomain(account.address, domain);
      gotSubdomains(account.address, domain, 0);
    }
  }, [connected, state]);

  if (!connected) {
    return <Navigate to="/" />;
  }

  if (loading) {
    return <LoadingModal open={loading} />;
  }

  const onSeeMoreClicked = () => {
    fetchMoreSubdomains(account.address, domain, subdomains.length);
  };

  if (subdomains && subdomains.length > 0) {
    return (
      <Stack>
        <SubdomainsTable subdomains={subdomains} />
        {subdomains.length < totaSubdomainsCount && (
          <Button variant="contained" onClick={onSeeMoreClicked}>
            See More
          </Button>
        )}
      </Stack>
    );
  }

  return (
    <Card>
      <CardContent>
        <Stack spacing={2} mb={2}>
          <Typography variant="subtitle1">
            Subdomains that you register will show up here
          </Typography>
        </Stack>
        <Button size="large" variant="contained" onClick={() => setTabValue(2)}>
          Register Subdomain
        </Button>
      </CardContent>
    </Card>
  );
}
