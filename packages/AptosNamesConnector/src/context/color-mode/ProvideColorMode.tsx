import {ThemeProvider} from "@mui/styles";
import {FC, ReactNode, useContext, createContext} from "react";
import useProvideColorMode, {ColorModeContext} from "./ProvideColorMode.State";

interface ProvideColorModeProps {
  children: ReactNode;
}

const colorModeContext = createContext<ColorModeContext | null>(null);

export const ProvideColorMode: FC<ProvideColorModeProps> = ({
  children,
}: ProvideColorModeProps) => {
  const {toggleColorMode, theme} = useProvideColorMode();

  return (
    <colorModeContext.Provider value={{toggleColorMode}}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </colorModeContext.Provider>
  );
};

export const useColorMode = (): ColorModeContext => {
  const context = useContext(colorModeContext) as ColorModeContext;
  if (!context) {
    throw new Error("useColorMode must be used within a ColorModeContext");
  }
  return context;
};
