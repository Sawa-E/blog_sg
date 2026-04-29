"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/config";

type Props = {
  variant: "desktop" | "mobile";
  onItemClick?: () => void;
};

export function Nav({ variant, onItemClick }: Props) {
  const pathname = usePathname();
  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname === path || pathname.startsWith(`${path}/`);

  if (variant === "mobile") {
    return (
      <>
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onItemClick}
            className={isActive(link.href) ? "active" : ""}
          >
            {link.label}
          </Link>
        ))}
      </>
    );
  }

  return (
    <>
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={isActive(link.href) ? "active" : ""}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}
