// src/components/posts/YouTubeEmbed.tsx
type YouTubeEmbedProps = {
  videoId: string;
  title?: string;
};

export function YouTubeEmbed({
  videoId,
  title = "YouTube video",
}: YouTubeEmbedProps) {
  return (
    <div className="my-8 rounded-xl overflow-hidden shadow-lg border border-gray-200">
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
