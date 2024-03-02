import * as RRD from "react-router-dom";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {Button, Link, Typography} from "@mui/material";
import {Fragment, useState} from "react";
import {
  extractAptFromDomainName,
  parseTimestampNoMillisecond,
} from "../../../../utils";
import {CurrentNamesOwnershipAptosName} from "../../../../utils/types";
import AccountAddressButton from "../../../../components/AccountAddressButton";
import {Stack} from "@mui/system";
import useSignAndSubmitTransaction from "../../../../api/useSignAndSubmitTransaction";
import {CONTRACT_ADDRESS} from "../../../../utils/constant";
import {Types} from "aptos";
import {usePrimaryName} from "../../../../context/primaryName/context";
import LoadingModal from "../../../../components/LoadingModal";

type AccountTableRowProps = {
  domain: CurrentNamesOwnershipAptosName;
};

export default function DomainTableRow({
  domain,
}: AccountTableRowProps): JSX.Element {
  const {
    primaryName,
    refreshPrimaryName,
    setPrimaryName,
    isPrimaryNamesFeatureEnabled,
    transactionInProcess,
  } = usePrimaryName();
  const [showPrimaryNameElement, setShowPrimaryNameElement] = useState(false);
  const navigate = RRD.useNavigate();
  const address = domain.registered_address;
  const isPrimaryName = primaryName?.domain_name === domain.domain;

  const onDomainNameClick = (domainName: string) => {
    const name = extractAptFromDomainName(domainName);
    navigate(`/name/${name}`);
  };

  const handleManageClick = (domainName: string) => {
    const name = extractAptFromDomainName(domainName);
    navigate(`${name}/manage`);
  };

  return (
    <Fragment>
      <LoadingModal open={transactionInProcess} />
      <TableRow
        hover
        onMouseEnter={() => setShowPrimaryNameElement(true)}
        onMouseLeave={() => setShowPrimaryNameElement(false)}
      >
        <TableCell>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              textTransform="none"
              variant="body1"
              component={Link}
              sx={{cursor: "pointer"}}
              onClick={() => onDomainNameClick(domain.domain)}
            >
              {`${domain.domain.toLowerCase()}.apt`}
            </Typography>
            {!isPrimaryName &&
              showPrimaryNameElement &&
              isPrimaryNamesFeatureEnabled && (
                <Button
                  variant="contained"
                  size="small"
                  disableElevation={true}
                  sx={{
                    borderRadius: "12px",
                    fontSize: "8px",
                    fontWeight: "500",
                    opacity: "45%",
                    bgcolor: "#CCFBF1",
                    color: "#0F766E",
                    "&:hover": {
                      boxShadow: "inset 0px 0px 0px 1px #02858D",
                      bgcolor: "#CCFBF1",
                    },
                  }}
                  onClick={() =>
                    setPrimaryName(domain.subdomain, domain.domain)
                  }
                >
                  Set As Primary Name
                </Button>
              )}
            {isPrimaryName && isPrimaryNamesFeatureEnabled && (
              <Button
                variant="contained"
                size="small"
                disableElevation={true}
                sx={{
                  borderRadius: "12px",
                  fontSize: "8px",
                  fontWeight: "500",
                  bgcolor: "#CCFBF1",
                  color: "#0F766E",
                  "&:hover": {
                    bgcolor: "#CCFBF1",
                    cursor: "default",
                  },
                }}
              >
                Primary Name
              </Button>
            )}
          </Stack>
        </TableCell>
        <TableCell align="left">
          {address ? <AccountAddressButton address={address} /> : "-"}
        </TableCell>
        <TableCell align="right">
          {parseTimestampNoMillisecond(domain.expiration_timestamp + "Z")}
        </TableCell>
        <TableCell align="right">
          <Button
            variant="contained"
            onClick={() => handleManageClick(domain.domain)}
          >
            Manage
          </Button>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}
