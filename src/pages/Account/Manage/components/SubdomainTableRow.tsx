import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {IconButton, Typography} from "@mui/material";
import {Fragment, useState} from "react";
import AccountAddressButton from "../../../../components/AccountAddressButton";
import {parseTimestampNoMillisecond} from "../../../../utils";
import SubdomainSettingsCollapse from "./subdomainSettingsCollapse";
import {CurrentNamesOwnership} from "../../../../utils/types";

type AccountTableRowProps = {
  domain: CurrentNamesOwnership;
};

export default function SubdomainTableRow({
  domain,
}: AccountTableRowProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState<string | undefined>(
    domain.aptos_name.registered_address,
  );

  return (
    <Fragment>
      <TableRow>
        <TableCell>
          <Typography variant="body1" color="primary">
            {domain.name.toLowerCase()}
          </Typography>
        </TableCell>
        <TableCell align="left">
          {address ? <AccountAddressButton address={address} /> : "-"}
        </TableCell>
        <TableCell align="right">
          {parseTimestampNoMillisecond(
            domain.aptos_name.expiration_timestamp + "Z",
          )}
        </TableCell>
        <TableCell align="right">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={4} style={{paddingBottom: 0, paddingTop: 0}}>
          <SubdomainSettingsCollapse
            domainName={domain.name}
            setAddress={setAddress}
            open={open}
            setOpen={setOpen}
          />
        </TableCell>
      </TableRow>
    </Fragment>
  );
}
