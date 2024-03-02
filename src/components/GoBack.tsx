import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import {Typography, useTheme} from "@mui/material";
import {primary} from "../themes/colors/aptosColorPalette";

function BackButton(handleClick: () => void) {
  const theme = useTheme();
  return (
    <>
      <Button
        color="primary"
        variant="text"
        onClick={handleClick}
        sx={{
          mb: 2,
          p: 0,
          "&:hover": {
            background: "transparent",
          },
        }}
        startIcon={<ArrowBackRoundedIcon color="primary" />}
      >
        <Typography color="primary">Back</Typography>
      </Button>
    </>
  );
}

type GoBackProps = {
  to?: string;
};

export default function GoBack({to}: GoBackProps): JSX.Element | null {
  const navigate = useNavigate();

  if (window.history.state && window.history.state.idx > 0) {
    return BackButton(() => {
      navigate(-1);
    });
  } else {
    if (to != null) {
      return BackButton(() => {
        navigate(to);
      });
    } else {
      return null;
    }
  }
}
