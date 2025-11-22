// tailwind.config.ts（改善版）
import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import lineClamp from "@tailwindcss/line-clamp";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "475px", // 追加: xsブレークポイント
      },
    },
  },
  plugins: [typography, lineClamp],
};

export default config;
