import type { FC } from 'hono/jsx'

type SectionHeadingProps = {
  title: string
  centered?: boolean
  withUnderline?: boolean
}

export const SectionHeading: FC<SectionHeadingProps> = ({
  title,
  centered = true,
  withUnderline = true,
}) => {
  return (
    <div class={`flex flex-col gap-5 ${centered ? 'items-center' : 'items-start'}`}>
      <h2 class="font-['Noto_Serif_JP'] font-medium text-2xl text-stone-900 leading-8">
        {title}
      </h2>
      {withUnderline && <div class="w-16 h-px bg-[#7a9a7a]" />}
    </div>
  )
}
