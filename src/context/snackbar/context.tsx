import {AlertColor} from "@mui/material";
import {createContext, Dispatch, SetStateAction, useContext} from "react";

type SnackBarMessage = JSX.Element | string;

export type SnackBarProps = {
  isOpen: boolean;
  message: SnackBarMessage;
  severity: AlertColor;
};

export type SnackBarContext = {
  snackBar: SnackBarProps;
  setSnackBar: Dispatch<
    SetStateAction<{
      isOpen: boolean;
      message: SnackBarMessage;
      severity: AlertColor;
    }>
  >;
};

export const initialSnackBarContext = {
  snackBar: {
    isOpen: false,
    message: "" as SnackBarMessage,
    severity: "success" as AlertColor,
  },
  setSnackBar: () => {},
};

export const SnackBarContext = createContext<SnackBarContext>(
  initialSnackBarContext,
);

export const useSnackBarContext = () => {
  const context = useContext(SnackBarContext) as SnackBarContext;

  if (!context) {
    throw new Error("useSnackBarContext must be used within a snackBarContext");
  }
  return context;
};
