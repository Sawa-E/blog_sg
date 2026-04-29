type SpotifyEmbedProps = {
  url: string;
  type?: "track" | "album" | "playlist" | "artist";
  height?: number;
};

function buildEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    const parts = u.pathname.split("/").filter((p) => p && !p.startsWith("intl-"));
    if (parts.length < 2) return null;
    const [embedType, rawId] = parts;
    const id = rawId?.split("?")[0];
    if (!id) return null;
    return `https://open.spotify.com/embed/${embedType}/${id}`;
  } catch {
    return null;
  }
}

export function SpotifyEmbed({ url, type = "track", height }: SpotifyEmbedProps) {
  const embedUrl = buildEmbedUrl(url);

  if (!embedUrl) {
    return (
      <div className="mdx-embed mdx-embed--error">
        <p>
          <strong>無効な Spotify URL です。</strong>
        </p>
        <p>
          URL: <code>{url}</code>
        </p>
        <p>
          正しい形式: <code>https://open.spotify.com/track/...</code>
        </p>
      </div>
    );
  }

  const defaultHeight =
    type === "track" ? 152 : type === "album" ? 352 : 380;
  const finalHeight = height ?? defaultHeight;

  return (
    <div className="mdx-embed mdx-embed--audio">
      <iframe
        src={embedUrl}
        height={finalHeight}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify embed"
      />
    </div>
  );
}
