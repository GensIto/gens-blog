import type { FC } from 'hono/jsx'
import { EnsoCircle } from './EnsoCircle'

type NavItem = {
  label: string
  href: string
}

const navItems: NavItem[] = [
  { label: '記録', href: '/blog' },
  { label: '経歴', href: '/resume' },
  { label: '技術', href: '/skills' },
  { label: '管理', href: '/admin' },
]

export const Header: FC = () => {
  return (
    <header class="border-b border-stone-200 px-6 py-3 md:px-[165.5px]">
      <nav class="flex items-center justify-between h-8">
        {/* Logo */}
        <a href="/" class="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <EnsoCircle size={32} />
          <span class="font-['Cormorant_Garamond'] text-lg text-stone-900 tracking-[4.5px] opacity-80">
            ZEN
          </span>
        </a>

        {/* Navigation Links */}
        <div class="flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              class="font-['Noto_Sans_JP'] text-sm text-stone-500 tracking-[2.1px] hover:text-stone-900 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}
