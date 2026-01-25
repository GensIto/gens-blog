import { createRoute } from 'honox/factory'
import { EnsoCircle } from '../../components/EnsoCircle'
import { PageHeading } from '../../components/PageHeading'
import { SectionHeading } from '../../components/SectionHeading'
import { TimelineItem } from '../../components/TimelineItem'
import { LinkButton } from '../../components/Button'

const workHistory = [
  {
    period: '2025年10月 - 現在',
    company: '株式会社パブリックテクノロジーズ',
    role: 'フルスタックエンジニア',
    skills: ['Next.js', 'tRPC', 'Prisma', 'TypeScript'],
    description:
      'AI行政というプロダクトでフルスタックエンジニアとして開発を担当。',
    achievements: [
      'Next.js + tRPC + Prisma を用いたフルスタック開発。RAGデータベース構築のためのファイルアップロード時のメタ情報入力負担を軽減するAI推論機能の実装を担当',
    ],
  },
  {
    period: '2023年1月 - 2025年9月',
    company: 'アイリス株式会社',
    role: 'フロントエンドエンジニア',
    skills: ['React', 'TypeScript', 'Next.js', 'Storybook', 'Jest', 'Figma'],
    description:
      '咽頭画像を撮影するハードのカメラと問診を入力するWebアプリとAI判定を組み合わせた医療機器のフロントエンド開発を担当。',
    achievements: [
      'フロントエンドチームの品質担保について社内発表し、活動を広める',
      'Next.js 勉強会を提案・開催。デイリーでチュートリアルを進め、毎週水曜日に共有する形式を構築',
      'メディアサイト新規事業のプロトタイプを Next.js + Supabase で作成し社内に提案',
      '外部 Web 問診サービス連携のプロトタイプを作成し、リリースまで推進',
    ],
  },
  {
    period: '2021年10月 - 2022年12月',
    company: '合同会社ATE UNIVERSE',
    role: 'Webコーダー',
    skills: [
      'HTML',
      'CSS',
      'JavaScript',
      'WordPress',
      'FLOCSS',
      'React',
      'TailwindCSS',
    ],
    description:
      '前任者との入れ替わりで未経験から1人でスタート。Web事業の売り上げを落とすことなく、自走力を身につけた。',
    achievements: [
      'FLOCSS を用いた CSS 設計',
      'Gulp で構築していた季節ごとの LP を React + TypeScript + TailwindCSS に移行し、コンポーネント化・再利用可能な形に改善',
      'Next.js + microCMS で Headless CMS（Jamstack）を提案',
    ],
  },
]

const contactLinks = [
  { label: 'Wantedly', href: 'https://www.wantedly.com/id/gens' },
  { label: 'GitHub', href: 'https://github.com/GensIto' },
  { label: 'X', href: 'https://x.com/g67715570' },
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
          {workHistory.map((item) => (
            <TimelineItem
              key={item.company}
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
            {contactLinks.map((link) => (
              <LinkButton key={link.label} href={link.href} target="_blank">
                {link.label}
              </LinkButton>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
})
