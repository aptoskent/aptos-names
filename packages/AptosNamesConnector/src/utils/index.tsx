import {AptosClient, Types} from "aptos";
import {withResponseError} from "./client";
import {
  MAINNET_CONTRACT_ADDRESS,
  TESTNET_CONTRACT_ADDRESS,
  MAINNET_NODE_URL,
  TESTNET_NODE_URL,
  Network,
} from "./constants";

/*
extract .apt from <domainName>
myDomain.apt => myDomain

NFT stores the domain name with .apt
The contract table doesn't store it with .apt

This is why we need to extract the .apt
*/
export function extractAptFromDomainName(domainName: string): string {
  return domainName.replace(/\.apt$/, "").toLowerCase();
}

export function getAccountResource(
  requestParameters: {
    address: string;
    resourceType: string;
    ledgerVersion?: number;
  },
  network: string,
): Promise<Types.MoveResource> {
  const nodeUrl = getNodeUrl(network);
  const client = new AptosClient(nodeUrl);
  const {address, resourceType, ledgerVersion} = requestParameters;
  let ledgerVersionBig;
  if (ledgerVersion) {
    ledgerVersionBig = BigInt(ledgerVersion);
  }
  return withResponseError(
    client.getAccountResource(address, resourceType, {
      ledgerVersion: ledgerVersionBig,
    }),
  );
}

/*
A valid Domain Name

1. Should be  >= 3 chars
2. Should be  < 63 chars
3. Only lowercase a-z and 0-9 are allowed, along with -. 
4. A domain may not start or end with a hyphen
*/
export const isValidDomainName = (domainName: string): boolean => {
  if (!domainName) return false;
  if (domainName.length < 3) return false;
  if (domainName.length > 63) return false;
  // only lowercase a-z and 0-9 are allowed, along with -. a domain may not start or end with a hyphen
  if (!/^[a-z\d][a-z\d-]{1,61}[a-z\d]$/.test(domainName)) return false;
  return true;
};
export function getTableItem(
  requestParameters: {
    tableHandle: string;
    data: Types.TableItemRequest;
  },
  network: string,
): Promise<any> {
  const nodeUrl = getNodeUrl(network);
  const client = new AptosClient(nodeUrl);
  const {tableHandle, data} = requestParameters;
  return withResponseError(client.getTableItem(tableHandle, data));
}

/*
This function will take in a domain string and the max length that capped by the
window size, if the string is too long, then it will return the truncated string,
if not, it will return the original string.

for example, if the domain is "myddddddomain" and the max length is 10, it will
return "mydd...main"

 */
export function truncatedDomain(domain: string, maxLength: number): string {
  if (domain.length <= maxLength) {
    return domain;
  }
  const middleLength = maxLength - 3; // Reserve 3 characters for the ellipsis
  const firstPartLength = Math.ceil(middleLength / 2);
  const lastPartLength = Math.floor(middleLength / 2);
  const firstPart = domain.slice(0, firstPartLength);
  const lastPart = domain.slice(-lastPartLength);
  return `${firstPart}...${lastPart}`;
}
export function getNodeUrl(network: string): string {
  switch (network) {
    case Network.MAINNET:
      return MAINNET_NODE_URL;
    case Network.TESTNET:
      return TESTNET_NODE_URL;
    default:
      return TESTNET_NODE_URL;
  }
}

export function getContractAddress(network: string): string {
  switch (network) {
    case Network.MAINNET:
      return MAINNET_CONTRACT_ADDRESS;
    case Network.TESTNET:
      return TESTNET_CONTRACT_ADDRESS;
    default:
      return TESTNET_CONTRACT_ADDRESS;
  }
}
