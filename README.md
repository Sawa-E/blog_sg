# そーがの日記 (Soga's Blog)

Next.js 16 + TypeScript + MDX を使った個人ブログです。

## 特徴

- **Next.js 16 App Router**: 最新の Next.js を使用した高速なブログ
- **MDX サポート**: マークダウンに React コンポーネントを埋め込み可能
- **TypeScript**: 型安全な開発環境
- **Tailwind CSS**: モダンで洗練されたデザイン
- **静的エクスポート**: Cloudflare Pages などでホスティング可能
- **コードハイライト**: シンタックスハイライト & コピー機能付きコードブロック

## 使用技術

- [Next.js](https://nextjs.org/) - React フレームワーク
- [TypeScript](https://www.typescriptlang.org/) - 型安全な JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - ユーティリティファースト CSS フレームワーク
- [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) - MDX のレンダリング
- [rehype-highlight](https://github.com/rehypejs/rehype-highlight) - コードブロックのシンタックスハイライト
- [remark-gfm](https://github.com/remarkjs/remark-gfm) - GitHub Flavored Markdown サポート

## セットアップ

### 必要な環境

- Node.js 20 以上
- npm または yarn

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/Sawa-E/blog_sg.git
cd blog_sg

# 依存関係をインストール
npm install
```

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて確認できます。

## 記事の書き方

### 新しい記事を作成

1. `content/posts/` ディレクトリに新しい `.mdx` ファイルを作成
2. ファイル名の形式: `YYYY-MM-DD-slug.mdx`
   - 例: `2025-11-20-hello-world.mdx`

### フロントマターの設定

MDX ファイルの先頭に以下のメタデータを記述：

```yaml
---
title: "記事のタイトル"        # 必須：記事のタイトル
date: "2025-11-20"            # 必須：記事の公開日（YYYY-MM-DD形式）
summary: "記事の要約"          # 推奨：記事一覧で表示される要約文
tags: ["タグ1", "タグ2"]      # オプション：タグのリスト
---
```

### 基本的な Markdown 記法

MDX では通常の Markdown 記法が使用できます：

```markdown
# 見出し1
## 見出し2
### 見出し3

**太字**
*斜体*
~~取り消し線~~

- リスト項目1
- リスト項目2
  - ネストしたリスト

1. 番号付きリスト
2. 項目2

[リンクテキスト](https://example.com)

> 引用文

`インラインコード`
```

### コードブロック

コードブロックはシンタックスハイライトとコピー機能が自動で適用されます：

````markdown
```typescript
const greeting = (name: string): string => {
  return `Hello, ${name}!`;
};
```

```javascript
console.log("Hello, World!");
```

```python
def hello(name):
    return f"Hello, {name}!"
```
````

### 数式の記述

KaTeX を使った数式のレンダリングに対応しています：

```markdown
インライン数式: $E = mc^2$

ブロック数式:
$$
\frac{d^2 v(t)}{dt^2} + \frac{dv(t)}{dt} + v(t) = 10
$$
```

## カスタムコンポーネント一覧

このブログでは、MDX 内で使える便利なカスタムコンポーネントを多数用意しています。

### 📢 Callout

重要な情報を目立たせるためのボックス。タイプに応じて色とアイコンが変わります。

**Props:**
- `type`: `"info"` | `"warning"` | `"tip"` | `"note"` | `"success"` | `"danger"` (デフォルト: `"info"`)
- `title`: タイトル (オプション)
- `children`: 表示する内容

**使用例:**

```mdx
<Callout type="info" title="お知らせ">
  重要な情報を目立たせることができます。
</Callout>

<Callout type="warning" title="注意">
  ここは気をつけてください。
</Callout>

<Callout type="tip">
  タイトルなしでも使えます！
</Callout>

<Callout type="success" title="成功">
  操作が正常に完了しました。
</Callout>
```

### 📘 SummaryBox

記事の要点やまとめを見やすく表示するボックス。

**Props:**
- `title`: タイトル (デフォルト: `"まとめ"`)
- `children`: まとめの内容

**使用例:**

```mdx
<SummaryBox title="今日のまとめ">
  自作ブログで日記を書き始めました。MDX の書き方を学びつつ、研究も頑張ります！
</SummaryBox>

<SummaryBox>
  - ポイント1
  - ポイント2
  - ポイント3
</SummaryBox>
```

### 🖼️ PostImage

画像を表示するコンポーネント。キャプション付きで表示できます。

**Props:**
- `src`: 画像のパス (必須)
- `alt`: 代替テキスト (必須)
- `caption`: 画像の説明文 (オプション)
- `width`: 幅 (デフォルト: `"100%"`)
- `height`: 高さ (デフォルト: `"auto"`)
- `maxWidth`: 最大幅 (オプション)

**使用例:**

```mdx
<PostImage 
  src="/images/example.png" 
  alt="説明文"
  caption="画像のキャプション"
/>

<PostImage 
  src="/images/small.png" 
  alt="小さい画像"
  width="300px"
  caption="サイズ指定した画像"
/>
```

### ✨ FeatureList

機能や特徴を一覧表示するコンポーネント。3つの表示スタイルが選べます。

**Props:**
- `items`: 表示する項目の配列 (必須)
  - `icon`: アイコン (オプション)
  - `title`: タイトル (オプション)
  - `description`: 説明文 (必須)
- `variant`: `"default"` | `"compact"` | `"cards"` (デフォルト: `"default"`)

**使用例:**

```mdx
<!-- カード型表示 -->
<FeatureList
  variant="cards"
  items={[
    {
      icon: "🚀",
      title: "高速",
      description: "Next.js 16の最適化により爆速！",
    },
    {
      icon: "🎨",
      title: "美しい",
      description: "海をテーマにした洗練されたデザイン",
    },
  ]}
/>

<!-- コンパクト表示 -->
<FeatureList
  variant="compact"
  items={[
    { icon: "🔬", description: "今は研究に集中したいです" },
    { icon: "✨", description: "ブログのUXも向上させたいです" },
  ]}
/>
```

### 📝 StepGuide

手順やステップを視覚的に表示するコンポーネント。

**Props:**
- `steps`: ステップの配列 (必須)
  - `title`: ステップのタイトル
  - `description`: ステップの説明
- `variant`: `"vertical"` | `"horizontal"` (デフォルト: `"vertical"`)

**使用例:**

```mdx
<StepGuide
  steps={[
    {
      title: "インストール",
      description: "npm install を実行してパッケージをインストールします。",
    },
    {
      title: "設定",
      description: "設定ファイルを編集します。",
    },
    {
      title: "起動",
      description: "npm run dev でサーバーを起動します。",
    },
  ]}
/>
```

### 📊 ComparisonTable

2つの選択肢を比較するテーブル。

**Props:**
- `titleA`: 左側のタイトル (必須)
- `titleB`: 右側のタイトル (必須)
- `items`: 比較項目の配列 (必須)
  - `label`: 項目名
  - `optionA`: 選択肢Aの内容
  - `optionB`: 選択肢Bの内容

**使用例:**

```mdx
<ComparisonTable
  titleA="Next.js"
  titleB="Gatsby"
  items={[
    { label: "ビルド速度", optionA: "⚡ 高速", optionB: "🐢 普通" },
    { label: "学習コスト", optionA: "📚 中", optionB: "📚 高" },
    { label: "人気度", optionA: "🔥 高", optionB: "👍 中" },
  ]}
/>
```

### 🗂️ Tabs

タブで切り替えられるコンテンツを表示（インタラクティブ）。

**Props:**
- `tabs`: タブの配列 (必須)
  - `label`: タブのラベル
  - `content`: タブの内容
  - `icon`: アイコン (オプション)

**使用例:**

```mdx
<Tabs
  tabs={[
    {
      label: "JavaScript",
      icon: "🟨",
      content: (
        <pre>
          <code>console.log("Hello!");</code>
        </pre>
      ),
    },
    {
      label: "TypeScript",
      icon: "🔷",
      content: (
        <pre>
          <code>const msg: string = "Hello!";</code>
        </pre>
      ),
    },
  ]}
/>
```

### ❓ Accordion

よくある質問などをアコーディオン形式で表示（インタラクティブ）。

**Props:**
- `items`: 質問と回答の配列 (必須)
  - `question`: 質問
  - `answer`: 回答

**使用例:**

```mdx
<Accordion
  items={[
    {
      question: "このブログはどうやって作られていますか？",
      answer: "Next.js 16 + TypeScript + Tailwind CSS で構築されています。",
    },
    {
      question: "デプロイ先はどこですか？",
      answer: "Cloudflare Pages に静的サイトとしてデプロイしています。",
    },
  ]}
/>
```

### 🔔 Alert

通知やメッセージを表示するコンポーネント。

**Props:**
- `type`: `"info"` | `"success"` | `"warning"` | `"error"` (デフォルト: `"info"`)
- `title`: タイトル (オプション)
- `children`: 内容

**使用例:**

```mdx
<Alert type="info" title="お知らせ">
  新しい記事を公開しました！
</Alert>

<Alert type="success">
  セットアップが正常に完了しました。
</Alert>

<Alert type="warning" title="警告">
  この操作は元に戻せません。
</Alert>

<Alert type="error" title="エラー">
  ファイルが見つかりません。
</Alert>
```

### 🎥 YouTubeEmbed

YouTube 動画を埋め込むコンポーネント。

**Props:**
- `videoId`: YouTube の動画 ID (必須)
- `title`: 動画のタイトル (オプション)

**使用例:**

```mdx
<YouTubeEmbed videoId="dQw4w9WgXcQ" title="YouTube 動画" />
```

### 🎵 SpotifyEmbed

Spotify の音楽を埋め込むコンポーネント。

**Props:**
- `url`: Spotify の URL (必須)
- `type`: `"track"` | `"album"` | `"playlist"` | `"artist"` (デフォルト: `"track"`)
- `height`: 高さ (オプション)

**使用例:**

```mdx
<SpotifyEmbed url="https://open.spotify.com/intl-ja/track/2hrEREhRJDK7FItIqvllmr" />

<SpotifyEmbed 
  url="https://open.spotify.com/album/xxxxx" 
  type="album"
  height={380}
/>
```

## MDX 記述の完全な例

以下は、複数のコンポーネントを組み合わせた記事の例です：

```mdx
---
title: "Next.js 16 で作るモダンブログ"
date: "2025-11-20"
summary: "Next.js 16 と MDX を使った個人ブログの作り方"
tags: ["nextjs", "mdx", "typescript"]
---

# Next.js 16 で作るモダンブログ

このブログは **Next.js 16** と **MDX** で構築されています。

<Callout type="info" title="このチュートリアルについて">
  このガイドでは、Next.js 16 を使った個人ブログの作り方を解説します。
</Callout>

## 主な機能

<FeatureList
  variant="cards"
  items={[
    {
      icon: "🚀",
      title: "高速",
      description: "Next.js 16 の最適化により爆速で動作",
    },
    {
      icon: "🎨",
      title: "美しいデザイン",
      description: "Tailwind CSS で洗練された見た目",
    },
  ]}
/>

## セットアップ手順

<StepGuide
  steps={[
    {
      title: "リポジトリをクローン",
      description: "git clone でリポジトリを取得します",
    },
    {
      title: "依存関係をインストール",
      description: "npm install を実行します",
    },
    {
      title: "開発サーバー起動",
      description: "npm run dev でサーバーを起動します",
    },
  ]}
/>

## コード例

```typescript
const greeting = (name: string): string => {
  return `Hello, ${name}!`;
};

console.log(greeting("World"));
```

<SummaryBox title="まとめ">
  Next.js 16 と MDX を使えば、簡単にモダンなブログを構築できます！
</SummaryBox>
```

## ビルド & デプロイ

### プロダクションビルド

```bash
npm run build
```

ビルド成果物は `out/` ディレクトリに生成されます。

### Cloudflare Pages へのデプロイ

1. Cloudflare Pages のダッシュボードで新しいプロジェクトを作成
2. GitHub リポジトリと連携
3. ビルド設定:
   - **ビルドコマンド**: `npm run build`
   - **ビルド出力ディレクトリ**: `out`
   - **Node.js バージョン**: 20 以上

### その他のホスティングサービス

静的エクスポートされたファイルは以下のサービスでもホスティング可能：

- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [GitHub Pages](https://pages.github.com/)
- AWS S3 + CloudFront
- など

## プロジェクト構造

```
blog_sg/
├── content/
│   └── posts/              # MDX 記事ファイル
│       ├── YYYY-MM-DD-slug1.mdx
│       └── YYYY-MM-DD-slug2.mdx
├── public/                 # 静的ファイル（画像など）
├── src/
│   ├── app/                # Next.js App Router ページ
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── posts/
│   │       ├── page.tsx    # 記事一覧
│   │       └── [slug]/
│   │           └── page.tsx # 記事詳細
│   ├── components/         # React コンポーネント
│   │   ├── common/         # 共通コンポーネント
│   │   ├── layout/         # レイアウトコンポーネント
│   │   └── posts/          # 記事用コンポーネント
│   └── lib/                # ユーティリティ関数
│       └── posts/          # 記事関連の処理
├── next.config.ts          # Next.js 設定
├── tailwind.config.ts      # Tailwind CSS 設定
└── tsconfig.json           # TypeScript 設定
```

## 開発

### コードスタイル

```bash
# ESLint でチェック
npm run lint
```

### 型チェック

TypeScript の型チェックはビルド時に自動で実行されます。

## ライセンス

MIT

## 作者

- **Sawa-E** - [GitHub](https://github.com/Sawa-E)
