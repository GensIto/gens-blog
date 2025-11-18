import type { FC } from "hono/jsx";

export const Pagination: FC<{
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  baseUrl?: string;
}> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  baseUrl = "/posts",
}) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  return (
    <div>
      <div class='flex justify-center gap-2 mt-8'>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <a
            href={`${baseUrl}?page=${pageNum}`}
            class={`btn ${
              pageNum === currentPage ? "btn-primary" : "btn-outline"
            }`}
          >
            {pageNum}
          </a>
        ))}
      </div>

      <p class='mt-4 text-sm text-gray-600'>
        {totalItems}件中 {startIndex + 1}-{endIndex}件を表示
      </p>
    </div>
  );
};
