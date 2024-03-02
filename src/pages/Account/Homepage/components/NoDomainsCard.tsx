import {Button, Card, CardContent, Stack, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function NoDomainsCard() {
  const navigate = useNavigate();
  return (
    <Card>
      <CardContent>
        <Stack spacing={2} mb={2}>
          <Typography variant="h6">
            Start with Register and Collect Aptos Names today
          </Typography>
          <Typography variant="subtitle1">
            Names that you buy will show up here
          </Typography>
        </Stack>
        <Button size="large" variant="contained" onClick={() => navigate("/")}>
          Browse Names
        </Button>
      </CardContent>
    </Card>
  );
}
