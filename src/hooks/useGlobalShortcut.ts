"use client";

import { useEffect } from "react";

type Options = {
  key: string;
  withCtrlOrMeta?: boolean;
  enabled?: boolean;
};

export function useGlobalShortcut(
  callback: () => void,
  { key, withCtrlOrMeta = false, enabled = true }: Options,
) {
  useEffect(() => {
    if (!enabled) return;
    const onKey = (e: KeyboardEvent) => {
      if (withCtrlOrMeta && !(e.ctrlKey || e.metaKey)) return;
      if (e.key.toLowerCase() !== key.toLowerCase()) return;
      e.preventDefault();
      callback();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [callback, key, withCtrlOrMeta, enabled]);
}
