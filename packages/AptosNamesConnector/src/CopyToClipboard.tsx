import {Tooltip} from "@mui/material";
import {useState} from "react";
import {CopyToClipboard as ReactCopyToClipboard} from "react-copy-to-clipboard";

type CopyTooltipProps = {
  children: any;
  textToCopy: string;
};

export default function CopyToClipboard({
  textToCopy,
  children,
}: CopyTooltipProps): JSX.Element {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  const onCopyClick = () => {
    handleTooltipOpen();
  };

  const handleTooltipOpen = () => {
    setTooltipOpen(true);

    setTimeout(() => {
      handleTooltipClose();
    }, 1000);
  };

  return (
    <ReactCopyToClipboard text={textToCopy} onCopy={onCopyClick}>
      <Tooltip
        open={tooltipOpen}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        title="Copied"
      >
        {children}
      </Tooltip>
    </ReactCopyToClipboard>
  );
}
