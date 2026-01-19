import type { FC } from 'hono/jsx'

type PageHeadingProps = {
  title: string
  subtitle?: string
  centered?: boolean
}

export const PageHeading: FC<PageHeadingProps> = ({ title, subtitle, centered = false }) => {
  return (
    <div class={`flex flex-col gap-3 ${centered ? 'items-center text-center' : 'items-start'}`}>
      <h1 class="font-['Noto_Serif_JP'] font-medium text-3xl text-stone-900 leading-9">
        {title}
      </h1>
      {subtitle && (
        <p class="font-['Noto_Serif_JP'] text-base text-stone-500 leading-8 tracking-[0.32px]">
          {subtitle}
        </p>
      )}
    </div>
  )
}
