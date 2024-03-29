import {useMemo, useState} from "react";
import {createTheme, responsiveFontSizes} from "@mui/material";
import getDesignTokens from "../../themes/theme";
import {useMediaQuery as useMediaQuery} from "@mui/material";

export interface ColorModeContext {
  toggleColorMode: () => void;
}

type Mode = "light" | "dark";

const useProvideColorMode = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)", {
    noSsr: true,
  })
    ? "dark"
    : "light";

  const [mode, setMode] = useState<Mode>(
    (localStorage.getItem("color_scheme") as Mode) || prefersDarkMode,
  );

  const toggleColorMode = () => {
    setMode((prevMode) => {
      if (prevMode === "light") {
        localStorage.setItem("color_scheme", "dark");
        return "dark";
      } else {
        localStorage.setItem("color_scheme", "light");
        return "light";
      }
    });
  };

  let theme = useMemo(
    () => responsiveFontSizes(createTheme(getDesignTokens(mode))),
    [mode],
  );

  theme = createTheme(theme, {
    typography: {
      h1: {
        fontSize: "2.5rem",
        [theme.breakpoints.up("sm")]: {
          fontSize: "2.75rem",
        },
        [theme.breakpoints.up("md")]: {
          fontSize: "3.25rem",
        },
        [theme.breakpoints.up("lg")]: {
          fontSize: "3.75rem",
          lineHeight: "1",
        },
      },
    },
  });

  return {toggleColorMode, theme};
};

export default useProvideColorMode;
