import moment from "moment";

export function isValidAccountAddress(accountAddr: string): boolean {
  // account address is 0x{64 hex characters}
  // with multiple options - 0X, 0x001, 0x1, 0x01
  return /^(0[x])?[A-F0-9]{1,64}$/i.test(accountAddr);
}

export function walletAddressEllipsis(address: string): string {
  if (!address) {
    return address;
  }
  return address.slice(0, 4) + "\u2026" + address.slice(-6);
}

export function renderTimestamp(timestamp?: string) {
  if (!timestamp || timestamp === "0") return "-";

  const moment = parseTimestamp(timestamp);
  const timestamp_display = timestampDisplay(moment);

  return <>{timestamp_display.local_formatted}</>;
}

export function ensureMillisecondTimestamp(timestamp: string): number {
  /*
  Could be: 1646458457
        or: 1646440953658538
   */
  if (timestamp.length > 13) {
    timestamp = timestamp.slice(0, 13);
  }
  if (timestamp.length == 10) {
    timestamp = timestamp + "000";
  }
  return parseInt(timestamp);
}

export function parseTimestamp(timestamp: string): moment.Moment {
  return moment(ensureMillisecondTimestamp(timestamp));
}

export interface TimestampDisplay {
  formatted: string;
  local_formatted: string;
  formatted_time_delta: string;
}

export function parseTimestampNoMillisecond(timestamp?: string) {
  if (!timestamp || timestamp === "0") return "-";

  const momentTimestamp = moment(timestamp);
  const timestamp_display = timestampDisplay(momentTimestamp);

  return <>{timestamp_display.local_formatted}</>;
}

export function timestampDisplay(timestamp: moment.Moment): TimestampDisplay {
  return {
    formatted: timestamp.format("MM/DD/YY HH:mm:ss [UTC]"),
    local_formatted: timestamp.local().format("D MMM YYYY HH:mm:ss"),
    formatted_time_delta: timestamp.fromNow(),
  };
}

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

export function extractSubdomainName(subdomainName: string): string {
  const indexOfDot = subdomainName.indexOf(".");
  const tokenName = subdomainName.substring(0, indexOfDot);
  return tokenName;
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

export const yearsToSeconds = (years: number): number => {
  const SECONDS_PER_YEAR = 60 * 60 * 24 * 365;
  return SECONDS_PER_YEAR * years;
};

export const getNowInSeconds = (): number => {
  return Math.floor(new Date().getTime() / 1000);
};
