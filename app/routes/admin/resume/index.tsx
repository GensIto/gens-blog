import { createRoute } from 'honox/factory'
import { getCookie, deleteCookie } from 'hono/cookie'
import { verify } from 'hono/jwt'
import type { Env } from '../../../server'
import ResumeManagement from '../../../islands/ResumeManagement'

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

  return c.render(
    <div class="max-w-[1104px] mx-auto px-6 py-12">
      {/* Header */}
      <div class="flex items-center justify-between mb-12">
        <div>
          <h1 class="font-['Noto_Serif_JP'] font-medium text-3xl text-stone-900 leading-9">
            経歴管理
          </h1>
          <p class="mt-3 font-['Noto_Sans_JP'] text-sm text-stone-400 tracking-[2.1px]">
            職歴・連絡先リンクの編集
          </p>
        </div>
        <a
          href="/admin/top"
          class="inline-flex items-center gap-2 px-4 py-2 border border-stone-900 text-stone-900 font-['Noto_Sans_JP'] font-medium text-sm hover:bg-stone-100 transition-colors"
        >
          ブログ管理へ
        </a>
      </div>

      <ResumeManagement />
    </div>
  )
})
