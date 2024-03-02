import {createContext, useContext} from "react";

export type PrimaryNameLookupResult = {
  domain_name: string;
  subdomain_name: {
    vec: string[];
  };
};

export type PrimaryNameContext =
  | {
      primaryName?: PrimaryNameLookupResult;
      refreshPrimaryName: () => void;
      setPrimaryName: (subdomain: string | undefined, domain: string) => void;
      clearPrimaryName: () => void;
      isPrimaryNamesFeatureEnabled: boolean;
      transactionInProcess: boolean;
    }
  | undefined;

export const initialPrimaryNameContext: PrimaryNameContext = {
  primaryName: undefined,
  refreshPrimaryName: () => {},
  setPrimaryName: async () => {},
  clearPrimaryName: () => {},
  isPrimaryNamesFeatureEnabled:
    process.env.REACT_APP_ENABLE_PRIMARY_NAMES === "true",
  transactionInProcess: false,
};

export const PrimaryNameContext = createContext<PrimaryNameContext>(
  initialPrimaryNameContext,
);

export const usePrimaryName = () => {
  const context = useContext(PrimaryNameContext);

  if (!context) {
    throw new Error("usePrimaryName must be used within a PrimaryNameContext");
  }
  return context;
};
