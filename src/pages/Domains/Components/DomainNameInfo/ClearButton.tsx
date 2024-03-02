import {Button, Tooltip} from "@mui/material";
import {Types} from "aptos";
import useSignAndSubmitTransaction from "../../../../api/useSignAndSubmitTransaction";
import LoadingModal from "../../../../components/LoadingModal";
import {extractAptFromDomainName} from "../../../../utils";
import {CONTRACT_ADDRESS} from "../../../../utils/constant";

type ClearButtonProps = {
  domainName: string;
  disable: boolean;
  callback?: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export default function ClearButton({
  domainName,
  disable,
  callback,
}: ClearButtonProps) {
  const {transactionInProcess, submitTransaction} =
    useSignAndSubmitTransaction();

  const onClearClick = async () => {
    const payload: Types.TransactionPayload = {
      type: "entry_function_payload",
      function: `${CONTRACT_ADDRESS}::domains::clear_domain_address`,
      type_arguments: [],
      arguments: [extractAptFromDomainName(domainName)],
    };

    const success = await submitTransaction(payload);
    if (success) {
      callback && callback(undefined);
    }
  };

  return (
    <>
      <LoadingModal open={transactionInProcess} />
      {disable ? (
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={onClearClick}
          sx={{minWidth: "6.5rem"}}
        >
          Clear
        </Button>
      ) : (
        <Tooltip title="You can only Clear the Target Address if you are the registerer and logged into your wallet">
          <span>
            <Button
              disabled={true}
              variant="contained"
              size="large"
              sx={{minWidth: "6.5rem"}}
            >
              Clear
            </Button>
          </span>
        </Tooltip>
      )}
    </>
  );
}
