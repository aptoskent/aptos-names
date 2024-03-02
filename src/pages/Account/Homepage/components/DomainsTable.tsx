import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {useWallet} from "@aptos-labs/wallet-adapter-react";
import {Navigate} from "react-router-dom";
import GeneralTableHeaderCell from "../../../../components/GeneralTableHeaderCell";
import DomainTableRow from "./DomainTableRow";
import {CurrentNamesOwnership} from "../../../../utils/types";

type DomainsTableProps = {
  domains: CurrentNamesOwnership[];
};

export default function DomainsTable({
  domains,
}: DomainsTableProps): JSX.Element {
  const {account} = useWallet();

  if (!account) {
    return <Navigate to="/" />;
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <colgroup>
          <col style={{width: "40%"}} />
          <col style={{width: "20%"}} />
          <col style={{width: "20%"}} />
          <col style={{width: "40%"}} />
        </colgroup>
        <TableHead>
          <TableRow>
            <GeneralTableHeaderCell header="Aptos Name" />
            <GeneralTableHeaderCell header="Target Address" />
            <GeneralTableHeaderCell header="Expiration" textAlignRight={true} />
            <GeneralTableHeaderCell header="Actions" textAlignRight={true} />
          </TableRow>
        </TableHead>
        <TableBody>
          {domains.map((domain) => (
            <DomainTableRow
              key={domain.aptos_name.domain}
              domain={domain.aptos_name}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
