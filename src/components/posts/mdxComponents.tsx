// src/components/posts/mdxComponents.tsx
import { Callout } from "@/components/posts/Callout";
import { PostImage } from "@/components/posts/PostImage";
import { SummaryBox } from "@/components/posts/SummaryBox";
import CodeBlock from "@/components/posts/CodeBlock";

export const mdxComponents = {
  Callout,
  PostImage,
  SummaryBox,
  // MDX の <pre> をコピー機能付きの CodeBlock に置き換え
  pre: CodeBlock,
};
