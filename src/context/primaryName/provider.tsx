import {useEffect, useState} from "react";

import {getTableItem} from "../../api";
import {
  initialPrimaryNameContext,
  PrimaryNameContext,
  PrimaryNameLookupResult,
} from "./context";
import {useWallet} from "@aptos-labs/wallet-adapter-react";
import {CONTRACT_ADDRESS} from "../../utils/constant";
import {Types} from "aptos";
import useSignAndSubmitTransaction from "../../api/useSignAndSubmitTransaction";

interface PrimaryNameProviderProps {
  children: React.ReactNode;
}

export const PrimaryNameProvider: React.FC<PrimaryNameProviderProps> = ({
  children,
}: PrimaryNameProviderProps) => {
  const [primaryNameContext, setPrimaryNameContext] =
    useState<PrimaryNameContext>(initialPrimaryNameContext);
  const {submitTransaction, transactionInProcess} =
    useSignAndSubmitTransaction();
  const {account} = useWallet();

  const setPrimaryName = async (
    subdomain: string | undefined,
    domain: string,
  ) => {
    const payload: Types.TransactionPayload = {
      type: "entry_function_payload",
      function: `${CONTRACT_ADDRESS}::domains::set_reverse_lookup_entry`,
      type_arguments: [],
      arguments: [subdomain || "", domain],
    };
    const success = await submitTransaction(payload);
    if (success) {
      refreshPrimaryName();
    }
  };

  const clearPrimaryName = async () => {
    const payload: Types.TransactionPayload = {
      type: "entry_function_payload",
      function: `${CONTRACT_ADDRESS}::domains::clear_reverse_lookup_entry`,
      type_arguments: [],
      arguments: [],
    };
    const success = await submitTransaction(payload);
    if (success) {
      refreshPrimaryName();
    }
  };

  const refreshPrimaryName = async () => {
    if (!account?.address) {
      return;
    }
    try {
      const lookup: PrimaryNameLookupResult = await getTableItem({
        tableHandle:
          process.env.REACT_APP_REVERSE_LOOKUP_REGISTRY_V1_TABLE_HANDLE,
        data: {
          key_type: "address",
          value_type: `${process.env.REACT_APP_CONTRACT_ADDRESS}::domains::NameRecordKeyV1`,
          key: account.address,
        },
      });
      setPrimaryNameContext({
        ...primaryNameContext,
        primaryName: lookup,
        refreshPrimaryName,
        setPrimaryName,
        clearPrimaryName,
      });
    } catch (e) {
      console.log(e);
      setPrimaryNameContext({
        ...primaryNameContext,
        refreshPrimaryName,
        setPrimaryName,
        clearPrimaryName,
      });
    }
  };

  useEffect(() => {
    refreshPrimaryName();
  }, [account]);

  return (
    <PrimaryNameContext.Provider
      value={{...primaryNameContext, transactionInProcess}}
    >
      {children}
    </PrimaryNameContext.Provider>
  );
};
