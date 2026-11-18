import {
  Fira_Code as FontMono,
  Inter as FontSans,
  News_Cycle as FontNav,
} from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontNav = FontNav({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-nav",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});
