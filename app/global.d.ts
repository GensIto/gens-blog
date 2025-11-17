import type {} from "hono";

declare module "hono" {
  interface Env {
    Variables: {};
    Bindings: {
      R2_BUCKET: R2Bucket;
      AI: Ai;
    };
  }
}
