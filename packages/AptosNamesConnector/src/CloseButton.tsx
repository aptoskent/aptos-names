import {CloseOutlined as CloseOutlinedIcon} from "@mui/icons-material";
import {colors} from "@mui/material";

type CloseButtonProps = {
  onClick: () => void;
};

export default function CloseButton({onClick}: CloseButtonProps) {
  const mode = localStorage.getItem("color_scheme");
  return (
    <CloseOutlinedIcon
      style={{
        position: "absolute",
        top: 10,
        right: 10,
        border: "none",
        color: `${mode == "light" ? colors.grey[900] : colors.grey[50]}`,
        background: "none",
        cursor: "pointer",
        fontSize: "1.5rem",
      }}
      onClick={onClick}
    />
  );
}
