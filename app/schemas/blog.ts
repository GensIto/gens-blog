import { z } from "zod";

export const blogCreateSchema = z.object({
  title: z.string().min(1, "題名は必須です"),
  slug: z
    .string()
    .min(1, "スラッグは必須です")
    .regex(/^[a-z0-9-]+$/, "スラッグは小文字、数字、ハイフンのみ使用できます"),
  excerpt: z.string().optional(),
  content: z.string().min(1, "本文は必須です"),
  status: z.enum(["draft", "published"]),
  createdAt: z.string(),
});

export const blogUpdateSchema = blogCreateSchema;

export type BlogCreate = z.infer<typeof blogCreateSchema>;
export type BlogUpdate = z.infer<typeof blogUpdateSchema>;
