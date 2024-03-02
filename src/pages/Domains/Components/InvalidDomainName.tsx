import {Box, Card, CardContent, Container, Typography} from "@mui/material";
import SearchInput from "../../../components/SearchInput";

type InvalidDomainNameProps = {
  domain: string;
};

export default function InvalidDomainName({domain}: InvalidDomainNameProps) {
  return (
    <Container>
      <Box sx={{mt: "5rem"}}>
        <SearchInput />
        <Card sx={{mt: "5rem"}}>
          <CardContent>
            <Typography>
              <Typography component="span" color="red">
                {domain}
              </Typography>{" "}
              is not a valid domain name
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
