import {gql, useLazyQuery} from "@apollo/client";

const CURRENT_NAMES_OWNERSHP_COUNT_QUERY = gql`
  query current_token_ownerships_count(
    $owner_address: String
    $creator_address: String
  ) {
    current_token_ownerships_aggregate(
      where: {
        owner_address: {_eq: $owner_address}
        creator_address: {_eq: $creator_address}
        aptos_name: {subdomain: {_eq: ""}}
        amount: {_gt: "0"}
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

export function useGetAccountDomainCount() {
  const [getAccountDomainCount, {data}] = useLazyQuery(
    CURRENT_NAMES_OWNERSHP_COUNT_QUERY,
    {
      fetchPolicy: "no-cache",
    },
  );

  function gotTotalDomains(owner_address: string) {
    getAccountDomainCount({
      variables: {
        owner_address,
        creator_address: process.env.REACT_APP_CREATOR_ADDRESS,
      },
    });
  }

  const totalNamesCount =
    data && data.current_token_ownerships_aggregate?.aggregate?.count;

  return {gotTotalDomains, totalNamesCount};
}
