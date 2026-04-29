import type { Metadata } from "next";
import { SITE } from "@/lib/config";

export const baseMetadata: Metadata = {
  title: SITE.name,
  description: SITE.description,
  metadataBase: new URL(SITE.url),

  openGraph: {
    title: SITE.name,
    description: SITE.description,
    siteName: SITE.name,
    images: [{ url: SITE.ogImage, width: 1200, height: 630 }],
    locale: "ja_JP",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
    images: [SITE.ogImage],
  },
};

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
  ogImage = SITE.ogImage,
  type = "website",
}: GenerateMetadataParams): Metadata {
  const fullTitle = `${title} | ${SITE.name}`;
  const url = `${SITE.url}${path}`;

  return {
    title: fullTitle,
    description,

    openGraph: {
      title: fullTitle,
      description,
      siteName: SITE.name,
      url,
      images: [{ url: ogImage, width: 1200, height: 630 }],
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
