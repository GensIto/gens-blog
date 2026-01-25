import { useState, useTransition, useEffect } from "hono/jsx";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { blogUpdateSchema } from "../schemas/blog";
import { client } from "../lib/client";
import { Modal } from "../components";

type BlogFormData = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  status: "draft" | "published";
  createdAt: string;
};

function MarkdownPreview({ content }: { content: string }) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    async function renderMarkdown() {
      const rendered = await marked.parse(content);
      setHtml(DOMPurify.sanitize(rendered));
    }
    renderMarkdown();
  }, [content]);

  return (
    <article class='prose prose-stone prose-lg max-w-none'>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}

type BlogEditFormProps = {
  id: string;
};

export default function BlogEditForm({ id }: BlogEditFormProps) {
  const [isPending, startTransition] = useTransition();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewContent, setPreviewContent] = useState({
    title: "",
    content: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [blogData, setBlogData] = useState<BlogFormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: QueryのライブラリかSSRに寄せたい
    async function fetchBlog() {
      try {
        const response = await client.api.blogs[":id"].$get({
          param: { id },
        });
        const result = await response.json();
        if (result.success) {
          setBlogData(result.blog);
        }
      } catch (error) {
        setErrors({ _form: "ブログの取得に失敗しました" });
      } finally {
        setIsLoading(false);
      }
    }
    fetchBlog();
  }, [id]);

  if (isLoading) {
    return (
      <div class='flex items-center justify-center py-16'>
        <span class="font-['Noto_Sans_JP'] text-stone-500">読み込み中...</span>
      </div>
    );
  }

  if (!blogData) {
    return (
      <div class="px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-sm font-['Noto_Sans_JP']">
        {errors._form || "ブログが見つかりませんでした"}
      </div>
    );
  }

  const handlePreviewClick = (e: Event) => {
    e.preventDefault();
    const form = (e.target as HTMLElement).closest("form");
    if (!form) return;

    const formData = new FormData(form);
    setPreviewContent({
      title: (formData.get("title") as string) || "(無題)",
      content: formData.get("content") as string,
    });
    setIsPreviewOpen(true);
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    startTransition(async () => {
      setErrors({});

      try {
        const blogData = {
          title: formData.get("title") as string,
          slug: formData.get("slug") as string,
          content: formData.get("content") as string,
          status: formData.get("status") as "draft" | "published",
          createdAt: formData.get("createdAt") as string,
        };

        // Validate with Zod schema
        const validation = blogUpdateSchema.safeParse(blogData);
        if (!validation.success) {
          const fieldErrors: Record<string, string> = {};
          validation.error.issues.forEach((issue) => {
            if (issue.path[0]) {
              fieldErrors[issue.path[0].toString()] = issue.message;
            }
          });
          setErrors(fieldErrors);
          return;
        }

        const response = await client.api.blogs[":id"].$put({
          json: blogData,
          param: { id },
        });

        const result = await response.json();

        if (response.ok && result.success) {
          window.location.href = "/admin";
        } else if (!result.success) {
          setErrors({ _form: result.error || "ブログの更新に失敗しました" });
        }
      } catch (error) {
        setErrors({ _form: "通信エラーが発生しました" });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} class='flex flex-col gap-8'>
      {/* Form-level errors */}
      {errors._form && (
        <div class="px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-sm font-['Noto_Sans_JP']">
          {errors._form}
        </div>
      )}

      {/* Title */}
      <div class='flex flex-col gap-3'>
        <label
          for='title'
          class="font-['Noto_Sans_JP'] font-medium text-sm text-stone-900 tracking-[2.1px]"
        >
          題名
        </label>
        <input
          type='text'
          id='title'
          name='title'
          value={blogData.title}
          required
          class={`w-full px-4 py-3 bg-white border font-['Noto_Serif_JP'] text-base text-stone-900 placeholder:text-stone-400 focus:outline-none transition-colors ${
            errors.title
              ? "border-red-500 focus:border-red-500"
              : "border-stone-200 focus:border-[#7a9a7a]"
          }`}
        />
        {errors.title && (
          <p class="text-red-600 text-sm font-['Noto_Sans_JP']">
            {errors.title}
          </p>
        )}
      </div>

      {/* Slug */}
      <div class='flex flex-col gap-3'>
        <label
          for='slug'
          class="font-['Noto_Sans_JP'] font-medium text-sm text-stone-900 tracking-[2.1px]"
        >
          スラッグ（URL）
        </label>
        <div class='flex items-center gap-2'>
          <span class="font-['Inter'] text-sm text-stone-400">/blog/</span>
          <input
            type='text'
            id='slug'
            name='slug'
            value={blogData.slug}
            required
            class={`flex-1 px-4 py-3 bg-white border font-['Inter'] text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none transition-colors ${
              errors.slug
                ? "border-red-500 focus:border-red-500"
                : "border-stone-200 focus:border-[#7a9a7a]"
            }`}
          />
        </div>
        {errors.slug && (
          <p class="text-red-600 text-sm font-['Noto_Sans_JP']">
            {errors.slug}
          </p>
        )}
      </div>

      {/* Content */}
      <div class='flex flex-col gap-3'>
        <label
          for='content'
          class="font-['Noto_Sans_JP'] font-medium text-sm text-stone-900 tracking-[2.1px]"
        >
          本文（Markdown）
        </label>
        <textarea
          id='content'
          name='content'
          value={blogData.content}
          rows={16}
          class={`w-full px-4 py-3 bg-white border font-['Inter'] text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none transition-colors resize-none font-mono ${
            errors.content
              ? "border-red-500 focus:border-red-500"
              : "border-stone-200 focus:border-[#7a9a7a]"
          }`}
        />
        {errors.content && (
          <p class="text-red-600 text-sm font-['Noto_Sans_JP']">
            {errors.content}
          </p>
        )}
      </div>

      {/* Date & Status */}
      <div class='flex gap-8'>
        <div class='flex-1 flex flex-col gap-3'>
          <label
            for='createdAt'
            class="font-['Noto_Sans_JP'] font-medium text-sm text-stone-900 tracking-[2.1px]"
          >
            作成日
          </label>
          <input
            type='date'
            id='createdAt'
            name='createdAt'
            value={blogData.createdAt}
            class="w-full px-4 py-3 bg-white border border-stone-200 font-['Noto_Sans_JP'] text-base text-stone-900 focus:outline-none focus:border-[#7a9a7a] transition-colors"
          />
        </div>
        <div class='flex-1 flex flex-col gap-3'>
          <label
            for='status'
            class="font-['Noto_Sans_JP'] font-medium text-sm text-stone-900 tracking-[2.1px]"
          >
            状態
          </label>
          <select
            id='status'
            name='status'
            value={blogData.status}
            class="w-full px-4 py-3 bg-white border border-stone-200 font-['Noto_Sans_JP'] text-base text-stone-900 focus:outline-none focus:border-[#7a9a7a] transition-colors appearance-none cursor-pointer"
          >
            <option value='draft'>下書き</option>
            <option value='published'>公開</option>
          </select>
        </div>
      </div>

      {/* Buttons */}
      <div class='flex gap-4 pt-4'>
        <button
          type='button'
          onClick={handlePreviewClick}
          disabled={isPending}
          class="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-transparent border border-stone-900 text-stone-900 font-['Noto_Sans_JP'] font-medium text-sm tracking-[2.1px] hover:bg-stone-100 transition-colors disabled:opacity-50"
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
          >
            <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />
            <circle cx='12' cy='12' r='3' />
          </svg>
          プレビュー
        </button>
        <button
          type='submit'
          disabled={isPending}
          class="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-stone-900 border border-stone-900 text-[#f8f6f1] font-['Noto_Sans_JP'] font-medium text-sm tracking-[2.1px] hover:bg-stone-800 transition-colors disabled:opacity-50"
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
          >
            <path d='M12 19l7-7 3 3-7 7-3-3z' />
            <path d='M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z' />
            <path d='M2 2l7.586 7.586' />
            <circle cx='11' cy='11' r='2' />
          </svg>
          更新する
        </button>
      </div>

      {/* Preview Modal */}
      <Modal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        title={previewContent.title}
        maxWidth='2xl'
      >
        <MarkdownPreview content={previewContent.content} />
      </Modal>
    </form>
  );
}
