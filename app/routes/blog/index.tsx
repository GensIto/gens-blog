import { createRoute } from 'honox/factory'
import { PageHeading } from '../../components/PageHeading'
import { ArticleCard } from '../../components/ArticleCard'

// Mock data - replace with actual database query
const allPosts = [
  {
    title: '実践 Clean Architecture',
    excerpt: 'ドメイン駆動設計とクリーンアーキテクチャを組み合わせた実装パターンについて考察する。',
    date: '2024-10-15',
    slug: 'clean-architecture-in-practice',
  },
  {
    title: 'エッジコンピューティングの静謐',
    excerpt:
      'Cloudflare Workers と Hono を駆使し、新しい Web の形、レイテンシーを極限まで抑えた世界を探る旅。',
    date: '2024-10-10',
    slug: 'edge-computing-serenity',
  },
  {
    title: 'ドメイン駆動設計の本質',
    excerpt: 'ユビキタス言語から始まる、ビジネスとコードの対話。複雑さを組み込む対話の術。',
    date: '2024-09-28',
    slug: 'essence-of-ddd',
  },
  {
    title: 'Hono フレームワーク探訪',
    excerpt:
      '軽量で高速な Web フレームワーク Hono の魅力を探る。シンプルさの中に宿る力強さ。',
    date: '2024-09-20',
    slug: 'exploring-hono-framework',
  },
]

export default createRoute((c) => {
  return c.render(
    <div class="max-w-[848px] mx-auto px-6 py-12">
      {/* Header */}
      <PageHeading title="記録" subtitle="コードと思想の軌跡" />

      {/* Articles */}
      <div class="mt-16 flex flex-col gap-12">
        {allPosts.map((post) => (
          <ArticleCard
            key={post.slug}
            title={post.title}
            excerpt={post.excerpt}
            date={post.date}
            slug={post.slug}
          />
        ))}
      </div>
    </div>
  )
})
