import React from "react";
import {
  Box,
  Button,
  Typography,
  Popover,
  IconButton,
  Link,
  useTheme,
} from "@mui/material";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import {walletAddressEllipsis} from "../utils";
import {explorerURL} from "../utils/constant";
import {grey} from "../themes/colors/aptosColorPalette";

interface HashButtonProps {
  address: string;
}

export default function HashButton({address}: HashButtonProps): JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const theme = useTheme();

  const hashExpand = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const hashCollapse = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box>
      <Button
        sx={{
          textTransform: "none",
          backgroundColor: `${
            theme.palette.mode === "dark" ? grey[700] : grey[100]
          }`,
          display: "flex",
          borderRadius: 1,
          color: "inherit",
          padding: "0.15rem 0.5rem 0.15rem 1rem",
          "&:hover": {
            backgroundColor: `${
              theme.palette.mode === "dark" ? grey[700] : grey[100]
            }`,
          },
        }}
        aria-describedby={id}
        onClick={hashExpand}
        endIcon={<ChevronRightRoundedIcon sx={{opacity: "0.75", m: 0}} />}
      >
        {walletAddressEllipsis(address)}
      </Button>

      <Popover
        onClick={(e) => {
          e.stopPropagation();
        }}
        sx={{
          overflow: "scroll",
          ".MuiPaper-root": {boxShadow: "none"},
          "&.MuiModal-root .MuiBackdrop-root": {
            transition: "none!important",
            backgroundColor: `${
              theme.palette.mode === "dark"
                ? "rgba(18,22,21,0.5)"
                : "rgba(255,255,255,0.5)"
            }`,
          },
        }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={hashCollapse}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
      >
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: `${
              theme.palette.mode === "dark" ? grey[700] : grey[100]
            }`,
            px: 2,
            py: "0.15rem",
            fontSize: "14px",
            overflow: "scroll",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Link
            href={`${explorerURL}/account/${address}`}
            target="_blank"
            color="inherit"
          >
            {address}
          </Link>
          <IconButton
            aria-label="collapse hash"
            onClick={hashCollapse}
            sx={{
              ml: 1,
              mr: 0,
              p: 0,
              "&.MuiButtonBase-root:hover": {
                bgcolor: "transparent",
              },
            }}
          >
            <ChevronLeftRoundedIcon sx={{opacity: "0.5"}} />
          </IconButton>
        </Typography>
      </Popover>
    </Box>
  );
}
