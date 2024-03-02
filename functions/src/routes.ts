// Copyright (c) Aptos
// SPDX-License-Identifier: Apache-2.0

import {AptosClient} from "aptos";
import {Router, Request} from "express";
import generateNameImage from "./generateNameImage";
import {getAddressFromName, getNameFromAddress} from "./indexer";
import {parseQueryAddress, parseQueryName} from "./middlewares";
import verifyAndSign from "./verifyAndSign";

export const nodeUrl = process.env.NODE_URL || "http://localhost:8080/v1";

const ALLOWED_VERIFY_ORIGINS = [
  "www.aptosnames.com",
  "aptosnames.com",
  "localhost:3000",
];

const client = new AptosClient(nodeUrl);

function getIp(req: Request): string {
  let ips = (
    req.header("cf-connecting-ip") ||
    req.header("x-real-ip") ||
    req.header("x-forwarded-for") ||
    req.socket.remoteAddress ||
    ""
  ).split(",");
  return ips[0].trim();
}

const router = Router();

router.get("/address/:name", parseQueryName, async (req, res) => {
  const {domain, subdomain} = res.locals;
  const address = await getAddressFromName(subdomain, domain);
  if (address) {
    res.send({address});
  } else {
    res.send({});
  }
});

router.get("/primary-name/:address", parseQueryAddress, async (req, res) => {
  const address = res.locals.address.toString();
  try {
    const lookup = await client.getTableItem(
      process.env.REVERSE_LOOKUP_REGISTRY_V1_TABLE_HANDLE || "",
      {
        key_type: "address",
        value_type: `${process.env.CONTRACT_ADDRESS}::domains::NameRecordKeyV1`,
        key: address,
      },
    );
    const subdomain = lookup?.subdomain_name?.vec?.[0];
    if (subdomain) {
      res.send({name: `${subdomain}.${lookup.domain_name}`});
    } else {
      res.send({name: `${lookup.domain_name}`});
    }
  } catch (e) {
    res.send({});
  }
});

router.get("/name/:address", parseQueryAddress, async (req, res) => {
  const address = res.locals.address.toString();
  const name = await getNameFromAddress(address);
  if (name) {
    res.send({name});
  } else {
    res.send({});
  }
});

router.get("/metadata/:name", parseQueryName, async (req, res) => {
  const {name} = res.locals;
  const nameWithSuffix = `${name}.apt`;

  const host =
    req.header("X-Forwarded-Host") ?? req.header("Host") ?? req.hostname;
  const protocol = req.header("X-Forwarded-Proto") ?? req.protocol;
  const origin = `${protocol}://${host}`;

  // TODO: make call to chain to see if it's expired or not
  // Returns the metadata json
  res.send({
    name: nameWithSuffix,
    description: `Aptos Name Record: ${nameWithSuffix}.\n Register your name at https://www.aptosnames.com`,
    image: `${origin}${req.baseUrl}/image/${name}`,
    external_url: req.header("Host") ?? req.hostname,
  });
});

router.get("/image/:name", parseQueryName, async (req, res) => {
  // TODO: make call to chain to see if it's expired or not
  const {name} = res.locals;
  const svg = generateNameImage(name);
  res.setHeader("content-type", "image/svg+xml");
  res.status(200).send(svg);
});

router.post("/verify", async (req, res) => {
  const origin = req.get("origin");
  if (ALLOWED_VERIFY_ORIGINS.includes(origin!)) {
    res.set("Access-Control-Allow-Origin", origin);
  }
  const {recaptchaToken, registerDomainProofChallenge} = req.body;
  const result = await verifyAndSign(
    getIp(req),
    recaptchaToken,
    registerDomainProofChallenge,
  );
  res.status(200).send(result);
});

export default router;
