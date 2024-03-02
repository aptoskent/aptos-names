import {Container, Typography} from "@mui/material";
import {colors as colors} from "@mui/material";

type UnavailableDomainNameProps = {
  domain: string;
};
export default function UnavailableDomainName({
  domain,
}: UnavailableDomainNameProps) {
  return (
    <Container>
      <Typography color={colors.grey[700]}>
        <li>{domain}.apt is not available</li>
      </Typography>
    </Container>
  );
}
