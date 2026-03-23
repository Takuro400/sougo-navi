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
          50:  "#eef2ff",
          100: "#e0e7ff",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
        },
        accent: {
          400: "#fbbf24",
          500: "#f59e0b",
        },
        // 後方互換のために残す
        surface: {
          50:  "#fafafa",
          100: "#f4f4f5",
          200: "#e4e4e7",
        },
      },
      fontFamily: {
        sans:    ["'Noto Sans JP'", "sans-serif"],
        display: ["'Zen Kaku Gothic New'", "sans-serif"],
        mincho:  ["'Noto Serif JP'", "serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      boxShadow: {
        "glow-indigo": "0 0 24px rgba(99,102,241,0.35)",
        "glow-violet": "0 0 24px rgba(139,92,246,0.35)",
      },
    },
  },
  plugins: [],
};
export default config;
