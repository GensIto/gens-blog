# ZEN - 静謐なる思考

余白が、道をひらく。整えることの記録。

ソフトウェアエンジニアリングの思考を綴るブログアプリケーションです。

## 技術スタック

- **HonoX** - Honoをベースにしたフルスタックメタフレームワーク
- **Cloudflare Workers** - エッジで動作するサーバーレス実行環境
- **Drizzle ORM** - 型安全なデータベースツールキット
- **Cloudflare D1** - SQLiteベースのサーバーレスデータベース
- **Cloudflare R2** - オブジェクトストレージ
- **Cloudflare AI** - AIモデルによる要約生成
- **TailwindCSS v4** - モダンなユーティリティファーストCSS

## セットアップ

### 必要なもの

- [Bun](https://bun.sh/) - JavaScriptランタイム
- Cloudflareアカウント

### インストール

```bash
# 依存関係のインストール
bun install

# 環境変数の設定（本番環境のデータベース操作用）
cp .env.example .env
# .envファイルに以下を設定：
# - CLOUDFLARE_ACCOUNT_ID
# - CLOUDFLARE_DATABASE_ID
# - CLOUDFLARE_D1_TOKEN
```

### データベースのセットアップ

```bash
# マイグレーションファイルの生成
bun run db:gen

# ローカルデータベースへマイグレーション適用
bun run db:migrate

# 本番データベースへマイグレーション適用
bun run db:migrate:remote
```

## 開発

### 開発サーバーの起動

```bash
bun run dev
```

開発サーバーが起動し、`http://localhost:5173` でアクセスできます。

### その他のコマンド

```bash
# 本番ビルドのプレビュー
bun run preview

# 本番環境へデプロイ
bun run deploy

# Drizzle Studioでデータベースを確認
bun run db:studio        # ローカル
bun run db:studio:prod   # 本番

# コード品質チェック
bun run lint             # ESLintでチェック
bun run lint:fix         # ESLintで自動修正
bun run format           # Prettierでフォーマット
bun run format:check     # フォーマットチェックのみ
```

## プロジェクト構成

```
app/
├── routes/              # ファイルベースルーティング
│   ├── index.tsx        # トップページ
│   ├── blog/            # ブログ記事ページ
│   ├── admin/           # 管理画面
│   └── _renderer.tsx    # レイアウトコンポーネント
├── islands/             # クライアントサイドの対話的コンポーネント
│   ├── BlogCreateForm.tsx
│   ├── BlogEditForm.tsx
│   └── LoginForm.tsx
├── server/              # APIコントローラー
│   ├── auth/            # 認証API
│   └── blogs/           # ブログCRUD API
├── middleware/          # ミドルウェア
│   ├── db.ts            # データベース接続
│   └── auth.ts          # JWT認証
├── db/                  # データベース関連
│   ├── schema.ts        # Drizzleスキーマ定義
│   └── index.ts         # DB接続ファクトリ
└── components/          # 再利用可能なUIコンポーネント
```

## 主な機能

### アイランドアーキテクチャ

必要な部分だけクライアントサイドでハイドレーションする、パフォーマンスに優れたアーキテクチャを採用しています。

### JWT認証

httpOnlyクッキーを使用した安全な認証システムを実装しています。

### AI要約生成

Cloudflare AIを使用して、ブログ記事の要約を自動生成します。

### エッジデプロイ

Cloudflare Workersにデプロイすることで、世界中で高速にアクセス可能です。

## データベーススキーマ

- **admin** - 管理者アカウント
- **blogs** - ブログ記事（タイトル、スラッグ、本文、公開状態）
- **tags** - タグ
- **blog_tags** - ブログとタグの多対多リレーション

## デプロイ

```bash
# ビルドとデプロイを一度に実行
bun run deploy
```

デプロイ前に、`wrangler.json`の設定が正しいことを確認してください。
