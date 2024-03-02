import {colors, Container, Typography} from "@mui/material";

export default function InvalidDomainName() {
  const mode = localStorage.getItem("color_scheme");
  const color = `${mode == "light" ? colors.grey[700] : colors.grey[50]}`;
  return (
    <Container>
      <Typography color={color}>
        <li> Must between 3 to 63 characters </li>
        <li> Contains only lowercase (a-z), numbers (0-9), hyphen (-) </li>
        <li> Cannot start or end with a hyphen (-)`;</li>
      </Typography>
    </Container>
  );
}
