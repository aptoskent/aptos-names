import {useLocation, useParams} from "react-router-dom";
import {gql, useLazyQuery} from "@apollo/client";

import {extractAptFromDomainName, isValidDomainName} from "../../utils";
import {useGlobalState} from "../../context";
import {useEffect} from "react";
import DomainNameRegister from "./DomainNameRegister";
import DomainNameInfo from "./DomainNameInfo";
import InvalidDomainName from "./Components/InvalidDomainName";
import LoadingModal from "../../components/LoadingModal";

type DomainNameURLParams = {
  domain: string;
};

const CURRENT_ANS_LOOKUP_QUERY = gql`
  query current_ans_lookup($domain: String, $creator_address: String) {
    current_ans_lookup(where: {domain: {_eq: $domain}, subdomain: {_eq: ""}}) {
      registered_address
      expiration_timestamp
      domain
      all_token_ownerships(
        where: {amount: {_gt: "0"}, creator_address: {_eq: $creator_address}}
      ) {
        owner_address
      }
    }
  }
`;

export default function DomainName(): JSX.Element {
  let {domain} = useParams() as DomainNameURLParams;
  const location = useLocation();
  const state = useGlobalState();

  const domainName = extractAptFromDomainName(domain);

  const [isDomainAvailable, {loading, error, data}] = useLazyQuery(
    CURRENT_ANS_LOOKUP_QUERY,
    {fetchPolicy: "no-cache"},
  );

  useEffect(() => {
    if (state.tableHandle) {
      isDomainAvailable({
        variables: {
          domain: domainName,
          creator_address: process.env.REACT_APP_CREATOR_ADDRESS,
        },
      });
    }
  }, [state, domain, location]);

  if (!isValidDomainName(domainName)) {
    return <InvalidDomainName domain={domain} />;
  }

  if (loading) {
    return <LoadingModal open={loading} />;
  }

  if (data && data.current_ans_lookup.length === 0) {
    return <DomainNameRegister />;
  }

  return data && <DomainNameInfo domain={data.current_ans_lookup[0]} />;
}
