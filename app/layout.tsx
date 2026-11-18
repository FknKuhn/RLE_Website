import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { fontNav, fontSans } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import "@/styles/globals.css";
import { Divider } from "@heroui/divider";
import clsx from "clsx";
import { Metadata, Viewport } from "next";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F3F4F6" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1220" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable,
          fontNav.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          {/* Lets keyboard / screen reader users jump past the navigation */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:bg-danger focus:text-white focus:font-semibold"
          >
            Skip to main content
          </a>
          <div className="relative flex flex-col h-screen gap-10 overflow-x-clip">
            <Navbar />
            <main
              id="main-content"
              tabIndex={-1}
              className="container mx-auto max-w-7xl pt-24 px-6 flex-grow focus:outline-none"
            >
              {children}
            </main>
            <Divider />
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
