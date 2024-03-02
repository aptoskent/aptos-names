import {gql, useLazyQuery} from "@apollo/client";
import {useState} from "react";
import {
  CurrentNamesOwnership,
  CurrentNamesOwnershipQuery,
} from "../../../../../utils/types";

const CURRENT_NAMES_OWNERSHP_QUERY = gql`
  query current_token_ownerships(
    $owner_address: String
    $creator_address: String
    $offset: Int
  ) {
    current_token_ownerships(
      where: {
        owner_address: {_eq: $owner_address}
        creator_address: {_eq: $creator_address}
        aptos_name: {subdomain: {_eq: ""}}
        amount: {_gt: "0"}
      }
      order_by: {aptos_name: {expiration_timestamp: asc}}
      offset: $offset
    ) {
      aptos_name {
        registered_address
        domain
        expiration_timestamp
        subdomain
      }
    }
  }
`;

export function useGetAccountDomains() {
  const [names, setNames] = useState<CurrentNamesOwnership[]>();
  const [getAccountDomain, {loading, fetchMore, data}] =
    useLazyQuery<CurrentNamesOwnershipQuery>(CURRENT_NAMES_OWNERSHP_QUERY, {
      fetchPolicy: "no-cache",
    });

  function gotDomains(owner_address: string, offset: number) {
    getAccountDomain({
      variables: {
        owner_address,
        creator_address: process.env.REACT_APP_CREATOR_ADDRESS,
        offset,
      },
    }).then((data) => setNames(data.data.current_token_ownerships));
  }

  function fetchMoreDomains(owner_address: string, offset: number) {
    fetchMore({
      variables: {
        owner_address,
        creator_address: process.env.REACT_APP_CREATOR_ADDRESS,
        offset,
      },
    }).then((data) => {
      const moreNames = names.concat(data.data.current_token_ownerships);
      setNames(moreNames);
    });
  }

  return {gotDomains, fetchMoreDomains, loading, names};
}
