import {Button, Stack} from "@mui/material";
import "./styles.css";

type AptosNamesButtonProps = {
  handleModalOpen: () => void;
  buttonLabel: string;
};

export default function AptosNamesButton({
  handleModalOpen,
  buttonLabel,
}: AptosNamesButtonProps): JSX.Element {
  const onConnectWalletClick = () => {
    handleModalOpen();
  };

  return (
    <Button className="ans_connector_button" onClick={onConnectWalletClick}>
      {buttonLabel}
    </Button>
  );
}
