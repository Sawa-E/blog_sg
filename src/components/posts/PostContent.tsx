// src/components/posts/PostContent.tsx
"use client";

import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { mdxComponents } from "./mdxComponents";

type Props = {
  source: MDXRemoteSerializeResult;
};

export function PostContent({ source }: Props) {
  return (
    <div className="prose-post-wrapper">
      <div className="prose-post">
        <MDXRemote {...source} components={mdxComponents} />
      </div>
    </div>
  );
}
