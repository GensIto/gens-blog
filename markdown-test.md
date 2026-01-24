# Markdownプレビューテスト

このドキュメントは、Markdownプレビュー機能のテスト用サンプルです。

## 見出し

### レベル3の見出し
#### レベル4の見出し
##### レベル5の見出し

## テキスト装飾

これは**太字（bold）**のテキストです。

これは*斜体（italic）*のテキストです。

これは***太字かつ斜体***のテキストです。

これは~~打ち消し線~~のテキストです。

## リスト

### 箇条書きリスト

- リスト項目1
- リスト項目2
  - ネストされた項目2-1
  - ネストされた項目2-2
    - さらにネストされた項目2-2-1
- リスト項目3

### 番号付きリスト

1. 最初の項目
2. 2番目の項目
3. 3番目の項目
   1. ネストされた番号1
   2. ネストされた番号2
4. 4番目の項目

### タスクリスト

- [x] 完了したタスク
- [ ] 未完了のタスク
- [ ] まだやっていないタスク

## リンク

[OpenAI](https://openai.com) のリンクです。

[相対パスリンク](/blog/example) も使えます。

## コード

### インラインコード

JavaScriptで `const hello = 'world'` のように変数を宣言できます。

### コードブロック

```javascript
// JavaScriptのコード例
function greeting(name) {
  return `Hello, ${name}!`
}

const message = greeting('World')
console.log(message)
```

```python
# Pythonのコード例
def greeting(name):
    return f"Hello, {name}!"

message = greeting("World")
print(message)
```

```typescript
// TypeScriptのコード例
interface User {
  id: number
  name: string
  email: string
}

const user: User = {
  id: 1,
  name: "太郎",
  email: "taro@example.com"
}
```

## 引用

> これは引用ブロックです。
> 複数行にわたる引用もサポートしています。
>
> > ネストされた引用も可能です。

## 水平線

---

## テーブル

| 名前 | 年齢 | 職業 |
|------|------|------|
| 太郎 | 25 | エンジニア |
| 花子 | 30 | デザイナー |
| 次郎 | 28 | プロダクトマネージャー |

### 整列オプション

| 左揃え | 中央揃え | 右揃え |
|:-------|:--------:|-------:|
| Left   | Center   | Right  |
| A      | B        | C      |
| 1      | 2        | 3      |

## 画像

![代替テキスト](https://via.placeholder.com/600x300?text=Sample+Image)

## HTML

<div style="background-color: #f0f0f0; padding: 20px; border-radius: 8px;">
  <p>HTMLタグも使えます（DOMPurifyでサニタイズされます）</p>
</div>

## 複雑な組み合わせ

### コードと説明

以下は、**Reactのカスタムフック**の例です：

```jsx
import { useState, useEffect } from 'react'

function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  useEffect(() => {
    function handleResize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return size
}
```

このフックは以下のように使用できます：

1. コンポーネント内で `useWindowSize()` を呼び出す
2. 返された `{ width, height }` オブジェクトを使用する
3. ウィンドウのリサイズ時に自動的に更新される

### リストと引用の組み合わせ

重要なポイント：

- **パフォーマンス**: 最適化を常に意識する
  > 「早すぎる最適化は諸悪の根源である」 - Donald Knuth

- **可読性**: コードは読みやすく保つ
  > 「コードは書くよりも読まれることの方が多い」

- **テスト**: 必ずテストを書く
  > 「動くコードより、テストされたコードの方が価値がある」

## エスケープテスト

バックティック: \`code\`

アスタリスク: \*not italic\*

アンダースコア: \_not italic\_

## 特殊文字

著作権: &copy;

商標: &trade;

矢印: &rarr; &larr; &uarr; &darr;

## 絵文字

:smile: :heart: :rocket: :fire: :+1:

😀 🎉 🚀 ✨ 💯

## 長文テスト

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

---

## まとめ

このサンプルには以下の要素が含まれています：

1. ✅ 見出し（h1-h5）
2. ✅ テキスト装飾（太字、斜体、打ち消し線）
3. ✅ リスト（箇条書き、番号付き、タスク）
4. ✅ リンク
5. ✅ コード（インライン、ブロック）
6. ✅ 引用
7. ✅ 水平線
8. ✅ テーブル
9. ✅ 画像
10. ✅ HTML
11. ✅ 特殊文字と絵文字

**プレビュー機能が正しく動作していれば、すべて綺麗にレンダリングされているはずです！** 🎉
