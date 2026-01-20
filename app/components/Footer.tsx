import type { FC } from 'hono/jsx'
import { EnsoCircle } from './EnsoCircle'

export const Footer: FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer class="border-t border-stone-200 pt-8 px-6 pb-8 md:px-[165.5px]">
      <div class="flex items-center justify-between">
        <EnsoCircle size={32} />
        <span class="font-['Noto_Sans_JP'] text-sm text-stone-400">
          © {currentYear}
        </span>
      </div>
    </footer>
  )
}
