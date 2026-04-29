"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.scrollingElement || document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(
        total > 0 ? Math.min(100, Math.max(0, (el.scrollTop / total) * 100)) : 0,
      );
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div className="progress" style={{ width: `${progress}%` }} />;
}
