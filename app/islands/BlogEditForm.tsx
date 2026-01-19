import { useState } from 'hono/jsx'

type BlogFormData = {
  id?: string
  title: string
  slug: string
  excerpt: string
  content: string
  status: 'draft' | 'published'
  createdAt: string
}

type BlogEditFormProps = {
  initialData?: BlogFormData
}

export default function BlogEditForm({ initialData }: BlogEditFormProps) {
  const [formData, setFormData] = useState<BlogFormData>(
    initialData ?? {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      status: 'draft',
      createdAt: new Date().toISOString().split('T')[0],
    }
  )

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (
    e: Event & { currentTarget: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement }
  ) => {
    const { name, value } = e.currentTarget
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: Event, action: 'preview' | 'publish') => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const endpoint = initialData?.id ? `/api/blogs/${initialData.id}` : '/api/blogs'
      const method = initialData?.id ? 'PUT' : 'POST'

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          status: action === 'publish' ? 'published' : formData.status,
        }),
      })

      if (response.ok) {
        if (action === 'preview') {
          window.open(`/blog/${formData.slug}?preview=true`, '_blank')
        } else {
          window.location.href = '/admin'
        }
      }
    } catch (error) {
      console.error('Error saving blog:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form class="flex flex-col gap-8">
      {/* Title */}
      <div class="flex flex-col gap-3">
        <label
          for="title"
          class="font-['Noto_Sans_JP'] font-medium text-sm text-stone-900 tracking-[2.1px]"
        >
          題名
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onInput={handleChange}
          required
          class="w-full px-4 py-3 bg-white border border-stone-200 font-['Noto_Serif_JP'] text-base text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#7a9a7a] transition-colors"
        />
      </div>

      {/* Slug */}
      <div class="flex flex-col gap-3">
        <label
          for="slug"
          class="font-['Noto_Sans_JP'] font-medium text-sm text-stone-900 tracking-[2.1px]"
        >
          スラッグ（URL）
        </label>
        <div class="flex items-center gap-2">
          <span class="font-['Inter'] text-sm text-stone-400">/blog/</span>
          <input
            type="text"
            id="slug"
            name="slug"
            value={formData.slug}
            onInput={handleChange}
            required
            class="flex-1 px-4 py-3 bg-white border border-stone-200 font-['Inter'] text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#7a9a7a] transition-colors"
          />
        </div>
      </div>

      {/* Excerpt */}
      <div class="flex flex-col gap-3">
        <label
          for="excerpt"
          class="font-['Noto_Sans_JP'] font-medium text-sm text-stone-900 tracking-[2.1px]"
        >
          抜粋
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          value={formData.excerpt}
          onInput={handleChange}
          rows={3}
          class="w-full px-4 py-3 bg-white border border-stone-200 font-['Noto_Serif_JP'] text-base text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#7a9a7a] transition-colors resize-none"
        />
      </div>

      {/* Content */}
      <div class="flex flex-col gap-3">
        <label
          for="content"
          class="font-['Noto_Sans_JP'] font-medium text-sm text-stone-900 tracking-[2.1px]"
        >
          本文（Markdown）
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onInput={handleChange}
          rows={16}
          class="w-full px-4 py-3 bg-white border border-stone-200 font-['Inter'] text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#7a9a7a] transition-colors resize-none font-mono"
        />
      </div>

      {/* Date & Status */}
      <div class="flex gap-8">
        <div class="flex-1 flex flex-col gap-3">
          <label
            for="createdAt"
            class="font-['Noto_Sans_JP'] font-medium text-sm text-stone-900 tracking-[2.1px]"
          >
            作成日
          </label>
          <input
            type="date"
            id="createdAt"
            name="createdAt"
            value={formData.createdAt}
            onInput={handleChange}
            class="w-full px-4 py-3 bg-white border border-stone-200 font-['Noto_Sans_JP'] text-base text-stone-900 focus:outline-none focus:border-[#7a9a7a] transition-colors"
          />
        </div>
        <div class="flex-1 flex flex-col gap-3">
          <label
            for="status"
            class="font-['Noto_Sans_JP'] font-medium text-sm text-stone-900 tracking-[2.1px]"
          >
            状態
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            class="w-full px-4 py-3 bg-white border border-stone-200 font-['Noto_Sans_JP'] text-base text-stone-900 focus:outline-none focus:border-[#7a9a7a] transition-colors appearance-none cursor-pointer"
          >
            <option value="draft">下書き</option>
            <option value="published">公開</option>
          </select>
        </div>
      </div>

      {/* Buttons */}
      <div class="flex gap-4 pt-4">
        <button
          type="button"
          onClick={(e) => handleSubmit(e, 'preview')}
          disabled={isSubmitting}
          class="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-transparent border border-stone-900 text-stone-900 font-['Noto_Sans_JP'] font-medium text-sm tracking-[2.1px] hover:bg-stone-100 transition-colors disabled:opacity-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          プレビュー
        </button>
        <button
          type="button"
          onClick={(e) => handleSubmit(e, 'publish')}
          disabled={isSubmitting}
          class="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-stone-900 border border-stone-900 text-[#f8f6f1] font-['Noto_Sans_JP'] font-medium text-sm tracking-[2.1px] hover:bg-stone-800 transition-colors disabled:opacity-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12 19l7-7 3 3-7 7-3-3z" />
            <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
            <path d="M2 2l7.586 7.586" />
            <circle cx="11" cy="11" r="2" />
          </svg>
          公開する
        </button>
      </div>
    </form>
  )
}
