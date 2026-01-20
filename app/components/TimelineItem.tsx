import type { FC } from 'hono/jsx'

type TimelineItemProps = {
  period: string
  company: string
  role: string
  description: string
  skills?: string[]
  achievements?: string[]
}

export const TimelineItem: FC<TimelineItemProps> = ({
  period,
  company,
  role,
  description,
  skills,
  achievements,
}) => {
  return (
    <div class="relative border-l border-stone-200 pl-8">
      {/* Dot */}
      <div class="absolute -left-1 top-2 w-2 h-2 rounded-full bg-[#7a9a7a]" />

      <span class="font-['Noto_Sans_JP'] text-sm text-stone-400 tracking-[0.7px]">{period}</span>
      <h3 class="mt-2 font-['Noto_Serif_JP'] font-medium text-lg text-stone-900 leading-7">
        {company}
      </h3>
      <p class="mt-2 font-['Noto_Sans_JP'] text-sm text-stone-400 tracking-[2.1px]">{role}</p>

      {skills && skills.length > 0 && (
        <div class="mt-3 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              class="px-2 py-1 text-xs font-['Noto_Sans_JP'] text-stone-600 bg-stone-100 rounded"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      <p class="mt-4 font-['Noto_Serif_JP'] text-base text-stone-500 leading-8 tracking-[0.32px]">
        {description}
      </p>

      {achievements && achievements.length > 0 && (
        <ul class="mt-4 space-y-2">
          {achievements.map((achievement) => (
            <li
              key={achievement}
              class="font-['Noto_Serif_JP'] text-sm text-stone-500 leading-7 tracking-[0.28px] pl-4 relative before:content-[''] before:absolute before:left-0 before:top-3 before:w-1.5 before:h-1.5 before:bg-[#7a9a7a] before:rounded-full"
            >
              {achievement}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
