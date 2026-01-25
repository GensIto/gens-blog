import { createRoute } from 'honox/factory'
import { PlusIcon, BlogTable } from '../../../components'
import { LinkButton } from '../../../components/Button'
import { getCookie, deleteCookie } from 'hono/cookie'
import { verify } from 'hono/jwt'
import { createDb } from '../../../db'
import { blogs } from '../../../db/schema'
import type { Env } from '../../../server'

export default createRoute(async (c) => {
  const auth_token = getCookie(c, 'auth_token')
  if (!auth_token) {
    return c.redirect('/admin')
  }

  const env = c.env as Env['Bindings']
  try {
    await verify(auth_token, env.JWT_SECRET, 'HS256')
  } catch {
    deleteCookie(c, 'auth_token', { path: '/' })
    return c.redirect('/admin')
  }

  const db = createDb(env.DB)
  const result = await db.select().from(blogs)
  const blogsData = {
    blogs: result.map((blog) => ({
      id: blog.id.toString(),
      title: blog.title,
      status: blog.status,
      createdAt: blog.createdAt,
    })),
  }

  return c.render(
    <div class="max-w-[1104px] mx-auto px-6 py-12">
      {/* Header */}
      <div class="flex items-center justify-between mb-12">
        <div>
          <h1 class="font-['Noto_Serif_JP'] font-medium text-3xl text-stone-900 leading-9">
            管理
          </h1>
          <p class="mt-3 font-['Noto_Sans_JP'] text-sm text-stone-400 tracking-[2.1px]">
            記録一覧
          </p>
        </div>
        <LinkButton href="/admin/new" target="_self">
          <PlusIcon size={16} />
          新規作成
        </LinkButton>
      </div>

      <BlogTable posts={blogsData.blogs} />
    </div>
  )
})
