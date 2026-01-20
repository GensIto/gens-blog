import type { FC } from 'hono/jsx'

type InputProps = {
  label: string
  name: string
  type?: 'text' | 'date' | 'email' | 'password' 
  placeholder?: string
  value?: string
  required?: boolean
  onInput?: (e: Event) => void
}

export const Input: FC<InputProps> = ({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  required = false,
  onInput,
}) => {
  return (
    <div class="flex flex-col gap-3">
      <label
        for={name}
        class="font-['Noto_Sans_JP'] font-medium text-sm text-stone-900 tracking-[2.1px]"
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        required={required}
        onInput={onInput}
        class="w-full px-4 py-3 bg-white border border-stone-200 font-['Noto_Serif_JP'] text-base text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#7a9a7a] transition-colors"
      />
    </div>
  )
}
