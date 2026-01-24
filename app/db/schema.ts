import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const admin = sqliteTable("admin", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: text("createdAt")
    .notNull()
    .default(sql`(datetime('now'))`),
});

export const blogs = sqliteTable("blogs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  status: text("status", { enum: ["draft", "published"] }).notNull().default("draft"),
  createdAt: text("createdAt")
      .notNull()
      .default(sql`(datetime('now'))`),
  updatedAt: text("updatedAt")
      .notNull()
      .default(sql`(datetime('now'))`),
});

export const blogTags = sqliteTable("blog_tags", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  blogId: integer("blog_id").references(() => blogs.id, { onDelete: "cascade" }),
  tagId: integer("tag_id").references(() => tags.id, { onDelete: "cascade" }),
});

export const tags = sqliteTable("tags", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  createdAt: text("createdAt")
    .notNull()
    .default(sql`(datetime('now'))`),
  updatedAt: text("updatedAt")
    .notNull()
    .default(sql`(datetime('now'))`),
});