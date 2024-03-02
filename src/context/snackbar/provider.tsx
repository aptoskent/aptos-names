import {Alert, Snackbar, Typography} from "@mui/material";
import {useState} from "react";
import {initialSnackBarContext, SnackBarContext} from "./context";

interface SnackBarProviderProps {
  children: React.ReactNode;
}

export const SnackBarProvider: React.FC<SnackBarProviderProps> = ({
  children,
}: SnackBarProviderProps) => {
  const [snackBar, setSnackBar] = useState(initialSnackBarContext.snackBar);

  const onSnackBarClose = () => {
    setSnackBar({...snackBar, isOpen: false, message: ""});
  };

  return (
    <SnackBarContext.Provider value={{snackBar, setSnackBar}}>
      <Snackbar
        open={snackBar.isOpen}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        autoHideDuration={10000}
        onClose={onSnackBarClose}
      >
        <Alert
          variant="filled"
          severity={snackBar.severity}
          onClose={onSnackBarClose}
        >
          <Typography variant="inherit">{snackBar.message}</Typography>
        </Alert>
      </Snackbar>
      {children}
    </SnackBarContext.Provider>
  );
};
