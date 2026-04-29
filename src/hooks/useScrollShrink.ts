"use client";

import { useEffect, useState } from "react";

export function useScrollShrink(threshold = 80): boolean {
  const [shrink, setShrink] = useState(false);

  useEffect(() => {
    const onScroll = () => setShrink(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return shrink;
}
