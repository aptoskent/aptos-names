import {Types} from "aptos";
import {Button, CircularProgress} from "@mui/material";
import {useWallet} from "@aptos-labs/wallet-adapter-react";
import useSignAndSubmitTransaction from "../../../../api/useSignAndSubmitTransaction";
import {useNavigate} from "react-router-dom";
import {CONTRACT_ADDRESS} from "../../../../utils/constant";
import {getAccount} from "../../../../api";
import {useContext, useState} from "react";
import {SnackBarContext} from "../../../../context/snackbar/context";
import {HexString} from "aptos";
import CaptchaV2RegisterModal from "./CaptchaV2RegisterModal";
import {usePrimaryName} from "../../../../context/primaryName/context";

type RegisterButtonProps = {
  domainName: string;
  years: number;
};

export default function RegisterButton({
  domainName,
  years,
}: RegisterButtonProps): JSX.Element {
  const {account, connected} = useWallet();
  const navigate = useNavigate();
  const {snackBar, setSnackBar} = useContext(SnackBarContext);
  const [modalOpen, setModalOpen] = useState(false);
  const {refreshPrimaryName} = usePrimaryName();
  const {submitTransaction, transactionInProcess, setTransactionInProcess} =
    useSignAndSubmitTransaction();

  const getSignedMessage = async (
    recaptchaToken: string,
    registerDomainProofChallenge: any,
  ) => {
    const verifyUrl = process.env.REACT_APP_VERIFY_URL;
    if (!verifyUrl) {
      return {error: "Missing verify_url."};
    }
    try {
      const response = await fetch(verifyUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({recaptchaToken, registerDomainProofChallenge}),
      });
      return response.json();
    } catch (e) {
      console.log("verifyUrl", e);
      return {error: "Internal error."};
    }
  };

  const fetchAccount = async () => {
    try {
      const {sequence_number} = await getAccount({
        address: account?.address! as string,
      });
      return {sequence_number};
    } catch (error: any) {
      console.log(`error fetching account ${account?.address}`, error);
      return {error};
    }
  };

  const onRegisterDomainClick = async (
    recaptchaToken: string,
    onDone: () => void,
  ) => {
    setTransactionInProcess(true);
    const {sequence_number, error: account_error} = await fetchAccount();
    if (!sequence_number || account_error) {
      setTransactionInProcess(false);
      onDone();
      console.log(`error fetching account ${account?.address}`, account_error);
      setSnackBar({
        isOpen: true,
        message: `Account ${account?.address} not found`,
        severity: "error",
      });
      return;
    }
    const {signedMessage, error: verification_error} = await getSignedMessage(
      recaptchaToken,
      {
        sequenceNumber: Number(sequence_number),
        registerAddress: account?.address,
        domainName,
      },
    );
    if (!signedMessage || verification_error) {
      setTransactionInProcess(false);
      onDone();
      console.log("Probably a robot.", verification_error);
      setSnackBar({
        isOpen: true,
        message: verification_error,
        severity: "error",
      });
      return;
    }
    const payload: Types.TransactionPayload = {
      type: "entry_function_payload",
      function: `${CONTRACT_ADDRESS}::domains::register_domain_with_signature`,
      type_arguments: [],
      arguments: [
        domainName,
        years,
        Array.from(new HexString(signedMessage.hexString).toUint8Array()),
      ],
    };

    const success = await submitTransaction(payload);
    if (success) {
      navigate(`/account`);
      refreshPrimaryName();
    }
  };

  return (
    <>
      <CaptchaV2RegisterModal
        handleClose={() => setModalOpen(false)}
        modalOpen={modalOpen}
        onRegister={onRegisterDomainClick}
        transactionInProcess={transactionInProcess}
      />
      <Button
        variant="contained"
        disabled={!connected}
        size="large"
        onClick={() => setModalOpen(true)}
        sx={{minWidth: "8rem"}}
      >
        {transactionInProcess ? (
          <CircularProgress size={20} sx={{color: "black"}} />
        ) : (
          "Register"
        )}
      </Button>
    </>
  );
}
