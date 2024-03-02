import {AptosClient, MaybeHexString, Types} from "aptos";
import {withResponseError} from "./client";

export const nodeUrl =
  process.env.REACT_APP_NODE_URL || "http://localhost:8080/v1";

export function getAccountResources(requestParameters: {
  address: string;
  ledgerVersion?: number;
}): Promise<Types.MoveResource[]> {
  const client = new AptosClient(nodeUrl);
  const {address, ledgerVersion} = requestParameters;
  let ledgerVersionBig;
  if (ledgerVersion) {
    ledgerVersionBig = BigInt(ledgerVersion);
  }
  return withResponseError(
    client.getAccountResources(address, {ledgerVersion: ledgerVersionBig}),
  );
}

export function getAccountResource(requestParameters: {
  address: string;
  resourceType: string;
  ledgerVersion?: number;
}): Promise<Types.MoveResource> {
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

export function getTableItem(requestParameters: {
  tableHandle: string;
  data: Types.TableItemRequest;
}): Promise<any> {
  const client = new AptosClient(nodeUrl);
  const {tableHandle, data} = requestParameters;
  return withResponseError(client.getTableItem(tableHandle, data));
}

export function getEventsByEventHandle(requestParameters: {
  address: string;
  eventHandleStruct: string;
  fieldName: string;
}) {
  const client = new AptosClient(nodeUrl);
  const {address, eventHandleStruct, fieldName} = requestParameters;
  return withResponseError(
    client.getEventsByEventHandle(address, eventHandleStruct, fieldName, {
      limit: 150,
    }),
  );
}

export function getAccount(requestParameters: {
  address: MaybeHexString;
}): Promise<Types.AccountData> {
  const client = new AptosClient(nodeUrl);
  const {address} = requestParameters;
  return withResponseError(client.getAccount(address));
}
