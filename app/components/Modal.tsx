import type { FC } from 'hono/jsx'
import { useEffect } from 'hono/jsx'
import { XIcon } from './Icons'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: any
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
}

export const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'xl',
}) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // ESC key handler
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    if (isOpen) {
      window.addEventListener('keydown', handleEsc)
    }
    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      class="fixed inset-0 z-40 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div class="absolute inset-0 bg-stone-900/50 transition-opacity" />

      {/* Modal Container */}
      <div
        class={`relative z-50 w-full ${maxWidthClasses[maxWidth]} max-h-[90vh] bg-[#f8f6f1] border border-stone-200 shadow-2xl overflow-hidden flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div class="flex items-center justify-between p-6 md:p-8 border-b border-stone-200">
          {title && (
            <h2 class="font-['Noto_Serif_JP'] font-medium text-2xl text-stone-900 pr-8">
              {title}
            </h2>
          )}
          <button
            type="button"
            onClick={onClose}
            class="ml-auto text-stone-500 hover:text-stone-900 transition-colors"
            aria-label="閉じる"
          >
            <XIcon size={24} />
          </button>
        </div>

        {/* Content */}
        <div class="overflow-y-auto p-6 md:p-8">
          {children}
        </div>
      </div>
    </div>
  )
}
