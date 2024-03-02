import {Box, Button, Stack, Typography} from "@mui/material";
import {Types} from "aptos";
import useSignAndSubmitTransaction from "../../../../../api/useSignAndSubmitTransaction";
import LoadingModal from "../../../../../components/LoadingModal";
import {usePrimaryName} from "../../../../../context/primaryName/context";
import {extractAptFromDomainName} from "../../../../../utils";
import {CONTRACT_ADDRESS} from "../../../../../utils/constant";

type ManageProps = {
  domainName: string;
  setAddress: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export default function ClearSubdomainTargetAddress({
  domainName,
  setAddress,
}: ManageProps): JSX.Element {
  const {refreshPrimaryName} = usePrimaryName();
  const {transactionInProcess, submitTransaction} =
    useSignAndSubmitTransaction();

  const onClearClick = async () => {
    domainName = extractAptFromDomainName(domainName);
    const names = domainName.split(".");
    const domain = names[1];
    const subdomain = names[0];
    const payload: Types.TransactionPayload = {
      type: "entry_function_payload",
      function: `${CONTRACT_ADDRESS}::domains::clear_subdomain_address`,
      type_arguments: [],
      arguments: [subdomain, domain],
    };

    const success = await submitTransaction(payload);
    if (success) {
      setAddress(undefined);
      refreshPrimaryName();
    }
  };

  return (
    <form>
      <Box>
        <LoadingModal open={transactionInProcess} />
        <Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            justifyItems="center"
          >
            <Box>
              <Typography variant="body1">Clear Target Address</Typography>
              <Typography variant="body2">
                This will remove the address from the mapping, but retain
                ownership
              </Typography>
            </Box>
            <Button size="large" variant="contained" onClick={onClearClick}>
              Clear
            </Button>
          </Stack>
        </Stack>
      </Box>
    </form>
  );
}
