import {Types} from "aptos";
import {createContext} from "react";
import {Network} from "../utils/constants";

type ConnectorState = {
  onSignTransaction: (payload: Types.TransactionPayload) => Promise<any>;
  isWalletConnected: boolean;
  network: string;
};

const defaultConnectorState: ConnectorState = {
  onSignTransaction: undefined,
  isWalletConnected: false,
  network: Network.TESTNET,
};

export const ConnectorContext = createContext(defaultConnectorState || null);
