import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import GeneralTableHeaderCell from "../../../../components/GeneralTableHeaderCell";
import {CurrentNamesOwnership} from "../../../../utils/types";
import SubdomainTableRow from "./SubdomainTableRow";

type SubdomainsTableProps = {
  subdomains: CurrentNamesOwnership[];
};

export default function SubdomainsTable({subdomains}: SubdomainsTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <GeneralTableHeaderCell header="Subdomain Name" />
            <GeneralTableHeaderCell header="Target Address" />
            <GeneralTableHeaderCell header="Expiration" textAlignRight={true} />
            <GeneralTableHeaderCell header="Manage" textAlignRight={true} />
          </TableRow>
        </TableHead>
        <TableBody>
          {subdomains.map((domain) => (
            <SubdomainTableRow key={domain.name} domain={domain} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
