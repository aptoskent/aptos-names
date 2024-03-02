import {useWallet} from "@aptos-labs/wallet-adapter-react";
import {Container, Box, Stack, Button} from "@mui/material";
import {useEffect} from "react";
import LoadingModal from "../../../components/LoadingModal";
import {useGlobalState} from "../../../context";
import {useDocumentTitle} from "../../../hooks/setDocumentTitle";
import SubdomainsTable from "../Manage/components/SubdomainsTable";
import {useGetAccountSubdomainsCount} from "./api/Subdomains/useGetAccountSubdomainsCount";
import {useGetAccountSubomains} from "./api/Subdomains/useGetAccountSubomains";
import NoSubomainsCard from "./components/NoSubdomainCard";

export function SubdomainsTab() {
  const state = useGlobalState();
  const {account, connected} = useWallet();
  const [documentTitle, setDocumentTitle] = useDocumentTitle(
    "My Account - Subdomains - Aptos Names",
  );

  const {gotTotalSubdomains, totalSubdomainsCount} =
    useGetAccountSubdomainsCount();
  const {gotSubdomains, fetchMoreSubdomains, loading, subdomains} =
    useGetAccountSubomains();

  useEffect(() => {
    if (state && account?.address) {
      gotTotalSubdomains(account.address);
      gotSubdomains(account.address, 0);
    }
  }, [connected, state]);

  const onSeeMoreClicked = () => {
    fetchMoreSubdomains(account.address, subdomains.length);
  };

  return (
    <Container>
      <LoadingModal open={loading} />
      <Box>
        {subdomains && totalSubdomainsCount > 0 && (
          <Stack>
            <SubdomainsTable subdomains={subdomains} />
            {subdomains.length < totalSubdomainsCount && (
              <Button variant="contained" onClick={onSeeMoreClicked}>
                See More
              </Button>
            )}
          </Stack>
        )}

        {!loading && subdomains && totalSubdomainsCount === 0 && (
          <NoSubomainsCard />
        )}
      </Box>
    </Container>
  );
}
