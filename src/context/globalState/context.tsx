import {createContext, useContext} from "react";

export type GlobalStateContext = {
  tableHandle: string;
  collectionCreator: string;
  networkSupport: string;
};

export const initialGlobalStateContext = {
  tableHandle: "",
  collectionCreator: "",
  networkSupport: process.env.REACT_APP_NETWORK,
};

export const GlobalStateContext = createContext<GlobalStateContext>(
  initialGlobalStateContext,
);

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);

  if (!context) {
    throw new Error(
      "useGlobalStateContext must be used within a GlobalStateContext",
    );
  }
  return context;
};
