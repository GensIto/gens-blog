import { createRoute } from 'honox/factory'
import { EnsoCircle } from '../../components/EnsoCircle'
import { PageHeading } from '../../components/PageHeading'
import { SectionHeading } from '../../components/SectionHeading'
import { TimelineItem } from '../../components/TimelineItem'
import { Button } from '../../components/Button'
import { MailIcon } from '../../components/Icons'

const workHistory = [
  {
    period: '2024 - 現在',
    company: '株式会社◯◯',
    role: 'Backend Engineer',
    description:
      '顧客情報管理のための SaaS の開発。Cloudflare Workers、tRPC、Drizzle ORM のシステムを導入したプロダクト開発をリード。',
  },
  {
    period: '2019 - 2024',
    company: '株式会社△△',
    role: 'Frontend Engineer',
    description:
      'React/TypeScript を用いた Web アプリケーション開発。デザインシステムの構築とコンポーネント設計を担当。',
  },
]

export default createRoute((c) => {
  return c.render(
    <div class="max-w-[848px] mx-auto px-6 py-12">
      {/* Header */}
      <PageHeading title="経歴" subtitle="歩んできた道" />

      {/* Profile Section */}
      <section class="mt-16 flex flex-col items-center text-center">
        <div class="mb-12">
          <EnsoCircle size={80} />
        </div>

        <h2 class="font-['Noto_Serif_JP'] font-medium text-2xl text-stone-900 leading-8 mb-4">
          Your Name
        </h2>

        <p class="font-['Noto_Sans_JP'] text-sm text-stone-400 tracking-[2.1px] mb-6">
          Backend Engineer
        </p>

        <div class="max-w-[672px] space-y-4">
          <p class="font-['Noto_Serif_JP'] text-base text-stone-900 leading-8 tracking-[0.32px]">
            ソフトウェアエンジニア。静謐なコードを追求する。
          </p>

          <p class="font-['Noto_Serif_JP'] text-base text-stone-900 leading-8 tracking-[0.32px]">
            Clean Architecture と Domain-Driven Design
            を軸に、持続可能なシステム設計を探求している。エッジコンピューティングと TypeScript
            の深淵に魅せられ、日々コードと対話する。
          </p>

          <p class="font-['Noto_Serif_JP'] text-base text-stone-900 leading-8 tracking-[0.32px]">
            「簡潔さの中にすべての本質が見える」という禅の教えを、ソフトウェア設計に応用することを目指している。
          </p>
        </div>
      </section>

      {/* Work History Section */}
      <section class="mt-24">
        <div class="mb-12">
          <SectionHeading title="職歴" />
        </div>

        <div class="space-y-12">
          {workHistory.map((item) => (
            <TimelineItem
              key={item.period}
              period={item.period}
              company={item.company}
              role={item.role}
              description={item.description}
            />
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section class="mt-24">
        <div class="mb-12">
          <SectionHeading title="連絡" />
        </div>

        <div class="text-center">
          <p class="font-['Noto_Serif_JP'] text-base text-stone-900 leading-8 tracking-[0.32px] mb-8">
            お仕事のご依頼やご質問がありましたら、お気軽にご連絡ください。
          </p>

          <div class="flex items-center justify-center gap-6">
            <Button href="mailto:contact@example.com">
              <MailIcon size={16} />
              メール
            </Button>
            <Button href="https://github.com">GitHub</Button>
          </div>
        </div>
      </section>
    </div>
  )
})
