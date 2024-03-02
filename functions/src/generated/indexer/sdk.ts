import * as Types from "./operations";

import {GraphQLClient} from "graphql-request";
import * as Dom from "graphql-request/dist/types.dom";
import gql from "graphql-tag";

export const GetCurrentAddressFromNameDocument = gql`
  query getCurrentAddressFromName($subdomain: String!, $domain: String!) {
    current_ans_lookup(
      where: {subdomain: {_eq: $subdomain}, _and: {domain: {_eq: $domain}}}
    ) {
      registered_address
    }
  }
`;
export const GetCurrentNameFromAddressDocument = gql`
  query getCurrentNameFromAddress($address: String!) {
    current_ans_lookup(where: {registered_address: {_eq: $address}}) {
      domain
      subdomain
    }
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
) => action();

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    getCurrentAddressFromName(
      variables: Types.GetCurrentAddressFromNameQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"],
    ): Promise<Types.GetCurrentAddressFromNameQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<Types.GetCurrentAddressFromNameQuery>(
            GetCurrentAddressFromNameDocument,
            variables,
            {...requestHeaders, ...wrappedRequestHeaders},
          ),
        "getCurrentAddressFromName",
        "query",
      );
    },
    getCurrentNameFromAddress(
      variables: Types.GetCurrentNameFromAddressQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"],
    ): Promise<Types.GetCurrentNameFromAddressQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<Types.GetCurrentNameFromAddressQuery>(
            GetCurrentNameFromAddressDocument,
            variables,
            {...requestHeaders, ...wrappedRequestHeaders},
          ),
        "getCurrentNameFromAddress",
        "query",
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
