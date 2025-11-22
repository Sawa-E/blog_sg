// tailwind.config.ts
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
        xs: "475px",
      },
      colors: {
        "spotify-green": "#1DB954",
        "spotify-light": "#1ed760",
        "spotify-dark": "#191414",
        "spotify-gray": "#535353",
      },
    },
  },
  plugins: [typography, lineClamp],
};

export default config;
