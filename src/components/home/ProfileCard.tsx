// src/components/home/ProfileCard.tsx

export function ProfileCard() {
  return (
    <section
      className="
        flex items-center gap-6
        rounded-2xl border border-sky-100
        bg-white/80 backdrop-blur-sm
        p-6 shadow-sm
        hover:shadow-md transition-all duration-300
      "
    >
      {/* 左：丸アイコン（プロフィール画像） */}
      <div className="flex-shrink-0">
        <div className="w-[100px] h-[100px] rounded-full border border-sky-200 shadow-sm overflow-hidden bg-sky-50">
          <img
            src="/icons/profile.png"
            alt="そーがのアイコン"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>

      {/* 右：テキスト & SNS */}
      <div className="flex-1">
        <h2 className="text-xl font-bold text-sky-800 mb-1 flex items-center gap-2">
          <span aria-hidden="true">🐬</span> そーがです
        </h2>

        <p className="text-gray-700 leading-relaxed mb-3">
          ゆるっと開発メモや日記を書いています。
        </p>

        {/* SNS アイコン */}
        <div className="flex items-center gap-4">
          {/* X(Twitter) */}
          <a
            href="https://x.com/swa2_ga"
            target="_blank"
            rel="noreferrer"
            aria-label="X (Twitter) を開く"
            className="hover:scale-110 transition-transform"
          >
            <img
              src="/icons/x-logo.svg"
              alt="X(Twitter)アイコン"
              className="w-6 h-6 invert"
            />
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/Sawa-E"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub を開く"
            className="hover:scale-110 transition-transform"
          >
            <img
              src="/icons/github-mark.svg"
              alt="GitHubアイコン"
              className="w-6 h-6"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
