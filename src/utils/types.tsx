export type Domain = {
  name: string;
  create_time_sec: string;
  expiration_time_sec: string;
  target_address: {
    vec: string[];
  };
};

export type namesRegistryData = {
  registry: {
    handle: string;
  };
};

export type CollectionCapabilityData = {
  capability: {
    account: string;
  };
};

export type CurrentNamesOwnershipAptosName = {
  domain: string;
  expiration_timestamp: string;
  registered_address: string;
  subdomain: string;
};

export type CurrentNamesOwnership = {
  __typename: string;
  name: string;
  aptos_name: CurrentNamesOwnershipAptosName;
};

export type CurrentNamesOwnershipQuery = {
  current_token_ownerships: CurrentNamesOwnership[];
};
