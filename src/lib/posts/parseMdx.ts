// src/lib/posts/parseMdx.ts
import { serialize } from "next-mdx-remote/serialize";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeMdxImportMedia from "rehype-mdx-import-media";

/**
 * Parse MDX content into a serialized format for rendering
 * 
 * Plugins used:
 * - remarkGfm: GitHub Flavored Markdown support
 * - rehypeHighlight: Syntax highlighting for code blocks
 * - rehypeMdxImportMedia: Auto-import images referenced in MDX
 * 
 * @param content - Raw MDX content string
 * @returns Serialized MDX ready for rendering with MDXRemote
 */
export async function parseMdx(
  content: string
): Promise<MDXRemoteSerializeResult> {
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeHighlight, rehypeMdxImportMedia],
    },
  });

  return mdxSource;
}
