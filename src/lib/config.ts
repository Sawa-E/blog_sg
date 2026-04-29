export const SITE = {
  name: "さわの日記",
  description: "Sawa's blog",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://blog.sawakun.com",
  ogImage: "/og-image.png",
  repository: "https://github.com/Sawa-E/blog_sg",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/posts", label: "Posts" },
  { href: "/tags", label: "Tags" },
  { href: "/about", label: "About" },
] as const;

export type SocialLink = {
  name: string;
  username: string;
  url: string;
  icon: string;
  label: string;
  description: string;
  gradient: string;
  iconClass: string;
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "GitHub",
    username: "@Sawa-E",
    url: "https://github.com/Sawa-E",
    icon: "/icons/github-mark.svg",
    label: "GitHub",
    description: "コード保管庫",
    gradient: "from-gray-800 to-black",
    iconClass: "w-6 h-6",
  },
  {
    name: "Instagram",
    username: "@sawa_sgsg",
    url: "https://instagram.com/sawa_sgsg",
    icon: "/icons/instagram-logo.svg",
    label: "Instagram",
    description: "写真メイン",
    gradient: "from-pink-500 to-purple-600",
    iconClass: "w-6 h-6",
  },
];
