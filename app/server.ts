import { showRoutes } from "hono/dev";
import { createApp } from "honox/server";
import type { JWTPayload } from "hono/utils/jwt/types";
import { authController } from "./server/auth/controllers";
import { blogController } from "./server/blogs/controllers";
import type { Database } from "./db";
import type { Ai } from "@cloudflare/workers-types/experimental";

export type Env = {
  Bindings: {
    JWT_SECRET: string;
    DB: D1Database;
    AI: Ai;
  };
  Variables: {
    db: Database;
    user?: JWTPayload;
  };
};

const app = createApp<Env>()
  .basePath("/api")
  .route("/auth", authController)
  .route("/blogs", blogController);

showRoutes(app);

export type App = typeof app;
export default app;
