// Copyright (c) Aptos
// SPDX-License-Identifier: Apache-2.0

import axios from "axios";
import {RegisterDomainProofChallenge} from "./RegisterDomainProofChallenge";
import {BCS, TxnBuilderTypes, HexString, AptosAccount} from "aptos";
import isRestricted from "./isRestricted";

export default async function verifyAndSign(
  ip: string,
  recaptchaToken: string,
  registerDomainProofChallenge: any,
) {
  // Verify not a restricted ip.
  if (await isRestricted(ip)) {
    return {error: "Restricted IP."};
  }
  // Verify captcha.
  const {data} = await axios.post(
    "https://www.google.com/recaptcha/api/siteverify",
    `secret=${process.env.RECAPTCHA_V2_SECRET_KEY}&response=${recaptchaToken}`,
  );
  if (data.success) {
    const privateKey = process.env.SIGNER_PRIVATE_KEY;
    if (!privateKey) {
      return {error: "Verification error."};
    }
    const contractAddress = process.env.CONTRACT_ADDRESS;
    if (!contractAddress) {
      return {error: "Internal error."};
    }
    const chainId = process.env.CHAIN_ID;
    if (!chainId) {
      return {error: "Internal error. "};
    }
    const signer = new AptosAccount(new HexString(privateKey).toUint8Array());
    const challenge = new RegisterDomainProofChallenge(
      TxnBuilderTypes.AccountAddress.fromHex(contractAddress),
      "verify",
      "RegisterDomainProofChallenge",
      registerDomainProofChallenge.sequenceNumber,
      TxnBuilderTypes.AccountAddress.fromHex(
        registerDomainProofChallenge.registerAddress,
      ),
      registerDomainProofChallenge.domainName,
      Number(chainId),
    );
    const challengeHex = HexString.fromUint8Array(BCS.bcsToBytes(challenge));
    const proof = signer.signHexString(challengeHex);
    return {signedMessage: proof};
  } else {
    // Probably a bot.
    return {error: "You shall not pass!"};
  }
}
