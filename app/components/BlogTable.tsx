import type { FC } from 'hono/jsx'

type BlogPost = {
  id: string
  title: string
  status: 'published' | 'draft'
  createdAt: string
}

type BlogTableProps = {
  posts: BlogPost[]
}

export const BlogTable: FC<BlogTableProps> = ({ posts }) => {
  return (
    <div class="bg-white border border-stone-200">
      {/* Header */}
      <div class="flex items-center px-6 py-4 bg-[rgba(248,246,241,0.5)] border-b border-stone-200">
        <span class="flex-1 font-['Noto_Sans_JP'] text-sm text-stone-400 tracking-[2.1px]">
          タイトル
        </span>
        <span class="w-20 font-['Noto_Sans_JP'] text-sm text-stone-400 tracking-[2.1px]">
          状態
        </span>
        <span class="w-24 font-['Noto_Sans_JP'] text-sm text-stone-400 tracking-[2.1px]">
          作成日
        </span>
        <span class="w-16 font-['Noto_Sans_JP'] text-sm text-stone-400 tracking-[2.1px]">
          操作
        </span>
      </div>

      {/* Rows */}
      {posts.map((post) => (
        <div
          key={post.id}
          class="flex items-center px-6 py-4 border-b border-stone-200 last:border-b-0"
        >
          <span class="flex-1 font-['Noto_Serif_JP'] text-base text-stone-900">
            {post.title}
          </span>
          <span
            class={`w-20 font-['Noto_Sans_JP'] text-sm tracking-[2.1px] ${
              post.status === 'published' ? 'text-[#7a9a7a]' : 'text-stone-400'
            }`}
          >
            {post.status === 'published' ? '公開' : '下書き'}
          </span>
          <span class="w-24 font-['Noto_Sans_JP'] text-sm text-stone-400">
            {post.createdAt}
          </span>
          <a
            href={`/admin/${post.id}/edit`}
            class="w-16 font-['Noto_Sans_JP'] text-sm text-[#7a9a7a] tracking-[2.1px] hover:text-stone-900 transition-colors"
          >
            編集
          </a>
        </div>
      ))}
    </div>
  )
}
