import type { FC } from 'hono/jsx'

type FooterLink = {
  label: string
  href: string
}

const footerLinks: FooterLink[] = [
  { label: '一覧へ戻る', href: '/blog' },
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'Twitter', href: 'https://twitter.com' },
  { label: 'RSS', href: '/rss' },
]

export const Footer: FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer class="border-t border-stone-200 pt-8 px-6 pb-8 md:px-[165.5px]">
      <div class="flex items-center justify-between">
        <div class="flex items-start gap-6">
          {footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              class="font-['Noto_Sans_JP'] text-sm text-stone-400 tracking-[2.1px] hover:text-stone-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
        <span class="font-['Noto_Sans_JP'] text-sm text-stone-400">
          © {currentYear}
        </span>
      </div>
    </footer>
  )
}
