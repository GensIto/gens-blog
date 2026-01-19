import { createRoute } from 'honox/factory'
import { ArrowLeftIcon } from '../../components/Icons'

// Mock function to get post data - replace with actual database query
const getPostBySlug = (slug: string) => {
  const posts: Record<
    string,
    {
      title: string
      content: string
      date: string
      slug: string
    }
  > = {
    'clean-architecture-in-practice': {
      title: '実践 Clean Architecture',
      content: `
## はじめに

Clean Architecture は、Robert C. Martin（Uncle Bob）によって提唱されたソフトウェアアーキテクチャのパターンです。このアーキテクチャは、ビジネスロジックを技術的な詳細から分離し、テスタビリティと保守性を向上させることを目的としています。

## 中心的な概念

### 依存性の方向

Clean Architecture の最も重要な原則は、依存性の方向です。外側のレイヤーは内側のレイヤーに依存することができますが、その逆は許されません。

### レイヤー構造

1. **Entities**: ビジネスルールをカプセル化
2. **Use Cases**: アプリケーション固有のビジネスルール
3. **Interface Adapters**: データの変換
4. **Frameworks & Drivers**: 外部フレームワークとの接続

## 実装のポイント

ドメイン駆動設計と組み合わせることで、より堅牢なアーキテクチャを構築できます。
      `,
      date: '2024-10-15',
      slug: 'clean-architecture-in-practice',
    },
    'edge-computing-serenity': {
      title: 'エッジコンピューティングの静謐',
      content: `
## エッジの世界へ

エッジコンピューティングは、計算処理をユーザーに近い場所で行うアプローチです。Cloudflare Workers はこの概念を体現するプラットフォームです。

## Hono との出会い

Hono は、軽量で高速な Web フレームワークです。エッジランタイムでの実行に最適化されており、シンプルながら強力な機能を提供します。

## レイテンシーの追求

ユーザー体験において、レイテンシーは重要な要素です。エッジで処理を行うことで、物理的な距離による遅延を最小限に抑えることができます。
      `,
      date: '2024-10-10',
      slug: 'edge-computing-serenity',
    },
  }
  return posts[slug] || null
}

export default createRoute((c) => {
  const slug = c.req.param('slug')
  const post = getPostBySlug(slug)

  if (!post) {
    return c.notFound()
  }

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
      <article class="prose prose-stone max-w-none">
        <div
          class="font-['Noto_Serif_JP'] text-base text-stone-700 leading-8 tracking-[0.32px] space-y-6"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Markdown content is trusted
          dangerouslySetInnerHTML={{
            __html: post.content
              .split('\n')
              .map((line) => {
                if (line.startsWith('## ')) {
                  return `<h2 class="font-['Noto_Serif_JP'] font-medium text-2xl text-stone-900 mt-12 mb-6">${line.slice(3)}</h2>`
                }
                if (line.startsWith('### ')) {
                  return `<h3 class="font-['Noto_Serif_JP'] font-medium text-xl text-stone-900 mt-8 mb-4">${line.slice(4)}</h3>`
                }
                if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || line.startsWith('4. ')) {
                  return `<li class="ml-6 list-decimal">${line.slice(3)}</li>`
                }
                if (line.trim() === '') {
                  return ''
                }
                return `<p class="mb-4">${line}</p>`
              })
              .join(''),
          }}
        />
      </article>

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
