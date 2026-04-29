"use client";

import { useState } from "react";
import { SITE } from "@/lib/config";

type ShareButtonsProps = {
  slug: string;
};

export function ShareButtons({ slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/posts/${slug}`
      : `${SITE.url}/posts/${slug}`;

  const copyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  };

  return (
    <div className="share">
      <span className="share__label">share</span>
      <button
        type="button"
        className={`icon-btn${copied ? " copied" : ""}`}
        title="リンクをコピー"
        aria-label="リンクをコピー"
        onClick={copyLink}
      >
        {copied ? (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12l4.5 4.5L19 7" />
          </svg>
        ) : (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
            <path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
          </svg>
        )}
      </button>
    </div>
  );
}
