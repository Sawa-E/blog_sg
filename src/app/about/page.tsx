import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata({
  title: "このブログについて",
  description: "さわの自己紹介ページ",
  path: "/about",
});

const HANDLES = [
  { label: "name", value: "さわ" },
  { label: "based", value: "千葉 / Chiba" },
  { label: "github", value: "@Sawa-E" },
];

const STACK = [
  "Next.js 16",
  "TypeScript",
  "MDX",
  "Tailwind CSS",
  "KaTeX",
  "Cloudflare Pages",
];

const NOW = [
  "修論の中間発表に向けた準備",
  "このブログのデザインリニューアル",
  "趣味でカラオケに通う日々",
];

export default function AboutPage() {
  return (
    <div className="app-route container">
      <section className="page-head" style={{ paddingBottom: 0 }}>
        <span className="eyebrow">About · プロフィール</span>
      </section>

      <section className="about">
        <aside className="about__side">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icons/profile.png"
            alt="さわの日記アイコン"
            className="about__avatar"
          />
          <ul className="about__handles">
            {HANDLES.map((h) => (
              <li key={h.label}>
                <span>{h.label}</span>
                <span>{h.value}</span>
              </li>
            ))}
          </ul>
        </aside>

        <div className="about__body">
          <h1>
            はじめまして、
            <br />
            さわです。
          </h1>
          <p>
            工学系の大学院修士1年生。制御工学の研究をしながら、
            日々の生活や読書、コードを書いて思ったことをこのブログに記録しています。
          </p>
          <p>
            机に向かう時間と、海まで歩く時間。
            両方が必要だと最近よく思うので、その両方をここに残していきます。
          </p>

          <h2>このブログについて</h2>
          <p>
            Next.js 16 と MDX で書いています。
            「書くこと以外の摩擦をできる限りゼロにする」のが目標。
            記事は静的に書き出して、Cloudflare Pages にデプロイしています。
          </p>
          <div className="about__stack">
            {STACK.map((s) => (
              <span key={s} className="tag">
                {s}
              </span>
            ))}
          </div>

          <div className="about__now">
            <h2>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 3l1.8 4.6L18 9.4l-4.2 1.8L12 16l-1.8-4.8L6 9.4l4.2-1.8L12 3z" />
              </svg>
              いま取り組んでいること
            </h2>
            <ul>
              {NOW.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>

          <h2>連絡</h2>
          <p>
            お仕事や雑談のご連絡は、GitHub からどうぞ。
            返信が遅くなることがありますが、必ずお返事します。
          </p>
        </div>
      </section>
    </div>
  );
}
