import { setCookie, deleteCookie, getCookie } from 'hono/cookie'
import { sign, verify } from 'hono/jwt'
import { createApp } from 'honox/server'
import { eq } from 'drizzle-orm'
import type { Env } from '../../server'
import { createDb } from '../../db'
import { admin } from '../../db/schema'

export const authController = createApp<Env>()
  .post('/login', async (c) => {
    const { email, password } = await c.req.json<{
      email: string
      password: string
    }>()

    const { JWT_SECRET, DB } = c.env
    const db = createDb(DB)

    const user = await db
      .select()
      .from(admin)
      .where(eq(admin.email, email))
      .get()

    if (!user) {
      return c.json(
        {
          success: false as const,
          error: 'メールアドレスまたはパスワードが正しくありません',
        },
        401
      )
    }

    if (user.password !== password) {
      return c.json(
        {
          success: false as const,
          error: 'メールアドレスまたはパスワードが正しくありません',
        },
        401
      )
    }

    const payload = {
      sub: {
        id: user.id,
        email: user.email,
      },
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 1, // z1 day
    }
    const token = await sign(payload, JWT_SECRET)

    setCookie(c, 'auth_token', token, {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'Lax',
      maxAge: 60 * 60 * 24 * 1, // 1 day
    })

    return c.json({ success: true as const })
  })
  .get('/logout', (c) => {
    deleteCookie(c, 'auth_token', { path: '/' })
    return c.redirect('/')
  })
  .get('/me', async (c) => {
    const token = getCookie(c, 'auth_token')
    if (!token) {
      return c.json({ authenticated: false }, 401)
    }

    try {
      const payload = await verify(token, c.env.JWT_SECRET, 'HS256')
      return c.json({ authenticated: true, user: payload.sub })
    } catch {
      deleteCookie(c, 'auth_token', { path: '/' })
      return c.json({ authenticated: false }, 401)
    }
  })
