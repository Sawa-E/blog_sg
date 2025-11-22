// src/components/posts/mdxComponents.tsx
import { Callout } from "@/components/posts/Callout";
import { PostImage } from "@/components/posts/PostImage";
import { SummaryBox } from "@/components/posts/SummaryBox";
import CodeBlock from "@/components/posts/CodeBlock";
import type { MDXComponents } from "mdx/types";
import { SpotifyEmbed } from "./SpotifyEmbed";

/**
 * MDX components mapping
 * Maps custom components and HTML elements for MDX rendering
 */
export const mdxComponents: MDXComponents = {
  Callout,
  PostImage,
  SummaryBox,
  SpotifyEmbed,
  // Replace <pre> tags with CodeBlock component for copy functionality
  pre: CodeBlock,
};
