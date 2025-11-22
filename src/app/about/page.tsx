// src/app/about/page.tsx
import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata({
  title: "このブログについて",
  description: "そーがの自己紹介ページ",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main className="min-h-screen body-sea">
      {/* ヒーローセクション */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-100 via-cyan-50 to-blue-100 border-b border-sky-200">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24 text-center relative z-10">
          {/* 装飾的な波エフェクト */}
          <div className="absolute top-10 left-10 w-40 h-40 bg-cyan-300/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-sky-300/20 rounded-full blur-3xl animate-pulse delay-700" />

          {/* プロフィール画像 */}
          <div className="mb-8 inline-block">
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-gradient-to-br from-sky-200 to-cyan-200">
              <img
                src="/icons/profile.png"
                alt="そーがのプロフィール画像"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-sky-700 to-cyan-700 bg-clip-text text-transparent">
            そーが
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 font-medium">
            気ままにブログを書いているただのオタク
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
        {/* 基本情報セクション */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-gray-900">
            <span className="text-4xl">👤</span>
            基本情報
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { label: "名前", value: "そーが", icon: "✨" },
              { label: "身分", value: "大学4年生", icon: "🎓" },
              { label: "年齢", value: "20代", icon: "🎂" },
              { label: "専門", value: "制御工学", icon: "🤖" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-sky-100 bg-white/70 backdrop-blur-sm p-6 shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="text-2xl group-hover:scale-110 transition-transform"
                    aria-hidden="true"
                  >
                    {item.icon}
                  </span>
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    {item.label}
                  </span>
                </div>
                <p className="text-xl font-bold text-gray-900 pl-11">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-sky-100 bg-gradient-to-br from-white to-sky-50/30 backdrop-blur-sm p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <span className="text-3xl mt-1" aria-hidden="true">
                💼
              </span>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  志望分野
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  ロボット・制御系のエンジニアを目指しています。
                  <br />
                  制御工学を専門として学びながら、日々の技術メモや研究の記録をこのブログに残しています。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ブログを始めた理由セクション */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-gray-900">
            <span className="text-4xl">📝</span>
            ブログを始めた理由
          </h2>

          <div className="space-y-6">
            {[
              {
                title: "ポートフォリオとして",
                description:
                  "このブログが、自分の技術力や考え方を示すポートフォリオの一部になればと思っています。",
                icon: "💼",
                gradient: "from-sky-400 to-cyan-400",
              },
              {
                title: "暇だったから",
                description:
                  "正直に言うと、時間があったので何か始めてみようと思ったのがきっかけです（笑）",
                icon: "😊",
                gradient: "from-cyan-400 to-teal-400",
              },
            ].map((reason, index) => (
              <div
                key={index}
                className="rounded-2xl border border-sky-100 bg-white/70 backdrop-blur-sm p-6 shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${reason.gradient} text-white font-bold flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform`}
                  >
                    {reason.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {reason.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 趣味セクション */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-gray-900">
            <span className="text-4xl">🎨</span>
            趣味
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                title: "アイドルオタク",
                description:
                  "暇なときにふらっとライブに行ってます(推しメンいないのでもう行っていませんが…)",
                icon: "🎤",
                emoji: "✨",
              },
              {
                title: "カラオケ",
                description: "ストレス発散と気分転換にカラオケが一番！",
                icon: "🎵",
                emoji: "🎶",
              },
              {
                title: "旅行（写真撮られるのが好き）",
                description:
                  "いろんな場所を訪れて、その瞬間を写真に残すのが好き。撮られる側専門ですw",
                icon: "📸",
                emoji: "✈️",
              },
              {
                title: "プログラミング",
                description: "とある理由でコードを書くのも好きです。",
                icon: "💻",
                emoji: "🔧",
              },
            ].map((hobby, index) => (
              <div
                key={index}
                className="rounded-2xl border border-sky-100 bg-white/70 backdrop-blur-sm p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
              >
                {/* 波アニメーション背景 */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none wave-bg" />

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="text-3xl group-hover:scale-110 transition-transform"
                      aria-hidden="true"
                    >
                      {hobby.icon}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900">
                      {hobby.title}
                    </h3>
                    <span className="text-xl ml-auto" aria-hidden="true">
                      {hobby.emoji}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {hobby.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SNSセクション */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-gray-900">
            <span className="text-4xl">🔗</span>
            SNS / リンク
          </h2>

          <div className="rounded-2xl border border-sky-100 bg-gradient-to-br from-white to-cyan-50/30 backdrop-blur-sm p-8 shadow-sm">
            <p className="text-gray-700 mb-6 leading-relaxed">
              気軽にフォローしてください！日常のことをゆるっと発信しています。
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  name: "X (Twitter)",
                  username: "@swa2_ga",
                  url: "https://x.com/swa2_ga",
                  icon: "/icons/x-logo.svg",
                  color: "from-gray-700 to-gray-900",
                  description: "日常のつぶやき",
                },
                {
                  name: "GitHub",
                  username: "@Sawa-E",
                  url: "https://github.com/Sawa-E",
                  icon: "/icons/github-mark.svg",
                  color: "from-gray-800 to-black",
                  description: "コード置き場",
                },
                {
                  name: "Instagram",
                  username: "@sawa_sgsg",
                  url: "https://instagram.com/sawa_sgsg",
                  icon: "/icons/instagram-logo.svg",
                  color: "from-pink-500 to-purple-600",
                  description: "写真アルバム",
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-xl border border-sky-100 bg-white/70 backdrop-blur-sm p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${social.color} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}
                    >
                      <img
                        src={social.icon}
                        alt={social.name}
                        className="w-8 h-8 brightness-0 invert"
                      />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">
                      {social.name}
                    </h3>
                    <p className="text-sm text-sky-600 mb-2">
                      {social.username}
                    </p>
                    <p className="text-xs text-gray-500">
                      {social.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* このブログについてセクション */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-gray-900">
            <span className="text-4xl">🌊</span>
            このブログについて
          </h2>

          <div className="rounded-2xl border border-sky-100 bg-gradient-to-br from-white to-sky-50/30 backdrop-blur-sm p-8 shadow-sm">
            <p className="text-gray-700 leading-relaxed mb-6">
              このブログは、Next.js 16 + TypeScript + MDX で構築し、Cloudflare
              Pages にデプロイしています。
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-sky-50/50">
                <span className="text-2xl" aria-hidden="true">
                  ⚡
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    技術スタック
                  </h3>
                  <p className="text-sm text-gray-600">
                    Next.js 16, TypeScript, Tailwind CSS, MDX
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-cyan-50/50">
                <span className="text-2xl" aria-hidden="true">
                  🚀
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    デプロイ先
                  </h3>
                  <p className="text-sm text-gray-600">
                    Cloudflare Pages（静的サイト）
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-sky-200">
              <p className="text-sm text-gray-600">
                ソースコードは{" "}
                <a
                  href="https://github.com/Sawa-E/blog_sg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-600 hover:text-sky-700 font-medium underline underline-offset-2"
                >
                  GitHub
                </a>{" "}
                で公開しています。
              </p>
            </div>
          </div>
        </section>

        {/* CTAセクション */}
        <section className="text-center">
          <div className="rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-100 via-cyan-50 to-blue-100 p-10 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              最後まで読んでいただき、ありがとうございます！
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              よかったら記事も読んでいってください。
              <br />
              技術的な話から日常のことまで、ゆるっと更新しています。
            </p>
            <Link
              href="/posts"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              📚 記事を読む
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
