import {Box, Container, Typography} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import SearchInput from "../../components/SearchInput";
import {ReactComponent as TextureTopo} from "../../assets/svg/texture_topo.svg";
import {PlaygroundBanner} from "./PlaygroundBanner";

export default function Homepage(): JSX.Element {
  return (
    <>
      <Box sx={{paddingX: "1.5rem"}}>
        <PlaygroundBanner />
      </Box>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            py: 20,
            position: "relative",
            overflowX: "hidden",
          }}
        >
          <Container>
            <Grid
              container
              spacing={{xs: 1, md: 4}}
              sx={{
                mb: 4,
              }}
            >
              <Grid xs={12} md={6} lg={6}>
                <Typography variant="h1" fontWeight="bold">
                  Your Aptos identity starts here.
                </Typography>
              </Grid>
              <Grid
                xs={12}
                md={6}
                lg={6}
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.5rem",
                    color: "text.secondary",
                  }}
                >
                  Secure your{" "}
                  <Typography
                    component="strong"
                    variant="inherit"
                    sx={{color: "text.primary", fontSize: "1.75rem"}}
                  >
                    .apt
                  </Typography>{" "}
                  domain for your journey through the Aptos ecosystem.
                </Typography>
              </Grid>
            </Grid>
            <SearchInput />
          </Container>
          <TextureTopo />
        </Box>
      </Box>
    </>
  );
}
