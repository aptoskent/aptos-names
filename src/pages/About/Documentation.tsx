import {CopyBlock, dracula} from "react-code-blocks";
import {Box, Container, Stack, Typography} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {useGlobalState} from "../../context";

export default function Documentation() {
  const state = useGlobalState();
  const network = state.networkSupport;

  if (network != "mainnet" && network != "testnet") {
    return null;
  }

  return (
    <Container sx={{pt: 12}}>
      <Grid container spacing={2}>
        <Grid xs={12} md={8}>
          <Typography variant="h1" mb={3}>
            Integrate Aptos Name Service into your app.
          </Typography>
        </Grid>
      </Grid>

      <Typography variant="h5" mb={3} mt={3}>
        Rest API
      </Typography>
      <Stack spacing={8}>
        <Box>
          <Typography variant="h4" sx={{mb: 2}}>
            Convert Address to Primary Name
          </Typography>
          <CopyBlock
            text={`// Replace "0x1234...abcdef" with the address you want to lookup.
const address = "0x1234...abcdef";
const response = await fetch(\`https://www.aptosnames.com/api/${network}/v1/primary-name/\${address}\`);
const { name } = await response.json();`}
            language="js"
            showLineNumbers={true}
            wrapLines
            theme={dracula}
            wrapLongLines={true}
            customStyle={{
              display: "grid",
              overflow: "scroll",
            }}
          />
        </Box>
        <Box>
          <Typography variant="h4" sx={{mb: 2}}>
            Convert Address to Name
          </Typography>
          <CopyBlock
            text={`// Replace "0x1234...abcdef" with the address you want to lookup.
const address = "0x1234...abcdef";
const response = await fetch(\`https://www.aptosnames.com/api/${network}/v1/name/\${address}\`);
const { name } = await response.json();`}
            language="js"
            showLineNumbers={true}
            wrapLines
            theme={dracula}
            wrapLongLines={true}
            customStyle={{
              display: "grid",
              overflow: "scroll",
            }}
          />
        </Box>
        <Box>
          <Typography variant="h4" sx={{mb: 2}}>
            Convert Name to Address
          </Typography>
          {/* TODO: include mainnet here */}
          <CopyBlock
            text={`// Replace "test" with your ANS name.
const name = "test";
const response = await fetch(\`https://www.aptosnames.com/api/${network}/v1/address/\${name}\`);
const { address } = await response.json();`}
            language="js"
            showLineNumbers={true}
            wrapLines
            theme={dracula}
            wrapLongLines={true}
            customStyle={{
              display: "grid",
              overflow: "scroll",
            }}
          />
        </Box>
      </Stack>
    </Container>
  );
}
