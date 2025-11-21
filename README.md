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
title: "記事のタイトル"
date: "2025-11-20"
summary: "記事の要約"
tags: ["タグ1", "タグ2"]
---
```

### MDX の記述例

```mdx
---
title: "初めての記事"
date: "2025-11-20"
summary: "ブログを始めました"
tags: ["blog", "typescript"]
---

## 見出し

本文をここに書きます。

### カスタムコンポーネントの使用

<Callout type="info" title="お知らせ">
  重要な情報を目立たせることができます。
</Callout>

<SummaryBox title="まとめ">
  記事の要点をまとめます。
</SummaryBox>

<PostImage 
  src="/images/example.png" 
  alt="説明文"
  caption="画像のキャプション"
/>

### コードブロック

\`\`\`typescript
const greeting = (name: string): string => {
  return `Hello, ${name}!`;
};
\`\`\`
```

## 利用可能なカスタムコンポーネント

### Callout

情報を目立たせるためのボックス

```mdx
<Callout type="info" title="タイトル">
  内容
</Callout>
```

- **type**: `info` | `warning` | `tip` | `note`
- **title**: オプション

### SummaryBox

記事のまとめを表示

```mdx
<SummaryBox title="まとめ">
  内容
</SummaryBox>
```

### PostImage

画像を表示（キャプション付き）

```mdx
<PostImage 
  src="/images/example.png" 
  alt="説明文"
  caption="画像のキャプション"
/>
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
