import {useState} from "react";
import AptosNamesButton from "./AptosNamesButton";
import AptosNamesModal from "./AptosNamesModal";
import {Types} from "aptos";
import {ConnectorContext} from "./context/ConnectorContext";
import {ProvideColorMode} from "./context/color-mode";

type ConnectorProps = {
  onSignTransaction: (payload: Types.TransactionPayload) => Promise<any>;
  isWalletConnected: boolean;
  network: string;
  buttonLabel: string;
};

export function AptosNamesConnector({
  onSignTransaction,
  isWalletConnected,
  network,
  buttonLabel,
}: ConnectorProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  return (
    <ProvideColorMode>
      <ConnectorContext.Provider
        value={{onSignTransaction, isWalletConnected, network}}
      >
        <AptosNamesButton
          buttonLabel={buttonLabel}
          handleModalOpen={handleModalOpen}
        />
        <AptosNamesModal handleClose={handleClose} modalOpen={modalOpen} />
      </ConnectorContext.Provider>
    </ProvideColorMode>
  );
}
