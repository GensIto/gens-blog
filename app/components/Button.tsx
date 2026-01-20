import type { FC, PropsWithChildren } from 'hono/jsx'

type BaseProps = {
  variant?: 'primary' | 'outline'
  class?: string
}

type ButtonProps = PropsWithChildren<
  BaseProps & {
    type?: 'button' | 'submit'
  }
>

type LinkButtonProps = PropsWithChildren<
  BaseProps & {
    href: string
    target?: '_blank' | '_self' | '_parent' | '_top'
  }
>

const getButtonClasses = (
  variant: 'primary' | 'outline',
  className: string
): string => {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 px-6 py-2.5 font-["Noto_Sans_JP"] font-medium text-sm tracking-[2.1px] transition-colors'

  const variantClasses =
    variant === 'primary'
      ? 'bg-stone-900 border border-stone-900 text-[#f8f6f1] hover:bg-stone-800'
      : 'bg-transparent border border-stone-900 text-stone-900 hover:bg-stone-100'

  return `${baseClasses} ${variantClasses} ${className}`
}

export const Button: FC<ButtonProps> = ({
  children,
  variant = 'outline',
  type = 'button',
  class: className = '',
}) => {
  return (
    <button type={type} class={getButtonClasses(variant, className)}>
      {children}
    </button>
  )
}

export const LinkButton: FC<LinkButtonProps> = ({
  children,
  variant = 'outline',
  href,
  target = '_blank',
  class: className = '',
}) => {
  return (
    <a href={href} target={target} class={getButtonClasses(variant, className)}>
      {children}
    </a>
  )
}
