import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f7ff",
          100: "#dbeafe",
          500: "#2563eb",
          600: "#1d4ed8",
          700: "#1e40af",
        },
        accent: {
          400: "#fb923c",
          500: "#f97316",
        },
        surface: {
          50: "#fafafa",
          100: "#f4f4f5",
          200: "#e4e4e7",
        },
      },
      fontFamily: {
        sans: ["'Noto Sans JP'", "sans-serif"],
        display: ["'Zen Kaku Gothic New'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
