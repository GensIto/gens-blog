import { createRoute } from 'honox/factory'
import { EnsoCircle } from '../components/EnsoCircle'
import { SectionHeading } from '../components/SectionHeading'
import { ArticleCard } from '../components/ArticleCard'
import { ArrowRightIcon } from '../components/Icons'

// Mock data - replace with actual database query
const recentPosts = [
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
]

export default createRoute((c) => {
  return c.render(
    <div class="max-w-[848px] mx-auto px-6 py-20">
      {/* Hero Section */}
      <section class="flex flex-col items-center text-center mb-32">
        <div class="mb-12">
          <EnsoCircle size={100} />
        </div>

        <h1 class="font-['Noto_Serif_JP'] font-medium text-5xl text-stone-900 leading-tight tracking-[0.96px] mb-6">
          静謐なる思考
        </h1>

        <p class="font-['Noto_Serif_JP'] text-base text-stone-500 leading-8 tracking-[0.32px] mb-2">
          ソフトウェアエンジニアリングの深淵を探る
        </p>

        <p class="font-['Noto_Serif_JP'] text-base text-stone-500 leading-8 tracking-[0.32px] mb-10">
          コードと思想の記録
        </p>

        <a
          href="/blog"
          class="inline-flex items-center gap-2 px-8 py-3 border border-stone-900 font-['Noto_Sans_JP'] text-sm text-stone-900 tracking-[2.1px] hover:bg-stone-900 hover:text-[#f8f6f1] transition-colors"
        >
          記録を読む
          <ArrowRightIcon size={16} />
        </a>
      </section>

      {/* Recent Posts Section */}
      <section>
        <div class="mb-16">
          <SectionHeading title="最近の記録" />
        </div>

        <div class="flex flex-col gap-12">
          {recentPosts.map((post) => (
            <ArticleCard
              key={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              date={post.date}
              slug={post.slug}
            />
          ))}
        </div>
      </section>
    </div>
  )
})
