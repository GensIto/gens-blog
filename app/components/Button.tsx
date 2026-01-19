import type { FC, PropsWithChildren } from 'hono/jsx'

type ButtonProps = PropsWithChildren<{
  variant?: 'primary' | 'outline'
  type?: 'button' | 'submit'
  href?: string
  class?: string
}>

export const Button: FC<ButtonProps> = ({
  children,
  variant = 'outline',
  type = 'button',
  href,
  class: className = '',
}) => {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 px-6 py-2.5 font-["Noto_Sans_JP"] font-medium text-sm tracking-[2.1px] transition-colors'

  const variantClasses =
    variant === 'primary'
      ? 'bg-stone-900 border border-stone-900 text-[#f8f6f1] hover:bg-stone-800'
      : 'bg-transparent border border-stone-900 text-stone-900 hover:bg-stone-100'

  const combinedClasses = `${baseClasses} ${variantClasses} ${className}`

  if (href) {
    return (
      <a href={href} class={combinedClasses}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} class={combinedClasses}>
      {children}
    </button>
  )
}
