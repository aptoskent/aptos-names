import {Box, Button, CircularProgress, Modal, Stack} from "@mui/material";
import {useRef, useState} from "react";
import ReCAPTCHA from "react-google-recaptcha";

type CaptchaV2RegisterModalProps = {
  handleClose: () => void;
  modalOpen: boolean;
  onRegister: (recaptchaToken: string, onDone: () => void) => void;
  transactionInProcess: boolean;
};

export default function CaptchaV2RegisterModal({
  handleClose,
  modalOpen,
  onRegister,
  transactionInProcess,
}: CaptchaV2RegisterModalProps): JSX.Element {
  const [recaptchaToken, setRecaptchaToken] = useState<string>();
  const recaptchaRef = useRef<ReCAPTCHA>();

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    py: 4,
    px: 8,
  };

  return (
    <Modal
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby="wallet selector modal"
      aria-describedby="select a wallet to connect"
    >
      <Box sx={style}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={4}
        >
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.REACT_APP_RECAPTCHA_V2_SITE_KEY}
            onChange={(value: string) => {
              setRecaptchaToken(value);
            }}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => {
              onRegister(recaptchaToken, () => recaptchaRef?.current?.reset());
            }}
            disabled={!recaptchaToken}
          >
            {transactionInProcess ? (
              <CircularProgress size={20} sx={{color: "black"}} />
            ) : (
              "Register"
            )}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
