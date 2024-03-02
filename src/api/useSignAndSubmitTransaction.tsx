import {useWallet} from "@aptos-labs/wallet-adapter-react";
import {Link} from "@mui/material";
import {Types, AptosClient} from "aptos";
import {useContext, useState} from "react";
import {nodeUrl} from ".";
import {SnackBarContext} from "../context/snackbar/context";
import {explorerURL} from "../utils/constant";

const client = new AptosClient(nodeUrl, {
  WITH_CREDENTIALS: false,
});

const useSignAndSubmitTransaction = () => {
  const {signAndSubmitTransaction} = useWallet();
  const {snackBar, setSnackBar} = useContext(SnackBarContext);

  const [transactionInProcess, setTransactionInProcess] =
    useState<boolean>(false);

  const SuccessMessage = (transactionHash: string) => {
    return (
      <>
        Succeeded with transaction {""}
        <Link
          href={`${explorerURL}/txn/${transactionHash}`}
          color="inherit"
          target="_blank"
          onClick={() => setSnackBar({...snackBar, isOpen: false})}
        >
          {transactionHash}
        </Link>
      </>
    );
  };

  const ErrorMessage = (errorMessage: string) => {
    return `Failed with error message "${errorMessage}". Please try again.`;
  };

  async function submitTransaction(
    payload: Types.TransactionPayload,
  ): Promise<boolean> {
    setTransactionInProcess(true);
    try {
      const data = await signAndSubmitTransaction(payload);
      if ("hash" in data) {
        await client.waitForTransaction(data["hash"]);
        setSnackBar({
          isOpen: true,
          message: SuccessMessage(data.hash),
          severity: "success",
        });
        return true;
      }
    } catch (err: any) {
      const msg = typeof err === "object" ? err.message : err;
      setSnackBar({
        isOpen: true,
        message: ErrorMessage(msg),
        severity: "error",
      });
      return false;
    } finally {
      setTransactionInProcess(false);
    }
    return false;
  }

  return {
    submitTransaction,
    transactionInProcess,
    setTransactionInProcess,
  };
};

export default useSignAndSubmitTransaction;
