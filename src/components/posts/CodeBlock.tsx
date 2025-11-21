// src/components/posts/CodeBlock.tsx
"use client";

import type { ReactNode, HTMLAttributes } from "react";
import { useState, useRef } from "react";

type CodeBlockProps = HTMLAttributes<HTMLPreElement> & {
  children?: ReactNode;
};

/**
 * CodeBlock component with copy functionality
 * Used as a replacement for <pre> tags in MDX content
 */
export default function CodeBlock({
  children,
  className,
  ...props
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement | null>(null);

  const handleCopy = async () => {
    try {
      const text = preRef.current?.innerText ?? "";
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
        aria-label={copied ? "Copied to clipboard" : "Copy code to clipboard"}
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

      <pre ref={preRef} className={className} {...props}>
        {children}
      </pre>
    </div>
  );
}
