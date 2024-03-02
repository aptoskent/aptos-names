// Copyright (c) Aptos
// SPDX-License-Identifier: Apache-2.0

import {HexString} from "aptos";
import {NextFunction, Request, Response} from "express";

interface ParsedAddress {
  address: HexString;
}

/**
 * Middleware for validating and parsing an account address from the request params
 */
export default function parseQueryAddress(
  req: Request,
  res: Response<any, ParsedAddress>,
  next: NextFunction,
) {
  res.locals.address = new HexString(req.params.address);
  next();
}
