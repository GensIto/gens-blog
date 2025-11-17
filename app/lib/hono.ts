import { hc } from "hono/client";
import { AppType } from "../routes/api/index";

export const honoClient = hc<AppType>("/api");
