import { desc, eq } from 'drizzle-orm'
import { createRoute } from 'honox/factory'
import type { Env } from '../../server'
import { createDb, schema } from '../../db'
import { PageHeading } from '../../components/PageHeading'
import { ArticleCard } from '../../components/ArticleCard'

export default createRoute(async (c) => {
  const env = c.env as Env['Bindings']
  const db = createDb(env.DB)
  const allPosts = await db
    .select({
      title: schema.blogs.title,
      excerpt: schema.blogs.excerpt,
      slug: schema.blogs.slug,
      date: schema.blogs.createdAt,
    })
    .from(schema.blogs)
    .where(eq(schema.blogs.status, 'published'))
    .orderBy(desc(schema.blogs.createdAt))

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
            excerpt={post.excerpt ?? ''}
            date={post.date}
            slug={post.slug}
          />
        ))}
      </div>
    </div>
  )
})
