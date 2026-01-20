import { createRoute } from 'honox/factory'
import { PlusIcon, BlogTable } from '../../../components'
import { LinkButton } from '../../../components/Button'
import { getCookie, deleteCookie } from 'hono/cookie'
import { verify } from 'hono/jwt'

// Mock data - replace with actual database query
const mockPosts = [
  {
    id: '1',
    title: '実践 Clean Architecture',
    status: 'published' as const,
    createdAt: '2024-10-15',
  },
  {
    id: '2',
    title: 'エッジコンピューティングの静謐',
    status: 'published' as const,
    createdAt: '2024-10-10',
  },
  {
    id: '3',
    title: 'TypeScript 型の禅',
    status: 'draft' as const,
    createdAt: '2024-10-05',
  },
  {
    id: '4',
    title: 'ドメイン駆動設計の本質',
    status: 'published' as const,
    createdAt: '2024-09-28',
  },
  {
    id: '5',
    title: 'Hono フレームワーク探訪',
    status: 'published' as const,
    createdAt: '2024-09-20',
  },
]

export default createRoute(async (c) => {
  const auth_token = getCookie(c, 'auth_token')
  if (!auth_token) {
    return c.redirect('/admin')
  }

  const env = c.env as { JWT_SECRET: string }
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
          <h1 class="font-['Noto_Serif_JP'] font-medium text-3xl text-stone-900 leading-9">管理</h1>
          <p class="mt-3 font-['Noto_Sans_JP'] text-sm text-stone-400 tracking-[2.1px]">記録一覧</p>
        </div>
        <LinkButton href="/admin/new" target="_self">
          <PlusIcon size={16} />
          新規作成
        </LinkButton>
      </div>

      {/* Blog Table */}
      <BlogTable posts={mockPosts} />
    </div>
  )
})
