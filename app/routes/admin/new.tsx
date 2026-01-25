import { createRoute } from "honox/factory";
import { ArrowLeftIcon } from "../../components/Icons";
import BlogCreateForm from "../../islands/BlogCreateForm";

export default createRoute((c) => {
  return c.render(
    <div class='max-w-[848px] mx-auto px-6 py-12'>
      {/* Back Link */}
      <a
        href='/admin'
        class="inline-flex items-center gap-2 font-['Noto_Sans_JP'] text-sm text-stone-500 tracking-[2.1px] hover:text-stone-900 transition-colors mb-16"
      >
        <ArrowLeftIcon size={16} />
        一覧へ戻る
      </a>

      {/* Page Title */}
      <h1 class="font-['Noto_Serif_JP'] font-medium text-3xl text-stone-900 leading-9 mb-16">
        記録作成
      </h1>

      <BlogCreateForm />
    </div>,
  );
});
