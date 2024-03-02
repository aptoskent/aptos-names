import * as Types from "./types";

export type GetCurrentAddressFromNameQueryVariables = Types.Exact<{
  subdomain: Types.Scalars["String"];
  domain: Types.Scalars["String"];
}>;

export type GetCurrentAddressFromNameQuery = {
  __typename?: "query_root";
  current_ans_lookup: Array<{
    __typename?: "current_ans_lookup";
    registered_address?: string | null;
  }>;
};

export type GetCurrentNameFromAddressQueryVariables = Types.Exact<{
  address: Types.Scalars["String"];
}>;

export type GetCurrentNameFromAddressQuery = {
  __typename?: "query_root";
  current_ans_lookup: Array<{
    __typename?: "current_ans_lookup";
    domain: string;
    subdomain: string;
  }>;
};
