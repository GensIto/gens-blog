import type { FC } from 'hono/jsx'

type SkillBarProps = {
  name: string
  percentage: number
}

export const SkillBar: FC<SkillBarProps> = ({ name, percentage }) => {
  return (
    <div class="flex flex-col gap-2">
      <div class="flex items-start justify-between">
        <span class="font-['Noto_Serif_JP'] text-base text-stone-500 leading-6">
          {name}
        </span>
        <span class="font-['Noto_Sans_JP'] text-sm text-stone-400 leading-5">
          {percentage}%
        </span>
      </div>
      <div class="relative h-px bg-stone-200 w-full">
        <div
          class="absolute left-0 top-0 h-px bg-[#7a9a7a]"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
