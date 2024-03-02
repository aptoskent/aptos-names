import {Box} from "@mui/material";
import React from "react";
import {useLocation} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export default function AptosNamesLayout({children}: LayoutProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
      }}
    >
      <Box
        sx={{
          backgroundColor: "transparent",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          flex: "1 1 0%",
        }}
      >
        <Header />
        <Box
          component="main"
          sx={{
            padding: 0,
            flex: "1 1 0%",
          }}
        >
          {children}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}
