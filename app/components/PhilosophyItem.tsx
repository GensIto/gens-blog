import type { FC } from 'hono/jsx'

type PhilosophyItemProps = {
  title: string
  description: string
}

export const PhilosophyItem: FC<PhilosophyItemProps> = ({
  title,
  description,
}) => {
  return (
    <div class="border-l-2 border-[#7a9a7a] pl-6 py-1">
      <h3 class="font-['Noto_Serif_JP'] font-medium text-lg text-stone-900 leading-7">
        {title}
      </h3>
      <p class="mt-3 font-['Noto_Serif_JP'] text-base text-stone-500 leading-8 tracking-[0.32px]">
        {description}
      </p>
    </div>
  )
}
