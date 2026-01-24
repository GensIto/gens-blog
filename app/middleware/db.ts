import { createMiddleware } from 'hono/factory'
import type { Env } from '../server'
import { createDb } from '../db'

export const dbMiddleware = createMiddleware<Env>(async (c, next) => {
  const db = createDb(c.env.DB)
  c.set('db', db)
  await next()
})
