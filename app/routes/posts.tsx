import { createRoute } from "honox/factory";
import { Pagination } from "../components/Pagination";

type Meta = {
  title: string;
  date?: string;
  description?: string;
};

const POSTS_PER_PAGE = 10;

export default createRoute((c) => {
  // クエリパラメータからページ番号を取得（デフォルトは1）
  const page = parseInt(c.req.query("page") || "1", 10);

  const posts = import.meta.glob<{ frontmatter: Meta }>("./posts/*.mdx", {
    eager: true,
  });

  // 投稿を配列に変換してソート（新しい順）
  const postArray = Object.entries(posts)
    .filter(([_, module]) => module.frontmatter)
    .sort((a, b) => {
      const dateA = a[1].frontmatter?.date || "";
      const dateB = b[1].frontmatter?.date || "";
      return dateB.localeCompare(dateA);
    });

  // 総ページ数を計算
  const totalPosts = postArray.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  // 現在のページの投稿を取得
  const startIndex = (page - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = postArray.slice(startIndex, endIndex);

  if (currentPosts.length === 0) {
    return c.render(
      <div class='py-8 flex flex-col items-center justify-between h-screen'>
        <div class='h-full flex justify-center items-center'>
          <div class='space-y-4 text-center'>
            <h1 class='text-2xl font-bold'>まだ投稿がありません</h1>
          </div>
        </div>
        <a href='/' class='btn btn-primary'>
          ホームに戻る
        </a>
      </div>
    );
  }

  return c.render(
    <div class='py-8 flex flex-col items-center justify-between h-screen'>
      <ul class='space-y-4'>
        {currentPosts.map(([id, module]) => (
          <li>
            <a href={`${id.replace(/\.mdx$/, "")}`}>
              {module.frontmatter.title}
            </a>
          </li>
        ))}
      </ul>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        totalItems={totalPosts}
        itemsPerPage={POSTS_PER_PAGE}
        baseUrl='/posts'
      />
    </div>
  );
});
