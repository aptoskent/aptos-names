import {Card, CardContent, Stack, Typography} from "@mui/material";

export default function NoSubomainsCard() {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2} mb={2} mt={2}>
          <Typography variant="subtitle1">
            Subdomains that you register or purchase will show up here
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
