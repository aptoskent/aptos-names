import {
  IconButton,
  FormControl,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import {red} from "@mui/material/colors";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {isValidDomainName, extractAptFromDomainName} from "../utils";

export default function SearchInput(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [nameError, setNameError] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSearchClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    e.preventDefault();
    if (!isValidDomainName(searchTerm)) {
      setNameError(true);
      return;
    }
    setNameError(false);
    search();
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (nameError) {
      setNameError(false);
    }
    const name = e.target.value;
    setSearchTerm(extractAptFromDomainName(name));
  };

  const search = async (): Promise<void> => {
    navigate(`/name/${searchTerm}`);
  };

  const theme = useTheme();

  return (
    <FormControl fullWidth required>
      <form>
        <TextField
          id="outlined-basic"
          placeholder="Search Aptos names"
          aria-label="Search"
          variant="outlined"
          type="text"
          onInput={onInputChange}
          fullWidth
          InputProps={{
            autoComplete: "off",
            autoCorrect: "off",
            autoCapitalize: "off",
            spellCheck: "false",
            style: {
              fontSize: "1.25rem",
              fontWeight: "normal",
              padding: "0.75rem",
            },
            endAdornment: (
              <InputAdornment position="start">
                <IconButton
                  aria-label="search"
                  size="large"
                  type="submit"
                  sx={{
                    fontSize: "2.5rem",
                    color: "black",
                    "&:hover": {background: "transparent"},
                  }}
                  onClick={onSearchClick}
                >
                  <SearchOutlinedIcon
                    fontSize="inherit"
                    sx={{color: `${theme.palette.primary.main}`}}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>
      {nameError && (
        <Typography color={red[500]}>
          Name should have between 3 to 63 characters and contain only:
          lowercase (a-z), numbers (0-9), hyphen (-). A name may not start or
          end with a hyphen
        </Typography>
      )}
    </FormControl>
  );
}
