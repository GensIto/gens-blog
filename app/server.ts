import { showRoutes } from 'hono/dev'
import { createApp } from 'honox/server'
import { authController } from './server/auth/controllers'

export type Env = {
  Bindings: {
    JWT_SECRET: string
    DB: D1Database
  }
  Variables: {}
}

const app = createApp<Env>().basePath('/api').route('/auth', authController)


showRoutes(app)

export type App = typeof app
export default app
