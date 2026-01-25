import type { FC } from 'hono/jsx'

type SelectOption = {
  label: string
  value: string
}

type SelectProps = {
  label: string
  name: string
  options: SelectOption[]
  value?: string
  required?: boolean
}

export const Select: FC<SelectProps> = ({
  label,
  name,
  options,
  value,
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
      <select
        id={name}
        name={name}
        required={required}
        class="w-full px-4 py-3 bg-white border border-stone-200 font-['Noto_Sans_JP'] text-base text-stone-900 focus:outline-none focus:border-[#7a9a7a] transition-colors appearance-none cursor-pointer"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            selected={option.value === value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
