// Copyright (c) Aptos
// SPDX-License-Identifier: Apache-2.0

import cors from "cors";
import express from "express";
import routes from "./routes";

const app = express();
app.use(cors());
app.use("/v1", routes);
export {app};
