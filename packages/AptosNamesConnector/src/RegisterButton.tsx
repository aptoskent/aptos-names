import {Types} from "aptos";
import {Button} from "@mui/material";
import {getContractAddress} from "./utils";
import {ConnectorContext} from "./context/ConnectorContext";
import {useContext} from "react";

type RegisterButtonProps = {
  domainName: string;
  years: number;
};

export default function RegisterButton({
  domainName,
  years,
}: RegisterButtonProps): JSX.Element {
  const {network, onSignTransaction} = useContext(ConnectorContext);

  const contract_address = getContractAddress(network);
  const onRegisterDomainClick = async () => {
    const payload: Types.TransactionPayload = {
      type: "entry_function_payload",
      function: `${contract_address}::domains::register_domain`,
      type_arguments: [],
      arguments: [domainName, years],
    };
    await onSignTransaction(payload);
  };

  return (
    <Button
      variant="contained"
      size="large"
      onClick={onRegisterDomainClick}
      sx={{minWidth: "8rem"}}
    >
      Register
    </Button>
  );
}
