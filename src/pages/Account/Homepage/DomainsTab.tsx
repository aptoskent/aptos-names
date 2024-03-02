import {useWallet} from "@aptos-labs/wallet-adapter-react";
import {Container, Box, Stack, Button} from "@mui/material";
import {useEffect} from "react";
import LoadingModal from "../../../components/LoadingModal";
import {useGlobalState} from "../../../context";
import {useDocumentTitle} from "../../../hooks/setDocumentTitle";
import {useGetAccountDomainCount} from "./api/Domains/useGetAccountDomainCount";
import {useGetAccountDomains} from "./api/Domains/useGetAccountDomains";
import DomainsTable from "./components/DomainsTable";
import NoDomainsCard from "./components/NoDomainsCard";

export function DomainsTab() {
  const state = useGlobalState();
  const {account} = useWallet();
  const [documentTitle, setDocumentTitle] = useDocumentTitle(
    "My Account - Domains - Aptos Names",
  );

  const {gotTotalDomains, totalNamesCount} = useGetAccountDomainCount();
  const {gotDomains, fetchMoreDomains, loading, names} = useGetAccountDomains();

  useEffect(() => {
    if (state && account?.address) {
      gotDomains(account.address, 0);
      gotTotalDomains(account.address);
    }
  }, [account, state]);

  const onSeeMoreClicked = () => {
    fetchMoreDomains(account.address, names.length);
  };

  return (
    <Container>
      <LoadingModal open={loading} />
      <Box>
        {names && totalNamesCount > 0 && (
          <Stack>
            <DomainsTable domains={names} />
            {names.length < totalNamesCount && (
              <Button variant="contained" onClick={onSeeMoreClicked}>
                See More
              </Button>
            )}
          </Stack>
        )}

        {!loading && names && totalNamesCount === 0 && <NoDomainsCard />}
      </Box>
    </Container>
  );
}
