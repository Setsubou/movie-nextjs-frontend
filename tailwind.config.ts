import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        text: "#e8eaf2",
        cardBackground: "#110d10",
        background: "#070506",
        primary: "#8996dd",
        secondary: "#822556",
        accent: "#d16160",
      },
      fontFamily: {
        jetbrainsMono: ["JetBrainsMono", "monospace"],
      },
      fontSize: {
        'step--2': 'clamp(0.7813rem, 0.7747rem + 0.0326vw, 0.8rem)',
        'step--1': 'clamp(0.9375rem, 0.9158rem + 0.1087vw, 1rem)',
        'step-0': 'clamp(1.125rem, 1.0815rem + 0.2174vw, 1.25rem)',
        'step-1': 'clamp(1.35rem, 1.2761rem + 0.3696vw, 1.5625rem)',
        'step-2': 'clamp(1.62rem, 1.5041rem + 0.5793vw, 1.9531rem)',
        'step-3': 'clamp(1.944rem, 1.771rem + 0.8651vw, 2.4414rem)',
        'step-4': 'clamp(2.3328rem, 2.0827rem + 1.2504vw, 3.0518rem)',
        'step-5': 'clamp(2.7994rem, 2.4462rem + 1.7658vw, 3.8147rem)',
      },
    },
  },
  plugins: [],
} satisfies Config;
