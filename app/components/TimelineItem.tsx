import type { FC } from 'hono/jsx'

type TimelineItemProps = {
  period: string
  company: string
  role: string
  description: string
}

export const TimelineItem: FC<TimelineItemProps> = ({ period, company, role, description }) => {
  return (
    <div class="relative border-l border-stone-200 pl-8">
      {/* Dot */}
      <div class="absolute -left-1 top-2 w-2 h-2 rounded-full bg-[#7a9a7a]" />

      <span class="font-['Noto_Sans_JP'] text-sm text-stone-400 tracking-[0.7px]">
        {period}
      </span>
      <h3 class="mt-2 font-['Noto_Serif_JP'] font-medium text-lg text-stone-900 leading-7">
        {company}
      </h3>
      <p class="mt-2 font-['Noto_Sans_JP'] text-sm text-stone-400 tracking-[2.1px]">
        {role}
      </p>
      <p class="mt-4 font-['Noto_Serif_JP'] text-base text-stone-500 leading-8 tracking-[0.32px]">
        {description}
      </p>
    </div>
  )
}
