import {Box, Collapse, Divider, Stack, Typography} from "@mui/material";
import {Types} from "aptos";
import useSignAndSubmitTransaction from "../../../../../api/useSignAndSubmitTransaction";
import LoadingModal from "../../../../../components/LoadingModal";
import {extractAptFromDomainName} from "../../../../../utils";
import {CONTRACT_ADDRESS} from "../../../../../utils/constant";
import ClearSubdomainTargetAddress from "./ClearSubdomainTargetAddress";
import UpdateTargetAddressInput from "../UpdateTargetAddressInput";
import {usePrimaryName} from "../../../../../context/primaryName/context";

type SubdomainSettingsCollapseProps = {
  domainName: string;
  setAddress: React.Dispatch<React.SetStateAction<string | undefined>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SubdomainSettingsCollapse({
  domainName,
  setAddress,
  open,
  setOpen,
}: SubdomainSettingsCollapseProps) {
  const {refreshPrimaryName} = usePrimaryName();
  const {submitTransaction, transactionInProcess} =
    useSignAndSubmitTransaction();

  const updateTargetAddress = async (newAddress: string | undefined) => {
    domainName = extractAptFromDomainName(domainName);
    const names = domainName.split(".");
    const domain = names[1];
    const subDomain = names[0];
    const payload: Types.TransactionPayload = {
      type: "entry_function_payload",
      function: `${CONTRACT_ADDRESS}::domains::set_subdomain_address`,
      type_arguments: [],
      arguments: [subDomain, domain, newAddress],
    };
    const success = await submitTransaction(payload);
    if (success) {
      setAddress(newAddress);
      setOpen(false);
      refreshPrimaryName();
    }
  };
  return (
    <Box m="0 0 1rem 0">
      <LoadingModal open={transactionInProcess} />
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Stack
          spacing={4}
          divider={
            <Divider variant="inset" orientation="horizontal" sx={{mb: 0}} />
          }
        >
          <Stack spacing={1}>
            <Typography variant="body1">Update Target Address</Typography>
            <UpdateTargetAddressInput
              updateTargetAddress={updateTargetAddress}
            />
          </Stack>
          <ClearSubdomainTargetAddress
            domainName={domainName}
            setAddress={setAddress}
          />
        </Stack>
        <Divider variant="fullWidth" orientation="horizontal" sx={{mt: 2}} />
      </Collapse>
    </Box>
  );
}
