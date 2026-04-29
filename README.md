# さわの日記 (Sawa's Blog)

Next.js 16 + TypeScript + MDX で作っている個人ブログ。
書くこと以外の摩擦をできる限りゼロにすることを目標に、海をテーマにした静かなデザインで構築しています。

## 技術スタック

- **Next.js 16** (App Router, Turbopack, 静的エクスポート)
- **TypeScript** / **React 19**
- **Tailwind CSS v4** + デザイントークン (CSS variables)
- **MDX** via `next-mdx-remote/rsc`
- **rehype-highlight** / **rehype-katex** / **remark-gfm** / **remark-math**
- **next/font/google** (Inter / Noto Sans JP / Source Serif 4 / JetBrains Mono)

## セットアップ

```bash
git clone https://github.com/Sawa-E/blog_sg.git
cd blog_sg
npm install
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて確認できます。

## スクリプト

| コマンド | 用途 |
| --- | --- |
| `npm run dev` | 開発サーバー起動 |
| `npm run build` | プロダクションビルド (静的エクスポート → `out/`) |
| `npm run start` | ビルド成果物のローカル配信 |
| `npm run lint` | ESLint |

## 記事の書き方

`content/posts/` に `YYYY-MM-DD-slug.mdx` の形式で MDX ファイルを置きます。

```mdx
---
title: "記事のタイトル"
date: "2026-04-29"
summary: "一覧ページに表示される短い要約"
tags: ["typescript", "diary"]
---

本文…
```

通常の Markdown / GFM に加え、`$E = mc^2$` のようなインライン数式や `$$ ... $$` のブロック数式 (KaTeX) も使えます。コードブロックはシンタックスハイライト + ホバーでコピー機能つき。

## カスタム MDX コンポーネント

`src/components/posts/mdxComponents.tsx` で登録されており、MDX 内に直接書けます。

| コンポーネント | 用途 |
| --- | --- |
| `<Callout type="info\|tip\|note\|success\|warning\|danger" title?>` | 補足ボックス |
| `<Alert type="info\|success\|warning\|error" title?>` | Callout の別名 (アラート用途) |
| `<SummaryBox title?>` | 記事末尾の「まとめ」枠 |
| `<PostImage src alt caption? width? maxWidth?>` | キャプション付き画像 |
| `<FeatureList variant="default\|compact\|cards" items={[...]}>` | 特徴リスト |
| `<StepGuide variant="vertical\|horizontal" steps={[...]}>` | 手順表示 |
| `<ComparisonTable titleA titleB items={[...]}>` | 2 列比較表 |
| `<Tabs tabs={[...]}>` | タブ切り替え (アクセシブル) |
| `<Accordion items={[...]} allowMultiple?>` | アコーディオン |
| `<YouTubeEmbed videoId title?>` | YouTube 埋め込み |
| `<SpotifyEmbed url type="track\|album\|playlist\|artist" height?>` | Spotify 埋め込み |

### 使用例

```mdx
<Callout type="tip" title="ヒント">
  これは tip ボックスです。
</Callout>

<FeatureList
  variant="cards"
  items={[
    { icon: "🚀", title: "高速", description: "Turbopack で爆速ビルド" },
    { icon: "🎨", title: "整った", description: "ocean theme のデザイントークン" },
  ]}
/>

<StepGuide
  steps={[
    { title: "clone", description: "git clone する" },
    { title: "install", description: "npm install する" },
    { title: "dev", description: "npm run dev で起動" },
  ]}
/>

<SummaryBox title="まとめ">
  最低限の道具で、書くことに集中できる環境を作る。
</SummaryBox>
```

## デプロイ

`output: "export"` で静的サイトとして書き出し、Cloudflare Pages にデプロイしています。
ビルドコマンド `npm run build`、出力ディレクトリ `out/`。Vercel / Netlify / GitHub Pages / S3 + CloudFront 等にもそのまま載せられます。

## プロジェクト構造

```
blog_sg/
├── content/posts/                # MDX 記事
├── public/                       # 静的アセット
├── src/
│   ├── app/                      # App Router (home / posts / tags / about)
│   ├── components/
│   │   ├── layout/               # Header / Footer / Nav
│   │   ├── posts/                # MDX コンポーネント群
│   │   ├── search/               # GlobalSearch (Ctrl+K)
│   │   └── common/
│   ├── hooks/                    # useGlobalShortcut, useScrollShrink, useListNavigation
│   └── lib/
│       ├── posts/                # MDX 読み込み
│       ├── config.ts             # SITE / NAV_LINKS / SOCIAL_LINKS
│       ├── search.ts             # 全文検索ロジック
│       ├── tags.ts               # タグ集計
│       └── seo.ts                # メタデータ生成
├── next.config.ts
└── tsconfig.json
```

## 作者

- **さわ** ([@Sawa-E](https://github.com/Sawa-E)) — 千葉
