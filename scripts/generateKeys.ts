import {AptosAccount, BCS, HexString, TxnBuilderTypes} from "aptos";

// Run with:
// yarn ts-node --compilerOptions '{"target": "es6", "module": "commonjs", "esModuleInterop": true}'
// ./scripts/generateKeys.ts

const privateKey = "0xb....7";
const contractAddress =
  "0xdbf606fea404cb26efe68d00f8f4fff8e4b9ce69f903818f8acf81473a32430a";
const sequenceNumber = 0;
const userAddress = "0x077";
const domainName = "test";
const chainId = 4;

export class RegisterDomainProofChallenge {
  public readonly accountAddress: TxnBuilderTypes.AccountAddress;

  constructor(
    accountAddress: TxnBuilderTypes.AccountAddress,
    public readonly moduleName: string,
    public readonly structName: string,
    public readonly sequenceNumber: number | bigint,
    public readonly registerAddress: TxnBuilderTypes.AccountAddress,
    public readonly domainName: string,
    public readonly chainId: number,
  ) {
    this.accountAddress = accountAddress;
  }

  serialize(serializer: BCS.Serializer): void {
    this.accountAddress.serialize(serializer);
    serializer.serializeStr(this.moduleName);
    serializer.serializeStr(this.structName);
    serializer.serializeU64(this.sequenceNumber);
    this.registerAddress.serialize(serializer);
    serializer.serializeStr(this.domainName);
    serializer.serializeU8(this.chainId);
  }
}

let signer = new AptosAccount(HexString.ensure(privateKey).toUint8Array());

const challenge = new RegisterDomainProofChallenge(
  TxnBuilderTypes.AccountAddress.fromHex(contractAddress),
  "verify",
  "RegisterDomainProofChallenge",
  sequenceNumber,
  TxnBuilderTypes.AccountAddress.fromHex(userAddress),
  domainName,
  chainId,
);

const bytes = BCS.bcsToBytes(challenge);
const proof = signer.signBuffer(bytes);

console.dir(["challenge bcs", bytes], {maxArrayLength: null});
console.log("public key: ", signer.pubKey());
console.log("challenge: ", challenge);
console.log("signature: ", proof);
