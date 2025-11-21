// src/components/posts/PostImage.tsx
type PostImageProps = {
  src: string;
  alt: string;
  caption?: string;
};

export function PostImage({ src, alt, caption }: PostImageProps) {
  return (
    <figure className="my-6">
      <div className="overflow-hidden rounded-xl border border-sky-100 bg-white shadow-sm">
        <img src={src} alt={alt} className="w-full h-auto" />
      </div>
      {caption && (
        <figcaption className="mt-2 text-xs text-gray-500 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
