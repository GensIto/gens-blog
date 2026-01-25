import { desc, eq } from 'drizzle-orm'
import { createRoute } from 'honox/factory'
import type { Env } from '../server'
import { createDb, schema } from '../db'
import { EnsoCircle } from '../components/EnsoCircle'
import { SectionHeading } from '../components/SectionHeading'
import { ArticleCard } from '../components/ArticleCard'
import { ArrowRightIcon } from '../components/Icons'

export default createRoute(async (c) => {
  const env = c.env as Env['Bindings']
  const db = createDb(env.DB)

  const recentPosts = await db
    .select({
      title: schema.blogs.title,
      excerpt: schema.blogs.excerpt,
      slug: schema.blogs.slug,
      date: schema.blogs.createdAt,
    })
    .from(schema.blogs)
    .where(eq(schema.blogs.status, 'published'))
    .orderBy(desc(schema.blogs.createdAt))
    .limit(3)
  return c.render(
    <div class="max-w-[848px] mx-auto px-6 py-20">
      {/* Hero Section */}
      <section class="flex flex-col items-center text-center mb-32">
        <div class="mb-12">
          <EnsoCircle size={100} />
        </div>

        <h1 class="font-['Noto_Serif_JP'] font-medium text-5xl text-stone-900 leading-tight tracking-[0.96px] mb-6">
          間の設計
        </h1>

        <p class="font-['Noto_Serif_JP'] text-base text-stone-500 leading-8 tracking-[0.32px] mb-2">
          余白が、道をひらく
        </p>

        <p class="font-['Noto_Serif_JP'] text-base text-stone-500 leading-8 tracking-[0.32px] mb-10">
          整えることの記録
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
              excerpt={post.excerpt ?? ''}
              date={post.date}
              slug={post.slug}
            />
          ))}
        </div>
      </section>
    </div>
  )
})
