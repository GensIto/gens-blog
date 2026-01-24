import { createMiddleware } from 'hono/factory'
import { getCookie, deleteCookie } from 'hono/cookie'
import { verify } from 'hono/jwt'
import type { Env } from '../server'

export const authMiddleware = createMiddleware<Env>(async (c, next) => {
  const token = getCookie(c, 'auth_token')

  if (!token) {
    return c.json({ success: false as const, error: '認証が必要です' }, 401)
  }

  try {
    const payload = await verify(token, c.env.JWT_SECRET, 'HS256')
    c.set('user', payload)
    await next()
  } catch {
    deleteCookie(c, 'auth_token', { path: '/' })
    return c.json({ success: false as const, error: '認証が必要です' }, 401)
  }
})
