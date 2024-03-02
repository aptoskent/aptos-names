import {TextField, Typography, Button, Stack} from "@mui/material";
import {orange, red} from "@mui/material/colors";
import {useState} from "react";
import {
  getNowInSeconds,
  isValidDomainName,
  yearsToSeconds,
} from "../../../utils";
import {Types} from "aptos";
import {CONTRACT_ADDRESS} from "../../../utils/constant";
import useSignAndSubmitTransaction from "../../../api/useSignAndSubmitTransaction";
import RegistrationPeriod from "../../Domains/Components/DomainNameRegister/RegistrationPeriod";
import {useWallet} from "@aptos-labs/wallet-adapter-react";
import LoadingModal from "../../../components/LoadingModal";
import {usePrimaryName} from "../../../context/primaryName/context";

type RegisterSubdomainProps = {
  domain: string;
  setTabValue: React.Dispatch<React.SetStateAction<number>>;
  parentDomainExpirationTime: string;
};

function getRegistrationDuration(yearsInSeconds: number): number {
  return getNowInSeconds() + yearsInSeconds;
}

function regTimeLongerThanParentRegTime(
  years: number,
  parentDomainExpirationTimeNumber: number,
): boolean {
  return (
    getRegistrationDuration(yearsToSeconds(years)) >
    parentDomainExpirationTimeNumber
  );
}

export default function RegisterSubdomain({
  domain,
  setTabValue,
  parentDomainExpirationTime,
}: RegisterSubdomainProps): JSX.Element {
  const {connected} = useWallet();
  const [subdomainName, setSubdomainName] = useState<string>("");
  const [nameError, setNameError] = useState<boolean>(false);
  const [years, setYears] = useState<number>(1);
  const parentDomainExpirationTimeNumber = parseInt(parentDomainExpirationTime);
  const {refreshPrimaryName} = usePrimaryName();
  const {submitTransaction, transactionInProcess} =
    useSignAndSubmitTransaction();

  const onAddYearsClick = () => {
    if (regTimeLongerThanParentRegTime(years, parentDomainExpirationTimeNumber))
      return;
    setYears(years + 1);
  };

  const onReduceYearsClick = () => {
    if (years === 1) return;
    setYears(years - 1);
  };

  const onRegisterSubdomainClick = () => {
    if (!isValidDomainName(subdomainName)) {
      setNameError(true);
      return;
    }
    if (
      regTimeLongerThanParentRegTime(years, parentDomainExpirationTimeNumber)
    ) {
      submit(parentDomainExpirationTimeNumber - 1);
    } else {
      submit(getRegistrationDuration(yearsToSeconds(years)));
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (nameError) {
      setNameError(false);
    }
    const name = e.target.value;
    setSubdomainName(name);
  };

  const submit = async (seconds: number): Promise<void> => {
    const payload: Types.TransactionPayload = {
      type: "entry_function_payload",
      function: `${CONTRACT_ADDRESS}::domains::register_subdomain`,
      type_arguments: [],
      arguments: [subdomainName, domain, seconds],
    };

    const success = await submitTransaction(payload);
    if (success) {
      setTabValue(0);
      refreshPrimaryName();
    }
  };

  return (
    <>
      <LoadingModal open={transactionInProcess} />
      <Stack justifyContent="space-between" spacing={4}>
        <TextField
          id="standard-basic"
          label="Subdomain Name"
          variant="standard"
          fullWidth
          autoComplete="off"
          onInput={onInputChange}
        />
        {nameError && (
          <Typography color={red[500]}>
            Name should have between 3 to 63 characters and contain only:
            lowercase (a-z), numbers (0-9), hyphen (-). A name may not start or
            end with a hyphen
          </Typography>
        )}
        <RegistrationPeriod
          years={years}
          onAddYearsClick={onAddYearsClick}
          onReduceYearsClick={onReduceYearsClick}
        />
        <Stack>
          <Button
            variant="contained"
            color="success"
            disabled={!connected}
            size="large"
            onClick={onRegisterSubdomainClick}
          >
            Register
          </Button>
          {!connected && (
            <Typography color={orange[500]}>
              Please connect a wallet to register the subdomain
            </Typography>
          )}
        </Stack>
      </Stack>
    </>
  );
}
