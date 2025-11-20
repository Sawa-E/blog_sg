// src/components/posts/PostContent.tsx
"use client";

import React, { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

type Props = {
  content: string;
};

export const PostContent: React.FC<Props> = ({ content }) => {
  return (
    <div className="prose-post-wrapper">
      <div className="prose-post">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            code({ node, inline, className, children, ...props }: any) {
              const [copied, setCopied] = useState(false);
              const codeRef = useRef<HTMLElement | null>(null);

              // インラインコードはそのまま
              if (inline) {
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }

              const handleCopy = async () => {
                try {
                  const text = codeRef.current?.innerText ?? "";
                  if (!text) return;
                  await navigator.clipboard.writeText(text);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1200);
                } catch (e) {
                  console.error("Copy failed", e);
                }
              };

              return (
                <div className="relative group my-3">
                  {/* コピー ボタン */}
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="
                      absolute top-2 right-2 z-10
                      flex items-center gap-1
                      rounded-md bg-gray-800/80
                      px-2 py-1
                      text-[11px] text-gray-100
                      opacity-0 group-hover:opacity-100
                      transition
                      hover:bg-gray-700
                    "
                  >
                    {copied ? (
                      <>
                        <span>✅</span>
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <span>📋</span>
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  {/* 本来のコードブロック */}
                  <pre className={className}>
                    <code ref={codeRef} {...props}>
                      {children}
                    </code>
                  </pre>
                </div>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};
