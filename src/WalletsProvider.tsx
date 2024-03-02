import {
  AptosWalletAdapterProvider,
  NetworkName,
} from "@aptos-labs/wallet-adapter-react";
import {MartianWallet} from "@martianwallet/aptos-wallet-adapter";
import {PontemWallet} from "@pontem/wallet-adapter-plugin";
import {RiseWallet} from "@rise-wallet/wallet-adapter";
import {FewchaWallet} from "fewcha-plugin-wallet-adapter";
import {PetraWallet} from "petra-plugin-wallet-adapter";
import {BloctoWallet} from "@blocto/aptos-wallet-adapter-plugin";
import {MSafeWalletAdapter} from "msafe-plugin-wallet-adapter";
import {useMemo} from "react";
import {useGlobalState} from "./context";

// A blocto app id is required to initialize the wallet adapter
// This is used when the real id from env is not available so that the website doesn't crash
const DUMMY_BLOCTO_APP_ID = "8d8ef56e-5f2e-6d13-b52e-95c4d5cf9622";

type WalletProviderProps = {
  children: any;
};

export default function WalletsProvider({children}: WalletProviderProps) {
  const state = useGlobalState();

  const network: NetworkName =
    NetworkName.Mainnet === state.networkSupport
      ? NetworkName.Mainnet
      : NetworkName.Testnet;

  const wallets = useMemo(
    () => [
      new PetraWallet(),
      new MartianWallet(),
      new FewchaWallet(),
      new PontemWallet(),
      new RiseWallet(),
      new BloctoWallet({
        network,
        bloctoAppId: process.env.REACT_APP_BLOCTO_APP_ID || DUMMY_BLOCTO_APP_ID,
      }),
      new MSafeWalletAdapter(),
    ],
    [],
  );

  return (
    <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
      {children}
    </AptosWalletAdapterProvider>
  );
}
