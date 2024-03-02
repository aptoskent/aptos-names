import {
  Box,
  Modal,
  Typography,
  useTheme,
  IconButton,
  FormControl,
  InputAdornment,
  TextField,
} from "@mui/material";
import {Unstable_Grid2 as Grid} from "@mui/material";
import {SearchOutlined as SearchOutlinedIcon} from "@mui/icons-material";

import {useEffect, useState, useContext} from "react";
import {isValidDomainName, extractAptFromDomainName} from "./utils";
import DomainNameRegister from "./DomainNameRegister";
import {isDomainAvailable} from "./isDomainAvailable";
import UnavailableDomainName from "./UnavailableDomainName";
import InvalidDomainName from "./InvalidDomainName";
import CloseButton from "./CloseButton";
import {getContractAddress, getAccountResource} from "./utils";
import {ConnectorContext} from "./context/ConnectorContext";
import {colors as colors} from "@mui/material";

type AptosNamesModalProps = {
  handleClose: () => void;
  modalOpen: boolean;
};

export type namesRegistryData = {
  registry: {
    handle: string;
  };
};

export default function AptosNamesModal({
  handleClose,
  modalOpen,
}: AptosNamesModalProps): JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [nameError, setNameError] = useState<boolean>(false);
  const [domainAvailable, setDomainAvailable] = useState<boolean>(true);
  const [showNameRegister, setShowNameRegister] = useState<boolean>(false);
  const [showDomainUnavailable, setShowDomainUnavailable] =
    useState<boolean>(false);
  const [tableHandle, setTableHandle] = useState<string>("");
  const {network} = useContext(ConnectorContext);
  const contract_address = getContractAddress(network);

  useEffect(() => {
    const getTableHandle = async () => {
      const accountResource = await getAccountResource(
        {
          address: contract_address,
          resourceType: `${contract_address}::domains::NameRegistryV1`,
        },
        network,
      );

      const nameRegistryData = accountResource.data as namesRegistryData;
      return nameRegistryData.registry.handle;
    };

    Promise.all([getTableHandle()]).then((data) => {
      setTableHandle(data[0]);
    });

    if (tableHandle) {
      isDomainAvailable(searchTerm, tableHandle, network).then(
        setDomainAvailable,
      );
    }
  }, [searchTerm]);
  const onSearchClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    e.preventDefault();
    if (!isValidDomainName(searchTerm)) {
      setNameError(true);
      return;
    }
    if (domainAvailable) {
      setShowNameRegister(true);
    } else {
      setShowDomainUnavailable(true);
    }
    setNameError(false);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (nameError) {
      setNameError(false);
    }
    const name = e.target.value;
    setSearchTerm(extractAptFromDomainName(name));
    setShowNameRegister(false);
    setShowDomainUnavailable(false);
  };

  const theme = useTheme();
  const mode = localStorage.getItem("color_scheme");

  const style = {
    display: "flex",
    flexDirection: "column",
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 700,
    backgroundColor: `${mode == "light" ? colors.grey[50] : colors.grey[900]}`,
    borderRadius: `${theme.shape.borderRadius}px`,
    boxShadow: 24,
    p: 3,
  };

  return (
    <Modal
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby="aptos name connector modal"
      aria-describedby="modal to search/mint names on aptos"
    >
      <Box sx={style}>
        <CloseButton onClick={handleClose} />
        <Box
          sx={{
            display: "flex",
            gap: 0.5,
            alignItems: "center",
            justifyContent: "center",
            mb: 4,
          }}
        >
          <Typography align="center" variant="h5" pt={2}>
            Search Aptos Names
          </Typography>
        </Box>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
        >
          <FormControl fullWidth required>
            <form>
              <TextField
                id="outlined-basic"
                placeholder="Search for a name..."
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
            <br />
            {nameError && <InvalidDomainName />}
            {showDomainUnavailable && (
              <UnavailableDomainName domain={searchTerm} />
            )}
            {showNameRegister && <DomainNameRegister name={searchTerm} />}
          </FormControl>
        </Grid>
      </Box>
    </Modal>
  );
}
