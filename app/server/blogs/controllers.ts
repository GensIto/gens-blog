import { createApp } from 'honox/server'
import { zValidator } from '@hono/zod-validator'
import { eq } from 'drizzle-orm'
import type { Env } from '../../server'
import { blogs } from '../../db/schema'
import { blogCreateSchema, blogUpdateSchema } from '../../schemas/blog'
import { dbMiddleware } from '../../middleware/db'
import { authMiddleware } from '../../middleware/auth'

export const blogController = createApp<Env>()
  .use(dbMiddleware)
  .get('/:id', authMiddleware, async (c) => {
    const db = c.get('db')
    const id = c.req.param('id')

    const result = await db
      .select()
      .from(blogs)
      .where(eq(blogs.id, Number(id)))
      .get()

    if (!result) {
      return c.json(
        {
          success: false as const,
          error: 'ブログが見つかりません',
        },
        404
      )
    }

    return c.json({
      success: true as const,
      blog: result,
    })
  })
  .post(
    '/',
    authMiddleware,
    zValidator('json', blogCreateSchema),
    async (c) => {
      const db = c.get('db')
      const data = c.req.valid('json')

      const response = await c.env.AI.run('@cf/facebook/bart-large-cnn', {
        input_text: data.content,
        max_length: 100,
      })

      try {
        const result = await db
          .insert(blogs)
          .values({
            ...data,
            excerpt: response.summary || null,
            updatedAt: new Date().toISOString(),
          })
          .returning()
          .get()

        return c.json({
          success: true as const,
          blog: result,
        })
      } catch (_error) {
        return c.json(
          {
            success: false as const,
            error: 'ブログの作成に失敗しました',
          },
          500
        )
      }
    }
  )
  .put(
    '/:id',
    authMiddleware,
    zValidator('json', blogUpdateSchema),
    async (c) => {
      const db = c.get('db')
      const data = c.req.valid('json')
      const id = c.req.param('id')

      try {
        const result = await db
          .update(blogs)
          .set({
            ...data,
            excerpt: data.excerpt || null,
            updatedAt: new Date().toISOString(),
          })
          .where(eq(blogs.id, Number(id)))
          .returning()
          .get()

        if (!result) {
          return c.json(
            {
              success: false as const,
              error: 'ブログが見つかりません',
            },
            404
          )
        }

        return c.json({
          success: true as const,
          blog: result,
        })
      } catch (_error) {
        return c.json(
          {
            success: false as const,
            error: 'ブログの更新に失敗しました',
          },
          500
        )
      }
    }
  )
