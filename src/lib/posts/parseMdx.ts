import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import remarkMdxImages from "remark-mdx-images";
import rehypeHighlight from "rehype-highlight";

export async function parseMdx(content: string) {
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkMdxImages],
      rehypePlugins: [rehypeHighlight],
    },
  });

  return mdxSource;
}
