// src/lib/seo.ts
import type { Metadata } from "next";

export const SITE_URL = "https://blog-sg.pages.dev";
export const SITE_NAME = "そーがの日記";
export const OG_IMAGE_PATH = "/og-image.png";

export const baseMetadata: Metadata = {
  title: SITE_NAME,
  description: "Soga's blog",
  metadataBase: new URL(SITE_URL),

  openGraph: {
    title: SITE_NAME,
    description: "Soga's blog",
    siteName: SITE_NAME,
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
    title: SITE_NAME,
    description: "Soga's blog",
    images: [OG_IMAGE_PATH],
  },
};

// 🆕 ページごとのメタデータを生成するヘルパー関数
type GenerateMetadataParams = {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  type?: "website" | "article";
};

export function generatePageMetadata({
  title,
  description,
  path,
  ogImage = OG_IMAGE_PATH,
  type = "website",
}: GenerateMetadataParams): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const url = `${SITE_URL}${path}`;

  return {
    title: fullTitle,
    description,

    openGraph: {
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
        },
      ],
      locale: "ja_JP",
      type,
    },

    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}
