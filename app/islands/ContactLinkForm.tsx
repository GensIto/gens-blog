import { useState, useTransition, useEffect } from 'hono/jsx'
import { contactLinkCreateSchema } from '../schemas/resume'
import { client } from '../lib/client'

type ContactLinkData = {
  id: number
  label: string
  href: string
  displayOrder: number
}

type ContactLinkFormProps = {
  id?: string
  onSuccess?: () => void
  onCancel?: () => void
}

export default function ContactLinkForm({
  id,
  onSuccess,
  onCancel,
}: ContactLinkFormProps) {
  const [isPending, startTransition] = useTransition()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState<Partial<ContactLinkData>>({
    label: '',
    href: '',
    displayOrder: 0,
  })
  const [isLoading, setIsLoading] = useState(!!id)

  const isEditMode = !!id

  useEffect(() => {
    if (id) {
      const currentId = id
      async function fetchContactLink() {
        try {
          const response = await client.api['contact-links'][':id'].$get({
            param: { id: currentId },
          })
          const result = await response.json()
          if (result.success) {
            setFormData(result.contactLink)
          }
        } catch (_error) {
          setErrors({ _form: '連絡先リンクの取得に失敗しました' })
        } finally {
          setIsLoading(false)
        }
      }
      fetchContactLink()
    }
  }, [id])

  if (isLoading) {
    return (
      <div class="flex items-center justify-center py-8">
        <span class="font-['Noto_Sans_JP'] text-stone-500">読み込み中...</span>
      </div>
    )
  }

  const handleSubmit = (e: Event) => {
    e.preventDefault()

    startTransition(async () => {
      setErrors({})

      try {
        const data = {
          label: formData.label || '',
          href: formData.href || '',
          displayOrder: formData.displayOrder || 0,
        }

        // Validate
        const validation = contactLinkCreateSchema.safeParse(data)
        if (!validation.success) {
          const fieldErrors: Record<string, string> = {}
          validation.error.issues.forEach((issue) => {
            if (issue.path[0]) {
              fieldErrors[issue.path[0].toString()] = issue.message
            }
          })
          setErrors(fieldErrors)
          return
        }

        let response
        if (isEditMode) {
          response = await client.api['contact-links'][':id'].$put({
            param: { id: id! },
            json: { ...data, id: Number(id) },
          })
        } else {
          response = await client.api['contact-links'].$post({
            json: data,
          })
        }

        const result = (await response.json()) as {
          success: boolean
          error?: string
        }

        if (response.ok && result.success) {
          onSuccess?.()
        } else if (!result.success) {
          setErrors({
            _form: result.error || '連絡先リンクの保存に失敗しました',
          })
        }
      } catch (_error) {
        setErrors({ _form: '通信エラーが発生しました' })
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} class="flex flex-col gap-6">
      {errors._form && (
        <div class="px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-sm font-['Noto_Sans_JP']">
          {errors._form}
        </div>
      )}

      {/* ラベル */}
      <div class="flex flex-col gap-2">
        <label
          for="label"
          class="font-['Noto_Sans_JP'] font-medium text-sm text-stone-900"
        >
          ラベル
        </label>
        <input
          type="text"
          id="label"
          value={formData.label}
          onInput={(e) =>
            setFormData({ ...formData, label: (e.target as HTMLInputElement).value })
          }
          placeholder="例: GitHub"
          class={`w-full px-4 py-3 bg-white border font-['Noto_Sans_JP'] text-base text-stone-900 placeholder:text-stone-400 focus:outline-none transition-colors ${
            errors.label
              ? 'border-red-500 focus:border-red-500'
              : 'border-stone-200 focus:border-[#7a9a7a]'
          }`}
        />
        {errors.label && (
          <p class="text-red-600 text-sm font-['Noto_Sans_JP']">
            {errors.label}
          </p>
        )}
      </div>

      {/* URL */}
      <div class="flex flex-col gap-2">
        <label
          for="href"
          class="font-['Noto_Sans_JP'] font-medium text-sm text-stone-900"
        >
          URL
        </label>
        <input
          type="url"
          id="href"
          value={formData.href}
          onInput={(e) =>
            setFormData({ ...formData, href: (e.target as HTMLInputElement).value })
          }
          placeholder="例: https://github.com/username"
          class={`w-full px-4 py-3 bg-white border font-['Noto_Sans_JP'] text-base text-stone-900 placeholder:text-stone-400 focus:outline-none transition-colors ${
            errors.href
              ? 'border-red-500 focus:border-red-500'
              : 'border-stone-200 focus:border-[#7a9a7a]'
          }`}
        />
        {errors.href && (
          <p class="text-red-600 text-sm font-['Noto_Sans_JP']">{errors.href}</p>
        )}
      </div>

      {/* 表示順 */}
      <div class="flex flex-col gap-2">
        <label
          for="displayOrder"
          class="font-['Noto_Sans_JP'] font-medium text-sm text-stone-900"
        >
          表示順
        </label>
        <input
          type="number"
          id="displayOrder"
          value={formData.displayOrder}
          onInput={(e) =>
            setFormData({
              ...formData,
              displayOrder: parseInt((e.target as HTMLInputElement).value) || 0,
            })
          }
          class="w-full px-4 py-3 bg-white border border-stone-200 font-['Noto_Sans_JP'] text-base text-stone-900 focus:outline-none focus:border-[#7a9a7a] transition-colors"
        />
      </div>

      {/* ボタン */}
      <div class="flex gap-4 pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isPending}
            class="inline-flex items-center justify-center px-6 py-2.5 bg-transparent border border-stone-900 text-stone-900 font-['Noto_Sans_JP'] font-medium text-sm hover:bg-stone-100 transition-colors disabled:opacity-50"
          >
            キャンセル
          </button>
        )}
        <button
          type="submit"
          disabled={isPending}
          class="inline-flex items-center justify-center px-6 py-2.5 bg-stone-900 border border-stone-900 text-[#f8f6f1] font-['Noto_Sans_JP'] font-medium text-sm hover:bg-stone-800 transition-colors disabled:opacity-50"
        >
          {isPending ? '保存中...' : isEditMode ? '更新する' : '作成する'}
        </button>
      </div>
    </form>
  )
}
