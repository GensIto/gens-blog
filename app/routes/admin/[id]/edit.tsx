import { createRoute } from 'honox/factory'
import { ArrowLeftIcon } from '../../../components/Icons'
import BlogEditForm from '../../../islands/BlogEditForm'

// Mock function to get post data - replace with actual database query
const getPostById = (id: string) => {
  const posts: Record<
    string,
    {
      id: string
      title: string
      slug: string
      excerpt: string
      content: string
      status: 'draft' | 'published'
      createdAt: string
    }
  > = {
    '1': {
      id: '1',
      title: '実践 Clean Architecture',
      slug: 'clean-architecture-in-practice',
      excerpt: 'ドメイン駆動設計とクリーンアーキテクチャを組み合わせた実装パターンについて考察する。',
      content: '## はじめに\n\nClean Architecture は...',
      status: 'published',
      createdAt: '2024-10-15',
    },
    '2': {
      id: '2',
      title: 'エッジコンピューティングの静謐',
      slug: 'edge-computing-serenity',
      excerpt:
        'Cloudflare Workers と Hono を駆使し、新しい Web の形、レイテンシーを極限まで抑えた世界を探る旅。',
      content: '## エッジの世界\n\n...',
      status: 'published',
      createdAt: '2024-10-10',
    },
  }
  return posts[id] || null
}

export default createRoute((c) => {
  const id = c.req.param('id')
  const post = getPostById(id)

  if (!post) {
    return c.notFound()
  }

  return c.render(
    <div class="max-w-[848px] mx-auto px-6 py-12">
      {/* Back Link */}
      <a
        href="/admin"
        class="inline-flex items-center gap-2 font-['Noto_Sans_JP'] text-sm text-stone-500 tracking-[2.1px] hover:text-stone-900 transition-colors mb-16"
      >
        <ArrowLeftIcon size={16} />
        一覧へ戻る
      </a>

      {/* Page Title */}
      <h1 class="font-['Noto_Serif_JP'] font-medium text-3xl text-stone-900 leading-9 mb-16">
        記録編集
      </h1>

      {/* Edit Form */}
      <BlogEditForm initialData={post} />
    </div>
  )
})
