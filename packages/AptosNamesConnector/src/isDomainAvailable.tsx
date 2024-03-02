import {getTableItem} from "./utils";
import {ResponseErrorType} from "./utils/client";
import {getContractAddress} from "./utils";

export const isDomainAvailable = async (
  domainName: string,
  handle: string,
  network: string,
): Promise<boolean> => {
  const contract_address = getContractAddress(network);
  const domainsTableItemRequest = {
    key_type: `${contract_address}::domains::NameRecordKeyV1`,
    value_type: `${contract_address}::domains::NameRecordV1`,
    key: {
      subdomain_name: {vec: []},
      domain_name: domainName,
    },
  };
  try {
    await getTableItem(
      {
        tableHandle: handle,
        data: domainsTableItemRequest,
      },
      network,
    );
  } catch (e: any) {
    if ("type" in e && e.type === ResponseErrorType.NOT_FOUND) {
      // fetchTableItem returns a 404 error if the item does not exist, which
      // means that the item is available, therefore return `true`
      return true;
    }
    return false;
  }
  // return `false` if the item exists, which means that the item is not available
  return false;
};
