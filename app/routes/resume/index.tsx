import { createRoute } from 'honox/factory'
import { asc } from 'drizzle-orm'
import { EnsoCircle } from '../../components/EnsoCircle'
import { PageHeading } from '../../components/PageHeading'
import { SectionHeading } from '../../components/SectionHeading'
import { TimelineItem } from '../../components/TimelineItem'
import { LinkButton } from '../../components/Button'
import { createDb } from '../../db'
import { workHistories, contactLinks as contactLinksTable } from '../../db/schema'
import type { Env } from '../../server'

export default createRoute(async (c) => {
  const env = c.env as Env['Bindings']
  const db = createDb(env.DB)

  // DBから職歴と連絡先リンクを取得
  const workHistoryData = await db
    .select()
    .from(workHistories)
    .orderBy(asc(workHistories.displayOrder))
    .all()

  const contactLinksData = await db
    .select()
    .from(contactLinksTable)
    .orderBy(asc(contactLinksTable.displayOrder))
    .all()
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
          伊藤 源太
        </h2>

        <p class="font-['Noto_Sans_JP'] text-sm text-stone-400 tracking-[2.1px] mb-6">
          フロントエンドエンジニア
        </p>

        <div class="max-w-[672px] space-y-4">
          <p class="font-['Noto_Serif_JP'] text-base text-stone-900 leading-8 tracking-[0.32px] text-left">
            ワクワクそしてドキドキ
          </p>

          <p class="font-['Noto_Serif_JP'] text-base text-stone-900 leading-8 tracking-[0.32px] text-left">
            Web
            コーダーからスタートし、現在はソフトウェアエンジニアとして、React、TypeScript
            を軸に、開発しています。
          </p>

          <p class="font-['Noto_Serif_JP'] text-base text-stone-900 leading-8 tracking-[0.32px] text-left">
            プロダクトエンジニアとして、幅広い領域で活躍し、事業を成長させられるエンジニアを目指しています。
          </p>
        </div>
      </section>

      {/* Work History Section */}
      <section class="mt-24">
        <div class="mb-12">
          <SectionHeading title="職歴" />
        </div>

        <div class="space-y-12">
          {workHistoryData.map((item) => (
            <TimelineItem
              key={item.id}
              period={item.period}
              company={item.company}
              role={item.role}
              skills={item.skills}
              description={item.description}
              achievements={item.achievements}
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
            {contactLinksData.map((link) => (
              <LinkButton key={link.id} href={link.href} target="_blank">
                {link.label}
              </LinkButton>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
})
