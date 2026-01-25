# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a blog application built with HonoX (a full-stack framework based on Hono) deployed on Cloudflare Workers. It uses:

- **HonoX**: Meta-framework for Hono with file-based routing
- **Cloudflare Workers**: Serverless deployment platform
- **Drizzle ORM**: Type-safe database toolkit
- **Cloudflare D1**: SQLite-based database
- **Cloudflare R2**: Object storage
- **Cloudflare AI**: AI capabilities binding
- **TailwindCSS v4**: Styling via Vite plugin

## Development Commands

### Running the Application

- `bun run dev` - Start development server with Vite and HonoX dev server
- `bun run preview` - Preview production build locally with Wrangler
- `bun run build` - Build for production (client and server bundles)
- `bun run deploy` - Build and deploy to Cloudflare Workers

### Database Commands

- `bun run db:gen` - Generate Drizzle migration files from schema changes
- `bun run db:migrate` - Apply migrations to local D1 database
- `bun run db:migrate:remote` - Apply migrations to production D1 database
- `bun run db:studio` - Open Drizzle Studio for local database
- `bun run db:studio:prod` - Open Drizzle Studio for production database

### Code Quality Commands

- `bun run lint` - Run ESLint on codebase
- `bun run lint:fix` - Run ESLint and auto-fix issues
- `bun run format` - Format code with Prettier
- `bun run format:check` - Check code formatting without changes

## Architecture

### Application Structure

**Server Entry** (`app/server.ts`):

- Exports a Hono app instance typed with `Env` (contains Bindings and Variables)
- API routes are prefixed with `/api`
- Uses `createApp<Env>()` from honox/server for type safety
- Controllers are mounted as sub-routes (e.g., `/api/auth`)

**Environment Bindings** (defined in `app/server.ts`):
The `Env` type defines Cloudflare Workers bindings:

- `JWT_SECRET`: Environment variable for JWT signing
- Additional bindings from `wrangler.json`: `DB` (D1), `R2`, `AI`

**Routes** (`app/routes/`):

- File-based routing via HonoX
- `index.tsx` - Main route, uses `createRoute()` factory
- `_renderer.tsx` - Layout/renderer component
- `_404.tsx`, `_error.tsx` - Error pages
- Routes use JSX/TSX and can include server-side logic

**Islands** (`app/islands/`):

- Client-side interactive components (islands architecture)
- Components that require client-side JavaScript (forms, interactive UI)
- Examples: `BlogCreateForm.tsx`, `BlogEditForm.tsx`, `LoginForm.tsx`
- Imported and used within routes for hydration

**Middleware** (`app/middleware/`):

- `dbMiddleware` - Attaches database instance to context (`c.get('db')`)
- `authMiddleware` - Validates JWT token from cookie, sets user in context
- Both are type-safe with the `Env` type from `app/server.ts`
- Chain middleware using `.use()` before route handlers

**API Controllers** (`app/server/`):

Controllers are mounted at `/api` prefix (configured in `app/server.ts`):

- `auth/controllers.ts` - Authentication endpoints using JWT
  - `POST /api/auth/login` - Login with email/password, sets httpOnly cookie
  - `GET /api/auth/logout` - Clear auth cookie and redirect
  - `GET /api/auth/me` - Verify authentication status
- `blogs/controllers.ts` - Blog CRUD operations (all protected by `authMiddleware`)
  - `GET /api/blogs/:id` - Fetch single blog by ID
  - `POST /api/blogs` - Create new blog (uses Cloudflare AI for auto-generating excerpt)
  - `PUT /api/blogs/:id` - Update existing blog
- Controllers use `createApp<Env>()` for type safety and can chain middleware

### Database Layer

**Schema** (`app/db/schema.ts`):
Drizzle schema with four tables:

- `admin` - Admin users with email/password
- `blogs` - Blog posts with title, content, published status
- `tags` - Reusable tags
- `blogTags` - Many-to-many relationship between blogs and tags

**Database Factory** (`app/db/index.ts`):

- `createDb(d1: D1Database)` - Creates Drizzle instance with schema
- Import from this file to get `Database` type and `schema`
- Always pass the D1 binding from context: `const db = createDb(c.env.DB)`

**Migrations**:

- Generated in `./drizzle` directory via `bun run db:gen`
- Applied via Wrangler CLI commands (`db:migrate` for local, `db:migrate:remote` for production)
- Two Drizzle configs:
  - `drizzle.config.ts` - Production config using D1 HTTP API (requires `.env` credentials)
  - `drizzle.config.local.ts` - Local dev config pointing to Wrangler's SQLite file in `.wrangler/state/v3/d1/`
- Use `db:studio` with local config or `db:studio:prod` with production config

### Build Configuration

**Vite** (`vite.config.ts`):

- `honox/vite` plugin with Cloudflare adapter for dev server
- Client entry points: `/app/client.ts` and `/app/style.css`
- `@tailwindcss/vite` for TailwindCSS v4
- `@hono/vite-build/cloudflare-workers` for production builds

**Cloudflare** (`wrangler.json`):

- Main entry: `./dist/index.js` (built by Vite)
- Static assets served from `./dist` directory
- Bindings: DB (D1), R2 bucket, AI
- Node.js compatibility enabled

## Working with Database

To modify the database schema:

1. Edit `app/db/schema.ts`
2. Run `bun run db:gen` to generate migration
3. Run `bun run db:migrate` for local or `bun run db:migrate:remote` for production
4. Restart dev server to pick up changes

**In Routes** - create database instance directly:

```typescript
import { createDb, schema } from '../db'

export default createRoute(async (c) => {
  const db = createDb(c.env.DB)
  const posts = await db.select().from(schema.blogs)
  // ...
})
```

**In Controllers** - use `dbMiddleware` to get database from context:

```typescript
export const blogController = createApp<Env>()
  .use(dbMiddleware)
  .get('/:id', async (c) => {
    const db = c.get('db')  // Database instance from middleware
    const id = c.req.param('id')
    const result = await db.select().from(blogs).where(eq(blogs.id, Number(id)))
    // ...
  })
```

## Authentication Pattern

The auth system uses JWT tokens stored in httpOnly cookies:

**For API Controllers** - use the `authMiddleware`:

```typescript
export const blogController = createApp<Env>()
  .use(dbMiddleware)
  .post('/', authMiddleware, async (c) => {
    const user = c.get('user')  // JWT payload if authenticated
    // ... protected route logic
  })
```

**For Manual Auth Checks**:

1. Get token from cookie: `getCookie(c, 'auth_token')`
2. Verify with `verify(token, c.env.JWT_SECRET, 'HS256')`
3. Handle invalid tokens by clearing cookie and returning 401

Refer to `app/middleware/auth.ts` and `app/server/auth/controllers.ts` for implementation details.

## Deployment

The app deploys to Cloudflare Workers. Ensure `.env` contains:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_DATABASE_ID`
- `CLOUDFLARE_D1_TOKEN`

These are used by `drizzle.config.ts` for remote database operations.
