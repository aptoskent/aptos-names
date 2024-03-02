import {isValidDomainName} from "../../utils";

describe("SearchInput", () => {
  it("validates domain name correctly", () => {
    expect(isValidDomainName("")).toEqual(false);
    expect(isValidDomainName("0")).toEqual(false);
    expect(isValidDomainName("na")).toEqual(false);
    expect(isValidDomainName("0--")).toEqual(false);
    expect(isValidDomainName("-0")).toEqual(false);
    expect(isValidDomainName("0-")).toEqual(false);
    expect(isValidDomainName("-name")).toEqual(false);
    expect(isValidDomainName("name-")).toEqual(false);
    expect(isValidDomainName("-name-")).toEqual(false);
    expect(
      isValidDomainName(
        "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz",
      ),
    ).toEqual(false);

    expect(isValidDomainName("name")).toEqual(true);
    expect(isValidDomainName("na-me")).toEqual(true);
    expect(isValidDomainName("0n-ame")).toEqual(true);
    expect(isValidDomainName("9name")).toEqual(true);
    expect(isValidDomainName("90name")).toEqual(true);
    expect(
      isValidDomainName(
        "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghij",
      ),
    ).toEqual(true);
  });
});
