import { createRoute } from "honox/factory";
import Counter from "../islands/counter";

type Meta = {
  title: string;
  date?: string;
  description?: string;
};

export default createRoute((c) => {
  const posts = import.meta.glob<{ frontmatter: Meta }>("./posts/*.mdx", {
    eager: true,
  });
  return c.render(
    <div class='py-8 text-center'>
      <h2 class='text-2xl font-bold'>Posts</h2>
      <ul class='article-list'>
        {Object.entries(posts).map(([id, module]) => {
          if (module.frontmatter) {
            return (
              <li>
                <a href={`${id.replace(/\.mdx$/, "")}`}>
                  {module.frontmatter.title}
                </a>
              </li>
            );
          }
        })}
      </ul>
      <Counter />
    </div>
  );
});
