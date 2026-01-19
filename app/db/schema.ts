import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const admin = sqliteTable("admin", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const blogs = sqliteTable("blogs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  content: text("content").notNull(),
  published: integer("published", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const blogTags = sqliteTable("blog_tags", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  blogId: integer("blog_id").references(() => blogs.id, { onDelete: "cascade" }),
  tagId: integer("tag_id").references(() => tags.id, { onDelete: "cascade" }),
});

export const tags = sqliteTable("tags", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});