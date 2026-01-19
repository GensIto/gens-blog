import type { FC } from 'hono/jsx'

type TextareaProps = {
  label: string
  name: string
  placeholder?: string
  value?: string
  rows?: number
  required?: boolean
}

export const Textarea: FC<TextareaProps> = ({
  label,
  name,
  placeholder,
  value,
  rows = 4,
  required = false,
}) => {
  return (
    <div class="flex flex-col gap-3">
      <label
        for={name}
        class="font-['Noto_Sans_JP'] font-medium text-sm text-stone-900 tracking-[2.1px]"
      >
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        rows={rows}
        required={required}
        class="w-full px-4 py-3 bg-white border border-stone-200 font-['Noto_Serif_JP'] text-base text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#7a9a7a] transition-colors resize-none"
      >
        {value}
      </textarea>
    </div>
  )
}
