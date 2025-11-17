import {
  S3Client,
  PutObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";
import { readFileSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";
import { config } from "dotenv";

// .envファイルから環境変数を読み込み
config();

// R2設定
const R2_ENDPOINT = process.env.R2_ENDPOINT;
const BUCKET_NAME = process.env.R2_BUCKET_NAME;

// 環境変数から認証情報を取得
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;

// 必須環境変数のチェック
if (!R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_ENDPOINT || !BUCKET_NAME) {
  console.error("エラー: 以下の環境変数を.envファイルに設定してください:");
  console.error("  - R2_ACCESS_KEY_ID");
  console.error("  - R2_SECRET_ACCESS_KEY");
  console.error("  - R2_ENDPOINT");
  console.error("  - R2_BUCKET_NAME");
  console.error("\n.env.exampleを参考にして.envファイルを作成してください");
  process.exit(1);
}

// S3クライアントの設定
const s3Client = new S3Client({
  region: "auto",
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

/**
 * 指定されたディレクトリ内のすべてのMDXファイルを再帰的に取得
 */
function getAllMdxFiles(dir: string): string[] {
  const files: string[] = [];
  const entries = readdirSync(dir);

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...getAllMdxFiles(fullPath));
    } else if (entry.endsWith(".mdx")) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * R2にファイルが既に存在するかチェック
 */
async function fileExistsInR2(key: string): Promise<boolean> {
  try {
    await s3Client.send(
      new HeadObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
      })
    );
    return true;
  } catch (error: any) {
    if (error.name === "NotFound" || error.$metadata?.httpStatusCode === 404) {
      return false;
    }
    throw error;
  }
}

/**
 * MDXファイルをR2にアップロード
 */
async function uploadMdxFile(
  filePath: string,
  postsDir: string
): Promise<void> {
  // R2内のキーを生成（posts/からの相対パス）
  const relativePath = relative(postsDir, filePath);
  const key = `posts/${relativePath}`;

  // 既にアップロード済みかチェック
  const exists = await fileExistsInR2(key);
  if (exists) {
    console.log(`⏭️  スキップ: ${key} (既にアップロード済み)`);
    return;
  }

  // ファイルを読み込み
  const fileContent = readFileSync(filePath);

  // R2にアップロード
  await s3Client.send(
    new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: fileContent,
      ContentType: "text/markdown",
    })
  );

  console.log(`✅ アップロード完了: ${key}`);
}

/**
 * メイン処理
 */
async function main() {
  const postsDir = join(process.cwd(), "app", "routes", "posts");

  console.log("📁 MDXファイルを検索中...");
  const mdxFiles = getAllMdxFiles(postsDir);

  console.log(`\n📊 検出されたMDXファイル: ${mdxFiles.length}件\n`);

  if (mdxFiles.length === 0) {
    console.log("⚠️  アップロードするMDXファイルが見つかりませんでした");
    return;
  }

  let uploaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const filePath of mdxFiles) {
    try {
      const beforeSkipped = skipped;
      await uploadMdxFile(filePath, postsDir);

      if (skipped === beforeSkipped) {
        uploaded++;
      } else {
        skipped++;
      }
    } catch (error) {
      failed++;
      console.error(`❌ アップロード失敗: ${filePath}`);
      console.error(error);
    }
  }

  console.log("\n" + "=".repeat(50));
  console.log(`📈 結果サマリー:`);
  console.log(`  ✅ アップロード成功: ${uploaded}件`);
  console.log(`  ⏭️  スキップ: ${skipped}件`);
  console.log(`  ❌ 失敗: ${failed}件`);
  console.log("=".repeat(50));

  if (failed > 0) {
    throw new Error(`失敗: ${failed}件`);
  }
}

main().catch((error) => {
  console.error("エラーが発生しました:", error);
  throw error;
});
