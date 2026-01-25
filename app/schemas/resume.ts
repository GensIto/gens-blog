import { z } from 'zod'

// 職歴のスキーマ
export const workHistoryCreateSchema = z.object({
  period: z.string().min(1, '期間は必須です'),
  company: z.string().min(1, '会社名は必須です'),
  role: z.string().min(1, '役職は必須です'),
  skills: z.array(z.string()).min(1, 'スキルを1つ以上入力してください'),
  description: z.string().min(1, '説明は必須です'),
  achievements: z.array(z.string()),
  displayOrder: z.number().int().default(0),
})

export const workHistoryUpdateSchema = workHistoryCreateSchema.partial().extend({
  id: z.number().int().positive(),
})

export type WorkHistoryCreate = z.infer<typeof workHistoryCreateSchema>
export type WorkHistoryUpdate = z.infer<typeof workHistoryUpdateSchema>

// 連絡先リンクのスキーマ
export const contactLinkCreateSchema = z.object({
  label: z.string().min(1, 'ラベルは必須です'),
  href: z.string().url('有効なURLを入力してください'),
  displayOrder: z.number().int().default(0),
})

export const contactLinkUpdateSchema = contactLinkCreateSchema.partial().extend({
  id: z.number().int().positive(),
})

export type ContactLinkCreate = z.infer<typeof contactLinkCreateSchema>
export type ContactLinkUpdate = z.infer<typeof contactLinkUpdateSchema>
