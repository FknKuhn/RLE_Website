import { Metadata } from "next";
import NextLink from "next/link";

import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Site Map",
  description: "A list of every page on the RLE Enterprises website.",
};

const linkClass =
  "text-danger font-semibold underline underline-offset-2 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-danger";

export default function SiteMapPage() {
  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Site Map</h1>
      <ul className="space-y-5">
        {siteConfig.sitePages.map((page) => (
          <li key={page.href}>
            <NextLink className={linkClass} href={page.href}>
              {page.label}
            </NextLink>
            <p className="text-foreground/80">{page.description}</p>
            {page.href === "/services" && (
              <ul className="mt-2 ml-6 list-disc space-y-1">
                {siteConfig.serviceTabs.map((s) => (
                  <li key={s.tab}>
                    <NextLink className={linkClass} href={`/services?tab=${s.tab}`}>
                      {s.label}
                    </NextLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
        <li>
          <a className={linkClass} href={siteConfig.links.Join} rel="noopener noreferrer" target="_blank">
            Join Us – employment application
            <span className="sr-only"> (opens in new tab)</span>
          </a>
          <p className="text-foreground/80">Apply to work with RLE Enterprises</p>
        </li>
      </ul>
    </div>
  );
}
