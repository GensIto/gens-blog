import { and, eq } from 'drizzle-orm'
import { createRoute } from 'honox/factory'
import { marked } from 'marked'
import type { Env } from '../../server'
import { createDb, schema } from '../../db'
import { ArrowLeftIcon } from '../../components/Icons'

export default createRoute(async (c) => {
  const slug = c.req.param('slug') as string
  const env = c.env as Env['Bindings']
  const db = createDb(env.DB)

  const [post] = await db
    .select({
      title: schema.blogs.title,
      content: schema.blogs.content,
      date: schema.blogs.createdAt,
      slug: schema.blogs.slug,
    })
    .from(schema.blogs)
    .where(and(eq(schema.blogs.slug, slug), eq(schema.blogs.status, 'published')))
    .limit(1)

  if (!post) {
    return c.notFound()
  }

  const htmlContent = await marked.parse(post.content)

  return c.render(
    <div class="max-w-[848px] mx-auto px-6 py-12">
      {/* Back Link */}
      <a
        href="/blog"
        class="inline-flex items-center gap-2 font-['Noto_Sans_JP'] text-sm text-stone-500 tracking-[2.1px] hover:text-stone-900 transition-colors mb-12"
      >
        <ArrowLeftIcon size={16} />
        記録一覧へ
      </a>

      {/* Article Header */}
      <header class="mb-12">
        <time class="font-['Noto_Sans_JP'] text-sm text-stone-400 tracking-[0.7px]">
          {post.date}
        </time>
        <h1 class="mt-4 font-['Noto_Serif_JP'] font-medium text-4xl text-stone-900 leading-tight">
          {post.title}
        </h1>
      </header>

      {/* Article Content */}
      <article
        class="prose prose-stone max-w-none font-['Noto_Serif_JP'] text-base text-stone-700 leading-8 tracking-[0.32px]"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Markdown content is trusted
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* Back to List */}
      <div class="mt-16 pt-8 border-t border-stone-200">
        <a
          href="/blog"
          class="font-['Noto_Sans_JP'] text-sm text-stone-500 tracking-[2.1px] hover:text-stone-900 transition-colors"
        >
          ← 記録一覧へ戻る
        </a>
      </div>
    </div>
  )
})
