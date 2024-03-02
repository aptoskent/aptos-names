import {Box, IconButton, Stack, Typography} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CopyToClipboard from "./CopyToClipboard";
import {green, orange, red} from "@mui/material/colors";

type DomainNameProps = {
  domain: string;
  text?: string;
};

export default function DomainName({
  domain,
  text,
}: DomainNameProps): JSX.Element {
  return (
    <Box>
      <Stack direction="row">
        <Typography
          sx={{typography: {xs: "h4"}, wordBreak: "break-all"}}
          mr={2}
        >
          {domain}.apt
        </Typography>
        <CopyToClipboard textToCopy={domain ? `${domain}.apt` : ""}>
          <IconButton>
            <ContentCopyIcon sx={{opacity: "0.5"}} />
          </IconButton>
        </CopyToClipboard>
      </Stack>
      {text && (
        <Typography color={text === "Available" ? green["A400"] : red[400]}>
          {text}
        </Typography>
      )}
    </Box>
  );
}
