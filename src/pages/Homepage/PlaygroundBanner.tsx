import {
  Button,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {Statsig} from "statsig-react";
import {grey} from "../../themes/colors/aptosColorPalette";
import {Banner} from "../../components/Banner";

export function PlaygroundBanner() {
  const theme = useTheme();
  const isOnMobile = !useMediaQuery(theme.breakpoints.up("md"));

  const text = "Explore more fun stuff at Web3 Playground!"; // TODO(jill): update the copy

  const learnMoreButton = (
    <Button
      href="https://playground.dev.gcp.aptosdev.com/?utm_source=ans&utm_medium=banner" // TODO(jill): update to the right URL
      variant="text"
      sx={{alignSelf: "flex-start", transform: `translateX(-0.5rem)`}}
    >
      <Typography>LEARN MORE</Typography>
      <ArrowForwardIosIcon sx={{marginLeft: 2}} fontSize="small" />
    </Button>
  );

  const divider = (
    <Divider
      orientation="vertical"
      variant="middle"
      flexItem
      sx={{color: grey[200]}}
    />
  );

  const action = isOnMobile ? null : (
    <>
      {learnMoreButton}
      {divider}
    </>
  );
  const children = isOnMobile ? (
    <Stack direction="column">
      {text}
      {learnMoreButton}
    </Stack>
  ) : (
    <>{text}</>
  );

  const visible = Statsig.checkGate("playground_banner");

  return visible ? (
    <Banner action={action} sx={{marginBottom: 2}}>
      {children}
    </Banner>
  ) : null;
}
