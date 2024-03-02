import {gql, useLazyQuery} from "@apollo/client";
import {useState} from "react";
import {
  CurrentNamesOwnership,
  CurrentNamesOwnershipQuery,
} from "../../../../../utils/types";

const CURRENT_SUBDOMAINS_OWNERSHP_QUERY = gql`
  query current_token_ownerships(
    $owner_address: String
    $creator_address: String
    $offset: Int
  ) {
    current_token_ownerships(
      where: {
        owner_address: {_eq: $owner_address}
        creator_address: {_eq: $creator_address}
        aptos_name: {subdomain: {_neq: ""}}
        amount: {_gt: "0"}
      }
      order_by: {aptos_name: {expiration_timestamp: asc}}
      offset: $offset
    ) {
      name
      aptos_name {
        registered_address
        domain
        expiration_timestamp
        subdomain
      }
    }
  }
`;

export function useGetAccountSubomains() {
  const [subdomains, setSubdomains] = useState<CurrentNamesOwnership[]>();
  const [getAccountSubdomains, {loading, fetchMore}] =
    useLazyQuery<CurrentNamesOwnershipQuery>(
      CURRENT_SUBDOMAINS_OWNERSHP_QUERY,
      {
        fetchPolicy: "no-cache",
      },
    );

  function gotSubdomains(owner_address: string, offset: number) {
    getAccountSubdomains({
      variables: {
        owner_address,
        creator_address: process.env.REACT_APP_CREATOR_ADDRESS,
        offset,
      },
    }).then((data) => setSubdomains(data.data.current_token_ownerships));
  }

  function fetchMoreSubdomains(owner_address: string, offset: number) {
    fetchMore({
      variables: {
        owner_address,
        creator_address: process.env.REACT_APP_CREATOR_ADDRESS,
        offset,
      },
    }).then((data) => {
      const moreNames = subdomains.concat(data.data.current_token_ownerships);
      setSubdomains(moreNames);
    });
  }

  return {gotSubdomains, fetchMoreSubdomains, loading, subdomains};
}
