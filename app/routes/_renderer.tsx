import { jsxRenderer } from 'hono/jsx-renderer'
import { Link, Script } from 'honox/server'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export default jsxRenderer(({ children }) => {
  return (
    <html lang="ja">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>ZEN - 静謐なる思考</title>
        <meta
          name="description"
          content="ソフトウェアエンジニアリングの深淵を探る。コードと思想の記録。"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossorigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500&family=Noto+Sans+JP:wght@400;500&family=Noto+Serif+JP:wght@400;500&family=Inter:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <Link href="/app/style.css" rel="stylesheet" />
        <Script src="/app/client.ts" async />
      </head>
      <body class="bg-[#f8f6f1] min-h-screen flex flex-col">
        <Header />
        <main class="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
})
