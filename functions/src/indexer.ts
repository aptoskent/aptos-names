// Copyright (c) Aptos
// SPDX-License-Identifier: Apache-2.0

import {GraphQLClient} from "graphql-request";
import {getSdk} from "./generated/indexer/sdk";

const INDEXER_GRAPHQL_ENDPOINT =
  process.env.INDEXER_GRAPHQL_ENDPOINT ?? "http://localhost:3333/v1/graphql";

const indexerClient = new GraphQLClient(INDEXER_GRAPHQL_ENDPOINT);
const indexer = getSdk(indexerClient);

export async function getAddressFromName(subdomain: string, domain: string) {
  const result = await indexer.getCurrentAddressFromName({subdomain, domain});
  return result.current_ans_lookup[0]?.registered_address;
}

export async function getNameFromAddress(address: string) {
  if (Number(address) <= Number("0xa")) {
    return;
  }
  const result = await indexer.getCurrentNameFromAddress({address});
  const subdomain = result.current_ans_lookup[0]?.subdomain;
  const domain = result.current_ans_lookup[0]?.domain;
  if (subdomain) {
    return `${subdomain}.${domain}`;
  }
  return domain;
}
