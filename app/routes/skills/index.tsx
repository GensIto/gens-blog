import { createRoute } from 'honox/factory'
import { PageHeading } from '../../components/PageHeading'
import { SectionHeading } from '../../components/SectionHeading'
import { SkillBar } from '../../components/SkillBar'
import { PhilosophyItem } from '../../components/PhilosophyItem'

const skills = {
  languages: [
    { name: 'TypeScript', percentage: 90 },
    { name: 'Go', percentage: 80 },
    { name: 'SQL', percentage: 75 },
  ],
  backend: [
    { name: 'Hono', percentage: 85 },
    { name: 'tRPC', percentage: 80 },
    { name: 'Fastify', percentage: 75 },
  ],
  infrastructure: [
    { name: 'Cloudflare Workers', percentage: 85 },
    { name: 'D1', percentage: 75 },
    { name: 'Kubernetes', percentage: 70 },
  ],
}

const philosophy = [
  {
    title: '簡潔さを学ぶ',
    description: '必要十分な記述で、複雑さを排除し、シンプルさを目指す。',
  },
  {
    title: '境界を明確に',
    description: '責任の境界を明確に、内部は大胆に抽象化する。適切な粒度を見極める。',
  },
  {
    title: '変化を受け入れる',
    description: '要件は変わり得るものと心得、変更容易性を備えた設計を行う。',
  },
]

export default createRoute((c) => {
  return c.render(
    <div class="max-w-[848px] mx-auto px-6 py-12">
      {/* Header */}
      <PageHeading title="技術" subtitle="道具と思想" />

      {/* Languages Section */}
      <section class="mt-16">
        <h2 class="font-['Noto_Serif_JP'] font-medium text-xl text-stone-900 leading-7 mb-8">
          言語
        </h2>
        <div class="space-y-6">
          {skills.languages.map((skill) => (
            <SkillBar key={skill.name} name={skill.name} percentage={skill.percentage} />
          ))}
        </div>
      </section>

      {/* Backend Section */}
      <section class="mt-16">
        <h2 class="font-['Noto_Serif_JP'] font-medium text-xl text-stone-900 leading-7 mb-8">
          バックエンド
        </h2>
        <div class="space-y-6">
          {skills.backend.map((skill) => (
            <SkillBar key={skill.name} name={skill.name} percentage={skill.percentage} />
          ))}
        </div>
      </section>

      {/* Infrastructure Section */}
      <section class="mt-16">
        <h2 class="font-['Noto_Serif_JP'] font-medium text-xl text-stone-900 leading-7 mb-8">
          インフラ・プラットフォーム
        </h2>
        <div class="space-y-6">
          {skills.infrastructure.map((skill) => (
            <SkillBar key={skill.name} name={skill.name} percentage={skill.percentage} />
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section class="mt-24">
        <div class="mb-12">
          <SectionHeading title="技術哲学" />
        </div>

        <div class="space-y-12">
          {philosophy.map((item) => (
            <PhilosophyItem key={item.title} title={item.title} description={item.description} />
          ))}
        </div>
      </section>
    </div>
  )
})
