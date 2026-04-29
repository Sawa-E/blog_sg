"use client";

import type { ReactNode, HTMLAttributes } from "react";
import { useState, useRef } from "react";

type CodeBlockProps = HTMLAttributes<HTMLPreElement> & {
  children?: ReactNode;
};

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
      setTimeout(() => setCopied(false), 1400);
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

  return (
    <div className="mdx-code">
      <button
        type="button"
        onClick={handleCopy}
        className={`mdx-code__copy${copied ? " copied" : ""}`}
        aria-label={copied ? "Copied" : "Copy code to clipboard"}
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <pre ref={preRef} className={className} {...props}>
        {children}
      </pre>
    </div>
  );
}
