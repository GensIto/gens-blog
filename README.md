# gens-blog

HonoXとCloudflare Workersで構築されたブログアプリケーション。MDXによるブログ投稿とCloudflare AIを使ったAI要約機能を搭載。

## 特徴

- 🚀 **HonoX**: Honoベースのファイルルーティングフレームワーク
- ✍️ **MDX対応**: ブログ投稿をMarkdown + JSXで記述可能
- 🤖 **AI要約**: Cloudflare AIによる記事の自動要約（ストリーミング対応）
- ⚡ **高速**: Cloudflare Workersでグローバルにエッジデプロイ
- 🏝️ **アイランドアーキテクチャ**: 必要な部分だけクライアントサイドでインタラクティブに
- 🎨 **Tailwind CSS + DaisyUI**: モダンなスタイリング

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev
```

## 開発コマンド

```bash
# 開発サーバー起動（ホットリロード有効）
npm run dev

# 本番用ビルド
npm run build

# ローカルで本番ビルドをプレビュー
npm run preview

# Cloudflare Workersへデプロイ
npm run deploy

# MDXファイルをCloudflare R2にアップロード
npm run upload-mdx
```

## プロジェクト構成

```
app/
├── server.ts              # アプリケーションエントリーポイント
├── client.ts              # クライアントサイドエントリーポイント
├── style.css              # グローバルスタイル
├── global.d.ts            # TypeScript型定義（Cloudflareバインディング）
├── routes/                # ファイルベースルーティング
│   ├── _renderer.tsx      # ルートレンダラー（全ページ共通レイアウト）
│   ├── index.tsx          # トップページ
│   ├── posts/             # ブログ投稿
│   │   ├── _renderer.tsx  # 投稿用レンダラー（記事レイアウト）
│   │   └── *.mdx          # MDXブログ投稿
│   └── api/               # APIルート
│       └── index.ts       # API定義
├── islands/               # クライアントコンポーネント（インタラクティブ）
│   ├── Summarize.tsx      # AI要約コンポーネント
│   └── ...
└── lib/                   # ユーティリティ
    └── hono.ts            # 型安全なAPIクライアント
```

## 技術スタック

- **フレームワーク**: [Hono](https://hono.dev/) + [HonoX](https://github.com/honojs/honox)
- **ランタイム**: [Cloudflare Workers](https://workers.cloudflare.com/)
- **ビルドツール**: [Vite](https://vitejs.dev/)
- **コンテンツ**: [MDX](https://mdxjs.com/)
- **スタイリング**: [Tailwind CSS v4](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/)
- **AI**: [Cloudflare AI](https://developers.cloudflare.com/workers-ai/)

## Cloudflareバインディング

このプロジェクトでは以下のCloudflareリソースを使用：

- **R2 Bucket** (`R2_BUCKET`): オブジェクトストレージ
- **Cloudflare AI** (`AI`): AIモデルの実行

バインディングは`wrangler.jsonc`で設定され、`app/global.d.ts`で型定義されています。

## ブログ投稿の追加

1. `app/routes/posts/`に新しい`.mdx`ファイルを作成
2. Frontmatterでメタデータを追加（オプション）
3. Markdown + JSXで記事を執筆
4. 自動的にルーティングされます

例：
```mdx
---
title: "記事タイトル"
date: "2025-11-17"
---

# 記事タイトル

本文をここに書く...
```

## MDXファイルのR2へのアップロード

Cloudflare R2にMDXファイルをアップロードするスクリプトが用意されています。

### セットアップ

1. `.env.example`をコピーして`.env`を作成

```bash
cp .env.example .env
```

2. Cloudflare R2 APIトークンを取得
   - [Cloudflare Dashboard](https://dash.cloudflare.com/) → R2 → Manage R2 API Tokens
   - 新しいAPIトークンを作成し、Access Key IDとSecret Access Keyを取得

3. `.env`ファイルにAPIトークンを設定

```env
R2_ACCESS_KEY_ID=your_actual_access_key_id
R2_SECRET_ACCESS_KEY=your_actual_secret_access_key
```

### アップロード実行

```bash
# 環境変数を設定してアップロード実行
R2_ACCESS_KEY_ID=xxx R2_SECRET_ACCESS_KEY=xxx npm run upload-mdx
```

スクリプトの特徴：
- `app/routes/posts/`内のすべての`.mdx`ファイルを再帰的に検索
- 既にR2にアップロード済みのファイルは自動的にスキップ
- アップロード結果の詳細なサマリーを表示

## AI要約機能

各ブログ投稿ページに「Ai Summarize」ボタンが表示されます。クリックすると、Cloudflare AIが記事を要約し、ストリーミング形式でリアルタイムに表示されます。

- モデル: `@cf/meta/llama-3.1-8b-instruct-fp8`
- 実装: `app/routes/api/index.ts` の `/summarize` エンドポイント
- UI: `app/islands/Summarize.tsx`

## デプロイ

Cloudflare Workersへのデプロイ：

```bash
npm run deploy
```

初回デプロイ時は、Wrangler CLIでCloudflareアカウントへのログインが必要です。

## ライセンス

Private
