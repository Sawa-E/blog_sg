// src/components/posts/SpotifyEmbed.tsx
type SpotifyEmbedProps = {
  url: string;
  type?: "track" | "album" | "playlist" | "artist";
  height?: number;
};

export function SpotifyEmbed({
  url,
  type = "track",
  height = 152,
}: SpotifyEmbedProps) {
  // URLからSpotify IDを抽出（intl-ja などの言語パスにも対応）
  const getEmbedUrl = () => {
    try {
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split("/").filter((part) => part); // 空文字を除外

      // intl-ja のような言語パスがある場合は除外
      const filteredParts = pathParts.filter(
        (part) => !part.startsWith("intl-")
      );

      if (filteredParts.length < 2) {
        console.error("Invalid Spotify URL structure:", url);
        return null;
      }

      const embedType = filteredParts[0]; // track, album, playlist, artist
      const id = filteredParts[1]?.split("?")[0]; // クエリパラメータを除去

      if (!id) {
        console.error("Invalid Spotify URL - No ID found:", url);
        return null;
      }

      return `https://open.spotify.com/embed/${embedType}/${id}`;
    } catch (error) {
      console.error("Failed to parse Spotify URL:", url, error);
      return null;
    }
  };

  const embedUrl = getEmbedUrl();

  if (!embedUrl) {
    return (
      <div className="my-6 p-6 rounded-xl bg-red-50 border border-red-200">
        <p className="text-red-700 text-sm font-medium mb-2">
          ⚠️ 無効なSpotify URLです
        </p>
        <p className="text-red-600 text-xs break-all">URL: {url}</p>
        <p className="text-gray-600 text-xs mt-2">
          正しい形式: https://open.spotify.com/track/... または
          https://open.spotify.com/intl-ja/track/...
        </p>
      </div>
    );
  }

  // typeに応じた高さの調整
  const getHeight = () => {
    if (type === "track") return height || 152;
    if (type === "album") return height || 352;
    if (type === "playlist") return height || 380;
    if (type === "artist") return height || 380;
    return height;
  };

  const finalHeight = getHeight();

  return (
    <div className="my-8 group">
      {/* 装飾的なグロー効果 */}
      <div className="absolute inset-0 bg-gradient-to-br from-spotify-green/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Spotifyアイコンバッジ */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2 bg-spotify-green px-3 py-1.5 rounded-full shadow-lg">
        <svg
          className="w-4 h-4 text-black"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
        <span className="text-xs font-bold text-black uppercase tracking-wide">
          Spotify
        </span>
      </div>

      {/* iframeコンテナ */}
      <div className="relative" style={{ height: `${finalHeight}px` }}>
        <iframe
          src={embedUrl}
          width="100%"
          height={finalHeight}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="rounded-2xl"
          title="Spotify埋め込みプレイヤー"
        />
      </div>
    </div>
  );
}
