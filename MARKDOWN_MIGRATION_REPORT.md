# Bun Markdown 移行調査報告書

## 概要

Linear Issue GEN-12 に基づき、現在 `marked` ライブラリを使用しているMarkdown処理部分を Bun v1.3.8 の組み込みMarkdown機能に置き換え可能か調査しました。

## 現在のMarkdown使用状況

### 使用箇所

1. **`app/islands/BlogCreateForm.tsx`** (クライアントサイド)
   - プレビュー機能で `marked.parse(content)` を使用
   - DOMPurifyでサニタイズ

2. **`app/islands/BlogEditForm.tsx`** (クライアントサイド)
   - プレビュー機能で `marked.parse(content)` を使用
   - DOMPurifyでサニタイズ

3. **`app/routes/blog/[slug].tsx`** (サーバーサイド)
   - ブログ記事表示で `marked.parse(post.content)` を使用

### 現在の依存関係

```json
{
  "dependencies": {
    "marked": "^17.0.1"
  },
  "devDependencies": {
    "@types/marked": "^6.0.0"
  }
}
```

## Bun v1.3.8 Markdown機能の調査結果

### API

Bun v1.3.8では以下のMarkdown APIが提供されています：

```typescript
Bun.markdown.html(input: string): string    // MarkdownをHTMLに変換
Bun.markdown.render(input: string): string  // プレーンテキストにレンダリング
Bun.markdown.react(input: string): ReactElement // React要素に変換
```

### サポートされている機能

| 機能 | Bun.markdown.html | marked |
|------|-------------------|--------|
| 見出し (h1-h6) | ✅ | ✅ |
| 太字・斜体 | ✅ | ✅ |
| リスト (箇条書き・番号付き) | ✅ | ✅ |
| ネストされたリスト | ✅ | ✅ |
| タスクリスト (GFM) | ✅ | ✅ |
| コードブロック (言語指定) | ✅ | ✅ |
| インラインコード | ✅ | ✅ |
| テーブル (GFM) | ✅ | ✅ |
| リンク | ✅ | ✅ |
| 画像 | ✅ | ✅ |
| ブロック引用 | ✅ | ✅ |
| 水平線 | ✅ | ✅ |
| **打ち消し線 (GFM)** | ❌ | ✅ |
| HTML埋め込み | ✅ | ✅ |

### 出力の違い

1. **打ち消し線**: Bunは `~~text~~` を変換しない
2. **HTMLエスケープ**: 一部の文字エスケープ方法が異なる（`'` vs `&#39;`）
3. **タグ属性**: タスクリストのcheckbox属性の書き方が若干異なる

## 結論: 実装不可

### 主な理由

**Cloudflare Workers環境での非互換性**

このプロジェクトはCloudflare Workersにデプロイされます。`Bun.markdown`はBunランタイムのグローバルAPIであり、Cloudflare Workers（workerd）では利用できません。

```
デプロイ先: Cloudflare Workers (workerd runtime)
Bun.markdown: Bun runtime専用API
→ 互換性なし
```

#### 詳細

- **サーバーサイド (`app/routes/blog/[slug].tsx`)**: Cloudflare Workers上で実行されるため、`Bun`オブジェクトが存在しない
- **クライアントサイド (`app/islands/*`)**: ブラウザで実行されるため、`Bun`オブジェクトが存在しない

### 機能的な制限

仮にBunランタイムで実行できたとしても：

1. **打ち消し線非対応**: `~~deleted~~` が変換されない
2. **XSS対策が必要**: 両方ともscriptタグを通過させるため、DOMPurifyは引き続き必要

## 代替案

### 1. 現状維持（推奨）

`marked`ライブラリを継続使用。理由：
- 安定して動作している
- GFM機能が完全サポート
- Cloudflare Workers環境で問題なく動作
- バンドルサイズの増加は軽微（marked: ~27KB gzipped）

### 2. 他のMarkdownライブラリへの移行

検討可能なライブラリ：
- `markdown-it`: 高速、プラグイン拡張可能
- `micromark`: 最小限、CommonMark準拠
- `remark`/`unified`: 強力なAST操作、重い

### 3. Cloudflare Workers AI

Cloudflare AIバインディングを使用してMarkdown処理を行う（ただしオーバーヘッドが大きい）

## 推奨アクション

現時点では**markedライブラリの継続使用**を推奨します。

Bun v1.3.8のMarkdown機能は優れていますが、Cloudflare Workers環境では使用できないため、このプロジェクトには適用できません。

将来的にBunがCloudflare Workers互換のパッケージとしてMarkdown機能を提供した場合、または本プロジェクトがBunランタイムに移行した場合には、再検討の価値があります。

---

**調査日**: 2026年1月29日
**Bunバージョン**: 1.3.8
**markedバージョン**: 17.0.1
