import maxmind, {CityResponse} from "maxmind";
import path from "path";

// Cuba, North Korea, Iran, Syria
const RESTRICTED_COUNTRIES = ["CU", "KP", "IR", "SY"];

// Crimea, Donetsk, Luhansk
const RESTRICTED_REGIONS: Record<string, string[]> = {UA: ["43", "14", "9"]};

function isRestrictedRegion(location: CityResponse): boolean {
  if (!location.subdivisions || !location.country?.iso_code) {
    return false;
  }
  const restrictedRegionsInCountry =
    RESTRICTED_REGIONS[location.country.iso_code.toUpperCase()];
  if (!restrictedRegionsInCountry) {
    return false;
  }

  for (const subdivision of location.subdivisions) {
    if (restrictedRegionsInCountry.includes(subdivision.iso_code)) {
      return true;
    }
  }

  return false;
}

export default async function isRestricted(ip: string): Promise<boolean> {
  const dbPath = path.join(__dirname, process.env.MMDB_FILENAME!);
  const lookup = await maxmind.open<CityResponse>(dbPath!);
  const location = lookup.get(ip);
  if (!location) {
    return false;
  }
  return (
    RESTRICTED_COUNTRIES.includes(location.country?.iso_code ?? "") ||
    isRestrictedRegion(location)
  );
}
