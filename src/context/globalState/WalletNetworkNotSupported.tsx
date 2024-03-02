import {Container, Stack, Typography} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import {useWallet} from "@aptos-labs/wallet-adapter-react";

import {useGlobalState} from "./context";

export default function WalletNetworkNotSupported() {
  const state = useGlobalState();
  const {wallet} = useWallet();

  return (
    <Container>
      <Stack alignItems="center" spacing={3}>
        <WarningAmberIcon fontSize="large" htmlColor="red" />
        <Typography variant="h5">Unsupported Wallet Network</Typography>
        <Typography variant="h6">
          Please change your {wallet.name} wallet network to{" "}
          {state.networkSupport.toUpperCase()}
        </Typography>
      </Stack>
    </Container>
  );
}
