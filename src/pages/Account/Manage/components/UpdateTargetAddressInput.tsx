import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import {red} from "@mui/material/colors";
import {useState} from "react";
import {isValidAccountAddress} from "../../../../utils";

type ManageProps = {
  updateTargetAddress: (newAddress: string) => Promise<void>;
};

export default function UpdateTargetAddressInput({
  updateTargetAddress,
}: ManageProps): JSX.Element {
  const [newAddressError, setNewAddressError] = useState<boolean>(false);
  const [newAddress, setNewAddressInput] = useState<string>("");

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const name = e.target.value;
    setNewAddressInput(name);
  };

  const onUpdateClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): Promise<void> => {
    e.preventDefault();
    if (isValidAccountAddress(newAddress)) {
      setNewAddressError(false);
      updateTargetAddress(newAddress);
    } else {
      setNewAddressError(true);
    }
  };

  return (
    <form>
      <Box>
        <TextField
          id="outlined-basic"
          placeholder="New Target Address"
          variant="outlined"
          autoComplete="off"
          type="text"
          onInput={onInputChange}
          fullWidth
          InputProps={{
            style: {
              padding: 0,
              height: "45px",
            },
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  size="large"
                  type="submit"
                  variant="contained"
                  onClick={onUpdateClick}
                >
                  Update
                </Button>
              </InputAdornment>
            ),
          }}
        />
        {newAddressError && (
          <Typography variant="subtitle2" gutterBottom color={red[500]} mt={2}>
            Invalid Address
          </Typography>
        )}
      </Box>
    </form>
  );
}
