import { jsxRenderer } from "hono/jsx-renderer";
import { Link, Script } from "honox/server";
import { Summarize } from "../../islands/Summarize";

export default jsxRenderer(({ children }) => {
  const extractText = (node: any): string => {
    if (typeof node === "string") return node;
    if (Array.isArray(node)) return node.map(extractText).join(" ");
    if (node?.props?.children) return extractText(node.props.children);
    return "";
  };

  const articleText = extractText(children);

  return (
    <html lang='ja'>
      <head>
        <meta charset='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link rel='icon' href='/favicon.ico' />
        <Link href='/app/style.css' rel='stylesheet' />
        <Script src='/app/client.ts' async />
      </head>
      <body class='bg-gray-900 min-h-screen'>
        <article class='prose prose-lg mx-auto p-4 relative'>
          {children}
          <Summarize text={articleText} />
        </article>
        <footer class='text-center text-sm text-gray-500 pt-32'></footer>
      </body>
    </html>
  );
});
