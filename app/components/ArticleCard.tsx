import type { FC } from 'hono/jsx'

type ArticleCardProps = {
  title: string
  excerpt: string
  date: string
  slug: string
}

export const ArticleCard: FC<ArticleCardProps> = ({ title, excerpt, date, slug }) => {
  return (
    <article class="border-b border-stone-200 pb-8">
      <time class="font-['Noto_Sans_JP'] text-sm text-stone-400 tracking-[0.7px]">
        {date}
      </time>
      <a href={`/blog/${slug}`} class="block mt-3 group">
        <h3 class="font-['Noto_Serif_JP'] font-medium text-xl text-stone-900 leading-7 group-hover:text-[#7a9a7a] transition-colors">
          {title}
        </h3>
      </a>
      <p class="mt-4 font-['Noto_Serif_JP'] text-base text-stone-500 leading-8 tracking-[0.32px]">
        {excerpt}
      </p>
      <a
        href={`/blog/${slug}`}
        class="inline-block mt-6 font-['Noto_Sans_JP'] text-sm text-stone-500 tracking-[2.1px] hover:text-stone-900 transition-colors"
      >
        続きを読む →
      </a>
    </article>
  )
}
