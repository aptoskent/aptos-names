// Copyright (c) Aptos
// SPDX-License-Identifier: Apache-2.0

import {NextFunction, Request, Response} from "express";

// Each name component can only have lowercase letters, number or hyphens, and cannot start or end with a hyphen.
const nameComponentPattern = /^[a-z\d][a-z\d-]{1,61}[a-z\d]$/;

const namePattern = new RegExp(
  "^" +
    // Parse the full name, as well as parts
    "(?<name>" +
    // Optional subdomain (cannot be followed by .apt)
    "(?:(?<subdomain>[^.]+)\\.(?!apt$))?" +
    // Domain
    "(?<domain>[^.]+)" +
    ")" +
    // Optional .apt suffix
    "(?:\\.apt)?" +
    "$",
);

interface ParsedName {
  name: string;
  domain: string;
  subdomain: string;
}

/**
 * Middleware for validating and parsing an Aptos name from the request params
 */
export default function parseQueryName(
  req: Request,
  res: Response<any, ParsedName>,
  next: NextFunction,
) {
  const {name, domain, subdomain} =
    req.params.name.match(namePattern)?.groups ?? {};
  if (name === undefined) {
    res.send({});
    // res.status(400).send({ error: 'Invalid name' });
    return;
  }

  if (domain.match(nameComponentPattern) === null) {
    res.send({});
    // res.status(400).send({ error: 'Invalid domain' });
    return;
  }

  if (subdomain?.match(nameComponentPattern) === null) {
    res.send({});
    // res.status(400).send({ error: 'Invalid subdomain' });
    return;
  }

  res.locals.name = name;
  res.locals.domain = domain;
  res.locals.subdomain = subdomain ?? "";
  next();
}
