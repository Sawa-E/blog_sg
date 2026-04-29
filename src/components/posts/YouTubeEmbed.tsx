type YouTubeEmbedProps = {
  videoId: string;
  title?: string;
};

export function YouTubeEmbed({
  videoId,
  title = "YouTube video",
}: YouTubeEmbedProps) {
  return (
    <div className="mdx-embed mdx-embed--video">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
