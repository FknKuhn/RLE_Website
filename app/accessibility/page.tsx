import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "RLE Enterprises accessibility statement.",
};

export default function AccessibilityPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 space-y-6 leading-relaxed">
      <h1 className="text-4xl font-bold">Accessibility Statement</h1>

      <p>
        RLE Enterprises Inc. is committed to making our website usable by
        everyone, including people with disabilities. We aim to meet the Web
        Content Accessibility Guidelines (WCAG) 2.1, Level AA, and we review
        the site as we add new content.
      </p>

      <h2 className="text-2xl font-semibold">What we do</h2>
      <ul className="list-disc ml-6 space-y-2">
        <li>Text descriptions (alt text) for meaningful images</li>
        <li>Full keyboard navigation, with a &ldquo;Skip to main content&rdquo; link and visible focus indicators</li>
        <li>Labelled form fields and announced form results for screen reader users</li>
        <li>Color contrast that meets WCAG AA, plus light and dark display modes</li>
        <li>Respect for your device&apos;s &ldquo;reduce motion&rdquo; setting</li>
        <li>A <a className="text-danger underline underline-offset-2" href="/site-map">site map</a> listing every page</li>
      </ul>

      <h2 className="text-2xl font-semibold">Third-party content</h2>
      <p>
        Some content, such as our employment application form and social media
        pages, is provided by other companies. We can&apos;t fully control its
        accessibility, but we&apos;re happy to help you through it in another way.
      </p>

      <h2 className="text-2xl font-semibold">Need help or found a problem?</h2>
      <p>
        If anything on this site is hard to use, please let us know and we will
        get you the information or service you need another way. Call us at{" "}
        <a className="text-danger font-semibold underline underline-offset-2" href="tel:+15708424051">
          (570) 842-4051
        </a>{" "}
        or use our{" "}
        <a className="text-danger font-semibold underline underline-offset-2" href="/contact">
          contact form
        </a>
        . We aim to respond within 2 business days.
      </p>

      <p className="text-sm text-foreground/80">Last reviewed: November 2026</p>
    </div>
  );
}
