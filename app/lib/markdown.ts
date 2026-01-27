import { marked } from 'marked'
import { codeToHtml } from 'shiki'

/**
 * Shikiでシンタックスハイライトされたコードブロックを含むHTMLを生成する
 * markedでパースしながら、コードブロックをShikiでハイライトする
 */
export async function parseMarkdownWithShiki(content: string): Promise<string> {
  // コードブロックを収集
  const codeBlocks: Array<{ code: string; lang: string }> = []
  const codeBlockPlaceholders: string[] = []

  // カスタムレンダラーでコードブロックを検出してプレースホルダーに置き換え
  const renderer = new marked.Renderer()

  renderer.code = ({ text, lang }) => {
    const index = codeBlocks.length
    const placeholder = `__SHIKI_CODE_BLOCK_${index}__`
    codeBlocks.push({ code: text, lang: lang || 'text' })
    codeBlockPlaceholders.push(placeholder)
    return placeholder
  }

  // markedでパース（コードブロックはプレースホルダーに）
  let html = await marked.parse(content, { renderer })

  // 各コードブロックをShikiでハイライト
  for (let i = 0; i < codeBlocks.length; i++) {
    const { code, lang } = codeBlocks[i]
    const placeholder = codeBlockPlaceholders[i]

    try {
      const highlighted = await codeToHtml(code, {
        lang,
        theme: 'github-dark',
      })
      html = html.replace(placeholder, highlighted)
    } catch {
      // 言語がサポートされていない場合はフォールバック
      const escaped = escapeHtml(code)
      html = html.replace(
        placeholder,
        `<pre class="shiki"><code class="language-${lang}">${escaped}</code></pre>`
      )
    }
  }

  return html
}

/**
 * HTMLエスケープ
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
