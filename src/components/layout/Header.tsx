"use client";

import { useState } from "react";
import Link from "next/link";
import { GlobalSearch } from "@/components/search/GlobalSearch";
import { Nav } from "@/components/layout/Nav";
import { useGlobalShortcut } from "@/hooks/useGlobalShortcut";
import type { PostMeta } from "@/lib/posts/type";

type HeaderProps = {
  allPosts: PostMeta[];
};

export function Header({ allPosts }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useGlobalShortcut(() => setSearchOpen(true), {
    key: "k",
    withCtrlOrMeta: true,
  });

  return (
    <>
      <header className="site-header">
        <div className="container site-header__inner">
          <Link href="/" className="brand" aria-label="さわの日記">
            <span className="brand__mark" />
            <span className="brand__name">さわの日記</span>
            <span className="brand__sub">sawa.log</span>
          </Link>

          <nav className="nav" aria-label="メインナビ">
            <Nav variant="desktop" />
            <button
              type="button"
              className="nav__search"
              aria-label="検索を開く"
              onClick={() => setSearchOpen(true)}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
              <span>検索</span>
            </button>
            <button
              type="button"
              className="nav__toggle"
              aria-label={open ? "メニューを閉じる" : "メニューを開く"}
              onClick={() => setOpen((v) => !v)}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                {open ? (
                  <>
                    <path d="M5 5l14 14" />
                    <path d="M19 5L5 19" />
                  </>
                ) : (
                  <>
                    <path d="M4 7h16" />
                    <path d="M4 12h16" />
                    <path d="M4 17h16" />
                  </>
                )}
              </svg>
            </button>
          </nav>
        </div>

        <div className={`nav__sheet${open ? " open" : ""}`}>
          <Nav variant="mobile" onItemClick={() => setOpen(false)} />
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              setSearchOpen(true);
            }}
            style={{
              display: "block",
              width: "100%",
              textAlign: "left",
              padding: "14px 8px",
              fontSize: 16,
              color: "var(--ink)",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            検索
          </button>
        </div>
      </header>

      <GlobalSearch
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        allPosts={allPosts}
      />
    </>
  );
}
