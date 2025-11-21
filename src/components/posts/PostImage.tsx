// src/components/posts/PostImage.tsx
import type { CSSProperties } from "react";

type PostImageProps = {
  src: string;
  alt: string;
  caption?: string;

  // ⭐ 追加：幅・高さ・最大幅を MDX 側で自由指定
  width?: string; // 例: "300px", "100%", "20rem"
  height?: string; // 例: "auto", "200px"
  maxWidth?: string; // 例: "600px", "80%"
};

/**
 * PostImage component for displaying images in blog posts
 * Flexible sizing for MDX usage.
 */
export function PostImage({
  src,
  alt,
  caption,
  width = "100%",
  height = "auto",
  maxWidth,
}: PostImageProps) {
  // CSS の自由指定
  const style: CSSProperties = {
    width,
    height,
    maxWidth,
  };

  return (
    <figure className="my-6 flex flex-col items-center">
      <div
        className="overflow-hidden rounded-xl border border-sky-100 bg-white shadow-sm"
        style={style}
      >
        <img
          src={src}
          alt={alt}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {caption && (
        <figcaption className="mt-2 text-xs text-gray-500 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
