import { sql } from 'drizzle-orm'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const admin = sqliteTable('admin', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  createdAt: text('createdAt')
    .notNull()
    .default(sql`(datetime('now'))`),
})

export const blogs = sqliteTable('blogs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  excerpt: text('excerpt'),
  content: text('content').notNull(),
  status: text('status', { enum: ['draft', 'published'] })
    .notNull()
    .default('draft'),
  createdAt: text('createdAt')
    .notNull()
    .default(sql`(datetime('now'))`),
  updatedAt: text('updatedAt')
    .notNull()
    .default(sql`(datetime('now'))`),
})

export const blogTags = sqliteTable('blog_tags', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  blogId: integer('blog_id').references(() => blogs.id, {
    onDelete: 'cascade',
  }),
  tagId: integer('tag_id').references(() => tags.id, { onDelete: 'cascade' }),
})

export const tags = sqliteTable('tags', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
  createdAt: text('createdAt')
    .notNull()
    .default(sql`(datetime('now'))`),
  updatedAt: text('updatedAt')
    .notNull()
    .default(sql`(datetime('now'))`),
})

// 職歴テーブル
export const workHistories = sqliteTable('work_histories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  period: text('period').notNull(), // 例: "2025年10月 - 現在"
  company: text('company').notNull(),
  role: text('role').notNull(),
  skills: text('skills', { mode: 'json' }).$type<string[]>().notNull(), // JSONとして保存
  description: text('description').notNull(),
  achievements: text('achievements', { mode: 'json' }).$type<string[]>().notNull(), // JSONとして保存
  displayOrder: integer('display_order').notNull().default(0),
  createdAt: text('createdAt')
    .notNull()
    .default(sql`(datetime('now'))`),
  updatedAt: text('updatedAt')
    .notNull()
    .default(sql`(datetime('now'))`),
})

// 連絡先リンクテーブル
export const contactLinks = sqliteTable('contact_links', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  label: text('label').notNull(), // 例: "GitHub"
  href: text('href').notNull(),
  displayOrder: integer('display_order').notNull().default(0),
  createdAt: text('createdAt')
    .notNull()
    .default(sql`(datetime('now'))`),
  updatedAt: text('updatedAt')
    .notNull()
    .default(sql`(datetime('now'))`),
})
