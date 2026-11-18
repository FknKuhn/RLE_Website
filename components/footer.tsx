import { siteConfig } from "@/config/site";
import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";
import NextLink from "next/link";
import { FacebookIcon, InstagramIcon, LinkedInIcon, TikTokIcon } from "./icons";

const socialLinks = [
  { label: "Instagram", href: siteConfig.links.Instagram, Icon: InstagramIcon },
  { label: "Facebook", href: siteConfig.links.Facebook, Icon: FacebookIcon },
  { label: "TikTok", href: siteConfig.links.TikTok, Icon: TikTokIcon },
  { label: "LinkedIn", href: siteConfig.links.LinkedIn, Icon: LinkedInIcon },
];

const focusRing =
  "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-danger";

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-dark)] text-foreground">
      {/* Main Footer Content */}
      <div className="flex justify-center pb-4 pt-6">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Social Media */}
            <div className="flex flex-col items-center justify-center">
              <ul className="flex gap-4 mb-6" aria-label="RLE Enterprises on social media">
                {socialLinks.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <Link
                      isExternal
                      aria-label={`${label} (opens in new tab)`}
                      className={`text-inherit no-underline ${focusRing}`}
                      href={href}
                    >
                      <Icon size={32} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* vertical divider on md+, horizontal divider on mobile */}
            <Divider
              orientation="vertical"
              className="hidden md:block w-px bg-[var(--border)] self-stretch"
            />
            <Divider
              orientation="horizontal"
              className="block md:hidden h-px bg-[var(--border)] w-full my-4"
            />

            {/* Contact Information */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-x-10">
              <div className="text-center md:text-left">
                <h2 className="text-lg font-semibold">Physical address</h2>
                <address className="not-italic text-sm text-foreground/80 mb-4 space-y-1">
                  <p>R.L.E. Enterprises Inc.</p>
                  <p>R-457 N. Main St.</p>
                  <p>Moscow, PA 18444</p>
                </address>
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-lg font-semibold">Mailing address</h2>
                <address className="not-italic text-sm text-foreground/80 mb-4 space-y-1">
                  <p>R.L.E. Enterprises Inc.</p>
                  <p>P.O. Box #249</p>
                  <p>Moscow, PA 18444</p>
                </address>
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-lg font-semibold">Contact us</h2>
                <p className="text-sm text-foreground/80">
                  Phone:{" "}
                  <a className={`underline underline-offset-2 ${focusRing}`} href="tel:+15708424051">
                    (570) 842-4051
                  </a>
                </p>
                <p className="text-sm text-foreground/80">Fax: (570) 842-4052</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 mb-4">
            <nav aria-label="Footer">
              <ul className="flex gap-6 text-sm">
                <li>
                  <NextLink className={`underline underline-offset-2 ${focusRing}`} href="/site-map">
                    Site Map
                  </NextLink>
                </li>
                <li>
                  <NextLink className={`underline underline-offset-2 ${focusRing}`} href="/privacy">
                    Privacy Policy
                  </NextLink>
                </li>
                <li>
                  <NextLink className={`underline underline-offset-2 ${focusRing}`} href="/accessibility">
                    Accessibility
                  </NextLink>
                </li>
              </ul>
            </nav>
            <p className="text-sm text-center text-foreground/75">
              Copyright © RLE Enterprises Inc., All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
