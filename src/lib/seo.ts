// src/lib/seo.ts
import type { Metadata } from "next";

export const SITE_URL = "https://blog-sg.pages.dev";
export const OG_IMAGE_PATH = "/og-image.png";

export const baseMetadata: Metadata = {
  title: "そーがの日記",
  description: "Soga's blog",
  metadataBase: new URL(SITE_URL),

  openGraph: {
    title: "そーがの日記",
    description: "Soga's blog",
    siteName: "そーがの日記",
    images: [
      {
        url: OG_IMAGE_PATH,
        width: 1200,
        height: 630,
      },
    ],
    locale: "ja_JP",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "そーがの日記",
    description: "Soga's blog",
    images: [OG_IMAGE_PATH],
  },
};
