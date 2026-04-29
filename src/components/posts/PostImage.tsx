import type { CSSProperties } from "react";

type PostImageProps = {
  src: string;
  alt: string;
  caption?: string;
  width?: string;
  height?: string;
  maxWidth?: string;
};

export function PostImage({
  src,
  alt,
  caption,
  width = "100%",
  height = "auto",
  maxWidth,
}: PostImageProps) {
  const style: CSSProperties = { width, height, maxWidth };

  return (
    <figure className="mdx-figure">
      <div className="mdx-figure__frame" style={style}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} />
      </div>
      {caption && <figcaption className="mdx-figure__caption">{caption}</figcaption>}
    </figure>
  );
}
