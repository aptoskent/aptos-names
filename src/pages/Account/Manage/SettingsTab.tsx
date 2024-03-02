import {Button, Divider, Stack, Typography} from "@mui/material";
import {Types} from "aptos";
import {useState} from "react";
import useSignAndSubmitTransaction from "../../../api/useSignAndSubmitTransaction";
import HashButton from "../../../components/AccountAddressButton";
import LoadingModal from "../../../components/LoadingModal";
import {extractAptFromDomainName} from "../../../utils";
import {CONTRACT_ADDRESS} from "../../../utils/constant";
import ClearButton from "../../Domains/Components/DomainNameInfo/ClearButton";
import {DomainDetails} from "../../Domains/hooks/useGetDomainNameInfo";
import UpdateTargetAddressInput from "./components/UpdateTargetAddressInput";
import {usePrimaryName} from "../../../context/primaryName/context";

type SettingsTabProps = {
  domain: string;
  parentDomainDetails: DomainDetails | null;
  refreshDomainDetails: () => void;
};

function PrimaryNameRow({domain}) {
  const {
    primaryName,
    setPrimaryName,
    clearPrimaryName,
    isPrimaryNamesFeatureEnabled,
  } = usePrimaryName();

  if (!isPrimaryNamesFeatureEnabled) {
    return <></>;
  }
  if (domain !== primaryName?.domain_name) {
    return (
      <Stack spacing={4} mb={3}>
        <Typography variant="h6">Set Primary Name</Typography>
        <Divider variant="inset" orientation="horizontal" sx={{mb: 0}} />
        <Stack
          direction="row"
          justifyContent="space-between"
          justifyItems="center"
        >
          <Typography variant="body1">
            Make <b>{domain}.apt</b> the default name for this wallet across the
            Aptos ecosystem.
          </Typography>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={() => setPrimaryName(undefined, domain)}
            sx={{minWidth: "6.5rem"}}
          >
            Set Primary
          </Button>
        </Stack>
      </Stack>
    );
  }
  return (
    <Stack spacing={4} mb={3}>
      <Typography variant="h6">Clear Primary Name</Typography>
      <Divider variant="inset" orientation="horizontal" sx={{mb: 0}} />
      <Stack
        direction="row"
        justifyContent="space-between"
        justifyItems="center"
      >
        <Typography variant="body1">
          Clear <b>{domain}.apt</b> as the default name for this wallet.
        </Typography>
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={clearPrimaryName}
          sx={{minWidth: "6.5rem"}}
        >
          Clear
        </Button>
      </Stack>
    </Stack>
  );
}

export default function SettingsTab({
  domain,
  parentDomainDetails,
  refreshDomainDetails,
}: SettingsTabProps) {
  const {submitTransaction, transactionInProcess} =
    useSignAndSubmitTransaction();
  const {transactionInProcess: primaryNameTransactionInProcess} =
    usePrimaryName();
  const {refreshPrimaryName} = usePrimaryName();
  const targetAddress = parentDomainDetails?.target_address?.vec[0];

  const updateTargetAddress = async (newAddress: string) => {
    const payload: Types.TransactionPayload = {
      type: "entry_function_payload",
      function: `${CONTRACT_ADDRESS}::domains::set_domain_address`,
      type_arguments: [],
      arguments: [extractAptFromDomainName(domain), newAddress],
    };
    const success = await submitTransaction(payload);
    if (success) {
      refreshDomainDetails();
      refreshPrimaryName();
    }
  };

  return (
    <>
      <LoadingModal
        open={transactionInProcess || primaryNameTransactionInProcess}
      />
      <Stack
        spacing={4}
        divider={
          <Divider variant="dotted" orientation="horizontal" sx={{mb: 0}} />
        }
      >
        <Stack spacing={4} mb={3}>
          <Stack direction="row">
            <Typography variant="h6" mr={2}>
              Update Current Target Address
            </Typography>
            {targetAddress && <HashButton address={targetAddress} />}
          </Stack>
          <Divider variant="inset" orientation="horizontal" sx={{mb: 0}} />
          <Typography variant="body1">
            Set the address that the name points to
          </Typography>
          <UpdateTargetAddressInput updateTargetAddress={updateTargetAddress} />
        </Stack>
        <Stack spacing={4} mb={3}>
          <Typography variant="h6">Clear Target Address</Typography>
          <Divider variant="inset" orientation="horizontal" sx={{mb: 0}} />
          <Stack
            direction="row"
            justifyContent="space-between"
            justifyItems="center"
          >
            <Typography variant="body1">
              This will remove the address from the mapping, but retain
              ownership
            </Typography>
            <ClearButton domainName={domain} disable={true} />
          </Stack>
        </Stack>
        <PrimaryNameRow domain={domain} />
      </Stack>
    </>
  );
}
