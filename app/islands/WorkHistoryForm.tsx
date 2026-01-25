import { useState, useTransition, useEffect } from 'hono/jsx'
import { workHistoryCreateSchema } from '../schemas/resume'
import { client } from '../lib/client'

type WorkHistoryData = {
  id: number
  period: string
  company: string
  role: string
  skills: string[]
  description: string
  achievements: string[]
  displayOrder: number
}

type WorkHistoryFormProps = {
  id?: string
  onSuccess?: () => void
  onCancel?: () => void
}

export default function WorkHistoryForm({
  id,
  onSuccess,
  onCancel,
}: WorkHistoryFormProps) {
  const [isPending, startTransition] = useTransition()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState<Partial<WorkHistoryData>>({
    period: '',
    company: '',
    role: '',
    skills: [],
    description: '',
    achievements: [],
    displayOrder: 0,
  })
  const [skillsInput, setSkillsInput] = useState('')
  const [achievementsInput, setAchievementsInput] = useState('')
  const [isLoading, setIsLoading] = useState(!!id)

  const isEditMode = !!id

  useEffect(() => {
    if (id) {
      const currentId = id
      async function fetchWorkHistory() {
        try {
          const response = await client.api['work-histories'][':id'].$get({
            param: { id: currentId },
          })
          const result = await response.json()
          if (result.success) {
            setFormData(result.workHistory)
            setSkillsInput(result.workHistory.skills.join(', '))
            setAchievementsInput(result.workHistory.achievements.join('\n'))
          }
        } catch (_error) {
          setErrors({ _form: '職歴の取得に失敗しました' })
        } finally {
          setIsLoading(false)
        }
      }
      fetchWorkHistory()
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
        const skills = skillsInput
          .split(',')
          .map((s) => s.trim())
          .filter((s) => s)
        const achievements = achievementsInput
          .split('\n')
          .map((a) => a.trim())
          .filter((a) => a)

        const data = {
          period: formData.period || '',
          company: formData.company || '',
          role: formData.role || '',
          skills,
          description: formData.description || '',
          achievements,
          displayOrder: formData.displayOrder || 0,
        }

        // Validate
        const validation = workHistoryCreateSchema.safeParse(data)
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
          response = await client.api['work-histories'][':id'].$put({
            param: { id: id! },
            json: { ...data, id: Number(id) },
          })
        } else {
          response = await client.api['work-histories'].$post({
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
            _form: result.error || '職歴の保存に失敗しました',
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

      {/* 期間 */}
      <div class="flex flex-col gap-2">
        <label
          for="period"
          class="font-['Noto_Sans_JP'] font-medium text-sm text-stone-900"
        >
          期間
        </label>
        <input
          type="text"
          id="period"
          value={formData.period}
          onInput={(e) =>
            setFormData({ ...formData, period: (e.target as HTMLInputElement).value })
          }
          placeholder="例: 2023年1月 - 現在"
          class={`w-full px-4 py-3 bg-white border font-['Noto_Sans_JP'] text-base text-stone-900 placeholder:text-stone-400 focus:outline-none transition-colors ${
            errors.period
              ? 'border-red-500 focus:border-red-500'
              : 'border-stone-200 focus:border-[#7a9a7a]'
          }`}
        />
        {errors.period && (
          <p class="text-red-600 text-sm font-['Noto_Sans_JP']">
            {errors.period}
          </p>
        )}
      </div>

      {/* 会社名 */}
      <div class="flex flex-col gap-2">
        <label
          for="company"
          class="font-['Noto_Sans_JP'] font-medium text-sm text-stone-900"
        >
          会社名
        </label>
        <input
          type="text"
          id="company"
          value={formData.company}
          onInput={(e) =>
            setFormData({ ...formData, company: (e.target as HTMLInputElement).value })
          }
          placeholder="例: 株式会社○○"
          class={`w-full px-4 py-3 bg-white border font-['Noto_Sans_JP'] text-base text-stone-900 placeholder:text-stone-400 focus:outline-none transition-colors ${
            errors.company
              ? 'border-red-500 focus:border-red-500'
              : 'border-stone-200 focus:border-[#7a9a7a]'
          }`}
        />
        {errors.company && (
          <p class="text-red-600 text-sm font-['Noto_Sans_JP']">
            {errors.company}
          </p>
        )}
      </div>

      {/* 役職 */}
      <div class="flex flex-col gap-2">
        <label
          for="role"
          class="font-['Noto_Sans_JP'] font-medium text-sm text-stone-900"
        >
          役職
        </label>
        <input
          type="text"
          id="role"
          value={formData.role}
          onInput={(e) =>
            setFormData({ ...formData, role: (e.target as HTMLInputElement).value })
          }
          placeholder="例: フロントエンドエンジニア"
          class={`w-full px-4 py-3 bg-white border font-['Noto_Sans_JP'] text-base text-stone-900 placeholder:text-stone-400 focus:outline-none transition-colors ${
            errors.role
              ? 'border-red-500 focus:border-red-500'
              : 'border-stone-200 focus:border-[#7a9a7a]'
          }`}
        />
        {errors.role && (
          <p class="text-red-600 text-sm font-['Noto_Sans_JP']">{errors.role}</p>
        )}
      </div>

      {/* スキル */}
      <div class="flex flex-col gap-2">
        <label
          for="skills"
          class="font-['Noto_Sans_JP'] font-medium text-sm text-stone-900"
        >
          スキル（カンマ区切り）
        </label>
        <input
          type="text"
          id="skills"
          value={skillsInput}
          onInput={(e) => setSkillsInput((e.target as HTMLInputElement).value)}
          placeholder="例: React, TypeScript, Next.js"
          class={`w-full px-4 py-3 bg-white border font-['Noto_Sans_JP'] text-base text-stone-900 placeholder:text-stone-400 focus:outline-none transition-colors ${
            errors.skills
              ? 'border-red-500 focus:border-red-500'
              : 'border-stone-200 focus:border-[#7a9a7a]'
          }`}
        />
        {errors.skills && (
          <p class="text-red-600 text-sm font-['Noto_Sans_JP']">
            {errors.skills}
          </p>
        )}
      </div>

      {/* 説明 */}
      <div class="flex flex-col gap-2">
        <label
          for="description"
          class="font-['Noto_Sans_JP'] font-medium text-sm text-stone-900"
        >
          説明
        </label>
        <textarea
          id="description"
          value={formData.description}
          onInput={(e) =>
            setFormData({
              ...formData,
              description: (e.target as HTMLTextAreaElement).value,
            })
          }
          rows={3}
          placeholder="担当業務の概要を記入"
          class={`w-full px-4 py-3 bg-white border font-['Noto_Sans_JP'] text-base text-stone-900 placeholder:text-stone-400 focus:outline-none transition-colors resize-none ${
            errors.description
              ? 'border-red-500 focus:border-red-500'
              : 'border-stone-200 focus:border-[#7a9a7a]'
          }`}
        />
        {errors.description && (
          <p class="text-red-600 text-sm font-['Noto_Sans_JP']">
            {errors.description}
          </p>
        )}
      </div>

      {/* 実績 */}
      <div class="flex flex-col gap-2">
        <label
          for="achievements"
          class="font-['Noto_Sans_JP'] font-medium text-sm text-stone-900"
        >
          実績（1行に1つ）
        </label>
        <textarea
          id="achievements"
          value={achievementsInput}
          onInput={(e) =>
            setAchievementsInput((e.target as HTMLTextAreaElement).value)
          }
          rows={4}
          placeholder="実績を1行に1つずつ記入"
          class="w-full px-4 py-3 bg-white border border-stone-200 font-['Noto_Sans_JP'] text-base text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#7a9a7a] transition-colors resize-none"
        />
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
