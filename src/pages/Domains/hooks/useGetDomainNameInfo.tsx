import {useEffect, useState} from "react";
import {getTableItem} from "../../../api";
import {useGlobalState} from "../../../context";
import {CONTRACT_ADDRESS} from "../../../utils/constant";

export interface DomainDetails {
  create_time_sec: string;
  expiration_time_sec: string;
  target_address: {
    vec: string[];
  };
}

export const fetchTableItem = async (
  domainName: string,
  handle: string,
): Promise<DomainDetails> => {
  const domainsTableItemRequest = {
    key_type: `${CONTRACT_ADDRESS}::domains::NameRecordKeyV1`,
    value_type: `${CONTRACT_ADDRESS}::domains::NameRecordV1`,
    key: {
      subdomain_name: {vec: []},
      domain_name: domainName,
    },
  };

  const domainDetails = await getTableItem({
    tableHandle: handle,
    data: domainsTableItemRequest,
  });

  return domainDetails;
};
