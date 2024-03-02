import {useEffect, useState} from "react";
import * as Sentry from "@sentry/react";

import {getAccountResource, getTableItem} from "../../api";
import {CONTRACT_ADDRESS} from "../../utils/constant";
import {CollectionCapabilityData, namesRegistryData} from "../../utils/types";
import {GlobalStateContext, initialGlobalStateContext} from "./context";
import {useWallet} from "@aptos-labs/wallet-adapter-react";
import WalletNetworkNotSupported from "./WalletNetworkNotSupported";

interface GlobalContextProviderProps {
  children: React.ReactNode;
}

const REVERSE_LOOKUP_REGISTRY_V1_TABLE_HANDLE =
  "0x130568e434c6d73a31b07cbd9909f29012e05c8954101960930bd9b59355663";

export const GlobalStateProvider: React.FC<GlobalContextProviderProps> = ({
  children,
}: GlobalContextProviderProps) => {
  const [state, setGlobalState] = useState(initialGlobalStateContext);
  const {account, network} = useWallet();
  const [walletNetworkSupported, setWalletNetworkSupported] =
    useState<boolean>(true);

  useEffect(() => {
    if (network && network.name) {
      const walletNetwork = network.name.toLocaleLowerCase();
      const siteNetworkSupport = state.networkSupport.toLocaleLowerCase();
      const walletNetworkCorrect = walletNetwork.includes(siteNetworkSupport);
      if (walletNetworkCorrect) {
        setWalletNetworkSupported(true);
      } else {
        setWalletNetworkSupported(false);
      }
    }
  }, [network]);

  useEffect(() => {
    const getTableHandle = async () => {
      const accountResource = await getAccountResource({
        address: CONTRACT_ADDRESS,
        resourceType: `${CONTRACT_ADDRESS}::domains::NameRegistryV1`,
      });
      const nameRegistryData = accountResource.data as namesRegistryData;
      return nameRegistryData.registry.handle;
    };

    const getCollectionCreatorAddress = async () => {
      const collectionCapabilityResource = await getAccountResource({
        address: CONTRACT_ADDRESS,
        resourceType: `${CONTRACT_ADDRESS}::token_helper::CollectionCapabilityV1`,
      });
      const collectionCreator =
        collectionCapabilityResource.data as CollectionCapabilityData;
      return collectionCreator.capability.account;
    };

    Promise.all([getTableHandle(), getCollectionCreatorAddress()])
      .then((data) => {
        setGlobalState({
          ...state,
          tableHandle: data[0],
          collectionCreator: data[1],
        });
      })
      .catch((e) =>
        Sentry.captureException(
          `Error setting tableHandle and collectionCreator from api ${e}`,
        ),
      );
  }, []);

  return (
    <GlobalStateContext.Provider value={state}>
      {walletNetworkSupported ? children : <WalletNetworkNotSupported />}
    </GlobalStateContext.Provider>
  );
};
