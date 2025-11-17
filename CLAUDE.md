# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

HonoX（Honoのファイルベースルーティングフレームワーク）を使用したブログアプリケーションで、Cloudflare Workersにデプロイされます。MDXによるブログ投稿とCloudflare AIを使った要約機能を実装しています。

## 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# 本番用ビルド（2段階：クライアントアセット → サーバー）
npm run build

# Wranglerでローカル本番プレビュー
npm run preview

# Cloudflare Workersへデプロイ
npm run deploy
```

## アーキテクチャ

### フレームワーク構成
- **Hono**: 高速で軽量なWebフレームワーク
- **HonoX**: Hono上に構築されたファイルベースルーティングシステム（Next.jsのルーティングに類似）
- **Cloudflare Workers**: サーバーレスデプロイメントプラットフォーム
- **Vite**: ビルドツール兼開発サーバー
- **MDX**: JSXをサポートしたMarkdown（ブログ投稿用）

### ディレクトリ構造

- `app/server.ts`: アプリケーションのエントリーポイント、Honoアプリを作成
- `app/routes/`: ファイルベースルーティング
  - ルートファイル（`.tsx`）がページを定義
  - `_renderer.tsx`がそのディレクトリ内のルートのレイアウトラッパーを定義
  - `app/routes/posts/`: MDXブログ投稿と投稿専用レンダラー
- `app/islands/`: インタラクティブなクライアントコンポーネント（アイランドアーキテクチャ）
- `app/lib/`: 共有ユーティリティ（型付きHonoクライアントなど）
- `app/global.d.ts`: Cloudflareリソースの型定義

### 主要アーキテクチャパターン

**ネストされたレンダラー**: HonoXは`_renderer.tsx`ファイルがそのルートのコンテンツをラップするネストされたレンダラーパターンを使用：
- `app/routes/_renderer.tsx`: 全ページの基本HTML構造
- `app/routes/posts/_renderer.tsx`: ブログ投稿用の拡張レイアウト（記事スタイルとAI要約機能付き）

**アイランドアーキテクチャ**: `app/islands/`内のインタラクティブコンポーネントはクライアント側でハイドレートされ、残りはサーバーレンダリング。アイランドはHonoのJSXとReact風のフック（`useState`など）を使用。

**型安全なAPIクライアント**: `app/lib/hono.ts`のパターンでエンドツーエンドの型安全なクライアントを作成：
```typescript
import { hc } from "hono/client";
import { AppType } from "../routes/api/index";
export const honoClient = hc<AppType>("/api");
```
APIルートからの`AppType`エクスポートにより、API呼び出しの完全な型推論が可能。

**MDX統合**: ブログ投稿は`app/routes/posts/`内の`.mdx`ファイル。Vite設定にMDXプラグインを含む：
- `remarkFrontmatter`と`remarkMdxFrontmatter`でメタデータをサポート
- `jsxImportSource: "hono/jsx"`でHonoのJSXランタイムを使用

### Cloudflareバインディング

`wrangler.jsonc`で設定し、`app/global.d.ts`で型定義：

- **R2_BUCKET**: Cloudflare R2ストレージバケットのバインディング
- **AI**: MLモデルを実行するためのCloudflare AIバインディング

コンテキスト経由でバインディングにアクセス：`c.env.AI`または`c.env.R2_BUCKET`

### AI機能

`/api/summarize`エンドポイントでストリーミングAIレスポンスを実装：
- `@cf/meta/llama-3.1-8b-instruct-fp8`モデルを使用
- ストリーミング用にSSE（Server-Sent Events）パースを実装
- クライアント側コンポーネント（`islands/Summarize.tsx`）でリアルタイム表示

### ビルドプロセス

ビルドは2段階で実行（`vite.config.ts`参照）：
1. `vite build --mode client`: クライアントアセットをビルド（`/app/client.ts`、`/app/style.css`）
2. `vite build`: Cloudflare Workersアダプターでサーバーバンドルをビルド

## TypeScript設定

- JSXランタイム: HonoのJSX（`jsxImportSource: "hono/jsx"`）
- モジュール解決: Bundlerモード（Vite用）
- Cloudflare Workers型定義: `@cloudflare/workers-types/2023-07-01`

## スタイリング

Tailwind CSS v4を使用：
- DaisyUIコンポーネントライブラリ
- Typographyプラグイン（ブログ投稿のproseスタイリング用）
- CSSは`app/style.css`経由でインポート
