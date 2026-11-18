import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
        nav: ["var(--font-nav)", "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      // RLE red, white & blue (Old Glory palette)
      themes: {
        dark: {
          colors: {
            background: {
              DEFAULT: "#0B1220",
              foreground: "#E8ECF3",
            },
            foreground: {
              DEFAULT: "#E8ECF3",
            },
            content1: {
              DEFAULT: "#131C2E",
              foreground: "#E8ECF3",
            },
            primary: {
              DEFAULT: "#4C7BD9",
              foreground: "#FFFFFF",
            },
            secondary: {
              DEFAULT: "#4C7BD9",
              foreground: "#FFFFFF",
            },
            danger: {
              DEFAULT: "#F04A3E",
              foreground: "#FFFFFF",
            },
          },
        },
        light: {
          colors: {
            background: {
              DEFAULT: "#F3F4F6",
              foreground: "#0A1F3C",
            },
            foreground: {
              DEFAULT: "#0A1F3C",
            },
            content1: {
              DEFAULT: "#FFFFFF",
              foreground: "#0A1F3C",
            },
            primary: {
              DEFAULT: "#0A3161",
              foreground: "#FFFFFF",
            },
            secondary: {
              DEFAULT: "#0A3161",
              foreground: "#FFFFFF",
            },
            danger: {
              DEFAULT: "#C1121F",
              foreground: "#FFFFFF",
            },
          },
        },
      },
    }),
  ],
};

module.exports = config;
