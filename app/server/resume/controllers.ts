import { createApp } from 'honox/server'
import { zValidator } from '@hono/zod-validator'
import { eq, asc } from 'drizzle-orm'
import type { Env } from '../../server'
import { workHistories, contactLinks } from '../../db/schema'
import {
  workHistoryCreateSchema,
  workHistoryUpdateSchema,
  contactLinkCreateSchema,
  contactLinkUpdateSchema,
} from '../../schemas/resume'
import { dbMiddleware } from '../../middleware/db'
import { authMiddleware } from '../../middleware/auth'

// 職歴コントローラー
export const workHistoryController = createApp<Env>()
  .use(dbMiddleware)
  // 一覧取得（認証不要 - 公開ページで使用）
  .get('/', async (c) => {
    const db = c.get('db')
    const result = await db
      .select()
      .from(workHistories)
      .orderBy(asc(workHistories.displayOrder))
      .all()
    return c.json({ success: true as const, workHistories: result })
  })
  // 単一取得
  .get('/:id', authMiddleware, async (c) => {
    const db = c.get('db')
    const id = c.req.param('id')
    const result = await db
      .select()
      .from(workHistories)
      .where(eq(workHistories.id, Number(id)))
      .get()

    if (!result) {
      return c.json(
        { success: false as const, error: '職歴が見つかりません' },
        404
      )
    }
    return c.json({ success: true as const, workHistory: result })
  })
  // 作成
  .post(
    '/',
    authMiddleware,
    zValidator('json', workHistoryCreateSchema),
    async (c) => {
      const db = c.get('db')
      const data = c.req.valid('json')

      try {
        const result = await db
          .insert(workHistories)
          .values({
            ...data,
            updatedAt: new Date().toISOString(),
          })
          .returning()
          .get()

        return c.json({ success: true as const, workHistory: result })
      } catch (_error) {
        return c.json(
          { success: false as const, error: '職歴の作成に失敗しました' },
          500
        )
      }
    }
  )
  // 更新
  .put(
    '/:id',
    authMiddleware,
    zValidator('json', workHistoryUpdateSchema),
    async (c) => {
      const db = c.get('db')
      const data = c.req.valid('json')
      const id = c.req.param('id')

      try {
        const result = await db
          .update(workHistories)
          .set({
            ...data,
            updatedAt: new Date().toISOString(),
          })
          .where(eq(workHistories.id, Number(id)))
          .returning()
          .get()

        if (!result) {
          return c.json(
            { success: false as const, error: '職歴が見つかりません' },
            404
          )
        }
        return c.json({ success: true as const, workHistory: result })
      } catch (_error) {
        return c.json(
          { success: false as const, error: '職歴の更新に失敗しました' },
          500
        )
      }
    }
  )
  // 削除
  .delete('/:id', authMiddleware, async (c) => {
    const db = c.get('db')
    const id = c.req.param('id')

    try {
      const result = await db
        .delete(workHistories)
        .where(eq(workHistories.id, Number(id)))
        .returning()
        .get()

      if (!result) {
        return c.json(
          { success: false as const, error: '職歴が見つかりません' },
          404
        )
      }
      return c.json({ success: true as const, message: '職歴を削除しました' })
    } catch (_error) {
      return c.json(
        { success: false as const, error: '職歴の削除に失敗しました' },
        500
      )
    }
  })

// 連絡先リンクコントローラー
export const contactLinkController = createApp<Env>()
  .use(dbMiddleware)
  // 一覧取得（認証不要 - 公開ページで使用）
  .get('/', async (c) => {
    const db = c.get('db')
    const result = await db
      .select()
      .from(contactLinks)
      .orderBy(asc(contactLinks.displayOrder))
      .all()
    return c.json({ success: true as const, contactLinks: result })
  })
  // 単一取得
  .get('/:id', authMiddleware, async (c) => {
    const db = c.get('db')
    const id = c.req.param('id')
    const result = await db
      .select()
      .from(contactLinks)
      .where(eq(contactLinks.id, Number(id)))
      .get()

    if (!result) {
      return c.json(
        { success: false as const, error: '連絡先リンクが見つかりません' },
        404
      )
    }
    return c.json({ success: true as const, contactLink: result })
  })
  // 作成
  .post(
    '/',
    authMiddleware,
    zValidator('json', contactLinkCreateSchema),
    async (c) => {
      const db = c.get('db')
      const data = c.req.valid('json')

      try {
        const result = await db
          .insert(contactLinks)
          .values({
            ...data,
            updatedAt: new Date().toISOString(),
          })
          .returning()
          .get()

        return c.json({ success: true as const, contactLink: result })
      } catch (_error) {
        return c.json(
          { success: false as const, error: '連絡先リンクの作成に失敗しました' },
          500
        )
      }
    }
  )
  // 更新
  .put(
    '/:id',
    authMiddleware,
    zValidator('json', contactLinkUpdateSchema),
    async (c) => {
      const db = c.get('db')
      const data = c.req.valid('json')
      const id = c.req.param('id')

      try {
        const result = await db
          .update(contactLinks)
          .set({
            ...data,
            updatedAt: new Date().toISOString(),
          })
          .where(eq(contactLinks.id, Number(id)))
          .returning()
          .get()

        if (!result) {
          return c.json(
            { success: false as const, error: '連絡先リンクが見つかりません' },
            404
          )
        }
        return c.json({ success: true as const, contactLink: result })
      } catch (_error) {
        return c.json(
          { success: false as const, error: '連絡先リンクの更新に失敗しました' },
          500
        )
      }
    }
  )
  // 削除
  .delete('/:id', authMiddleware, async (c) => {
    const db = c.get('db')
    const id = c.req.param('id')

    try {
      const result = await db
        .delete(contactLinks)
        .where(eq(contactLinks.id, Number(id)))
        .returning()
        .get()

      if (!result) {
        return c.json(
          { success: false as const, error: '連絡先リンクが見つかりません' },
          404
        )
      }
      return c.json({
        success: true as const,
        message: '連絡先リンクを削除しました',
      })
    } catch (_error) {
      return c.json(
        { success: false as const, error: '連絡先リンクの削除に失敗しました' },
        500
      )
    }
  })
