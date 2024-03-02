import AppBar from "@mui/material/AppBar";
import * as RRD from "react-router-dom";

import {ReactComponent as LogoIcon} from "../assets/svg/aptos_logo_full.svg";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Link,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import {WalletConnector} from "@aptos-labs/wallet-adapter-mui-design";
import {useInView} from "react-intersection-observer";

import {useColorMode, useGlobalState} from "../context";
import {ReactComponent as IconLight} from "../assets/svg/icon_light.svg";
import {ReactComponent as IconDark} from "../assets/svg/icon_dark.svg";
import {grey} from "../themes/colors/aptosColorPalette";
import Nav from "../components/Nav";
import NavMobile from "../components/NavMobile";

export default function Header() {
  const {toggleColorMode} = useColorMode();
  const navigate = RRD.useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const {ref, inView} = useInView({
    rootMargin: "-40px 0px 0px 0px",
    threshold: 0,
  });
  const state = useGlobalState();

  return (
    <CssBaseline>
      <Box
        sx={{
          background: "transparent",
          height: "5rem",
          width: "100%",
          position: "absolute",
        }}
        ref={ref}
      ></Box>
      <AppBar
        sx={{
          position: "sticky",
          top: "0",
          borderRadius: "0",
          backdropFilter: "blur(10px)",
          background: "transparent",
          ...(!inView &&
            isDark && {
              background: "rgba(18,22,21, 0.85)",
              borderBottom: `1px solid ${theme.palette.lineShade.main}`,
            }),
          ...(!inView &&
            !isDark && {
              background: "rgba(254,254,254, 0.8)",
              borderBottom: `2px solid rgba(18,22,21,0.05)`,
            }),
        }}
      >
        <Container maxWidth={false}>
          <Toolbar
            disableGutters
            sx={{
              gap: 2,
              height: "5rem",
              color:
                theme.palette.mode === "dark" ? grey[50] : "rgba(18,22,21,1)",
            }}
          >
            <Box
              sx={{
                marginRight: "auto",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Link
                component={RRD.Link}
                to="/"
                color="inherit"
                underline="none"
                sx={{
                  display: "flex",
                  alignItems: "start",
                }}
              >
                <Box
                  sx={{
                    width: {
                      xs: "80px",
                      display: "flex",
                      alignItems: "center",
                    },
                    mr: 1.5,
                  }}
                >
                  <LogoIcon />
                </Box>

                <Typography
                  noWrap
                  sx={{
                    color: "inherit",
                    textDecoration: "none",
                    fontSize: "1rem",
                    fontWeight: "bold",
                  }}
                >
                  Names
                </Typography>
              </Link>
            </Box>
            <Nav />
            <Button
              onClick={toggleColorMode}
              sx={{
                width: "30px",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyItems: "center",
                padding: "0",
                minWidth: "30px",
                marginLeft: "1rem",
                color: "inherit",
                "&:hover": {background: "transparent", opacity: "0.8"},
              }}
            >
              {theme.palette.mode === "light" ? <IconLight /> : <IconDark />}
            </Button>
            <NavMobile />
            <Box sx={{display: {xs: "none", sm: "flex"}}}>
              <WalletConnector
                networkSupport={state.networkSupport}
                handleNavigate={() => navigate("/account")}
              />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </CssBaseline>
  );
}
