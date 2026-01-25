import { createRoute } from "honox/factory";
import { ArrowLeftIcon } from "../../../components/Icons";
import BlogEditForm from "../../../islands/BlogEditForm";
import { getCookie, deleteCookie } from "hono/cookie";
import { verify } from "hono/jwt";
import type { Env } from "../../../server";

export default createRoute(async (c) => {
  const id = c.req.param("id");
  if (!id) {
    return c.notFound();
  }

  const auth_token = getCookie(c, "auth_token");
  if (!auth_token) {
    return c.redirect("/admin");
  }

  const env = c.env as Env["Bindings"];
  try {
    await verify(auth_token, env.JWT_SECRET, "HS256");
  } catch {
    deleteCookie(c, "auth_token", { path: "/" });
    return c.redirect("/admin");
  }

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
        記録編集
      </h1>

      <BlogEditForm id={id} />
    </div>,
  );
});
