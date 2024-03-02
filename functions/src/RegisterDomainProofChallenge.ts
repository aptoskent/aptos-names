// Copyright (c) Aptos
// SPDX-License-Identifier: Apache-2.0

import {BCS, TxnBuilderTypes} from "aptos";

export class RegisterDomainProofChallenge {
  constructor(
    public readonly accountAddress: TxnBuilderTypes.AccountAddress,
    public readonly moduleName: string,
    public readonly structName: string,
    public readonly sequenceNumber: number | bigint,
    public readonly registerAddress: TxnBuilderTypes.AccountAddress,
    public readonly domainName: string,
    public readonly chainId: number,
  ) {}

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
