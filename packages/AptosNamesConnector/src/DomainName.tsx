import {Box, IconButton, Stack, Typography} from "@mui/material";
import {ContentCopy as ContentCopyIcon} from "@mui/icons-material";
import CopyToClipboard from "./CopyToClipboard";
import {colors as colors} from "@mui/material";
import {truncatedDomain} from "./utils";

type DomainNameProps = {
  domain: string;
  text?: string;
};
export default function DomainName({
  domain,
  text,
}: DomainNameProps): JSX.Element {
  // the max domain name length for the current modal size
  const maxLength = 11;
  const truncated_domain = truncatedDomain(domain, maxLength);
  return (
    <Box>
      <Stack direction="row">
        <Typography
          sx={{typography: {xs: "h5"}, wordBreak: "break-all"}}
          mr={2}
        >
          {truncated_domain}.apt
        </Typography>
        <CopyToClipboard textToCopy={domain ? `${domain}.apt` : ""}>
          <IconButton>
            <ContentCopyIcon sx={{opacity: "0.5"}} />
          </IconButton>
        </CopyToClipboard>
      </Stack>
      {text && (
        <Typography
          color={text === "Available" ? colors.green["A400"] : colors.red[400]}
        >
          {text}
        </Typography>
      )}
    </Box>
  );
}
