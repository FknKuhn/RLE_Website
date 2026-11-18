"use client";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import clsx from "clsx";
import Image from "next/image";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TikTokIcon,
} from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";
import { siteConfig } from "@/config/site";

const socialLinks = [
  { label: "Instagram", href: siteConfig.links.Instagram, Icon: InstagramIcon },
  { label: "Facebook", href: siteConfig.links.Facebook, Icon: FacebookIcon },
  { label: "TikTok", href: siteConfig.links.TikTok, Icon: TikTokIcon },
  { label: "LinkedIn", href: siteConfig.links.LinkedIn, Icon: LinkedInIcon },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  return (
    <HeroUINavbar
      maxWidth="xl"
      height="5.5rem"
      isBlurred={false}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      onScrollPositionChange={(y) => setIsScrolled(y > 20)}
      classNames={{
        // Fixed, see-through bar that floats over page content
        base: clsx(
          "!fixed top-0 inset-x-0 font-nav backdrop-blur-md transition-colors duration-300",
          isScrolled || isMenuOpen
            ? "bg-white/85 dark:bg-black/80 shadow-sm dark:shadow-none"
            : "bg-white/60 dark:bg-black/40"
        ),
        wrapper: "px-6",
        menu: "bg-white/90 dark:bg-black/85 backdrop-blur-md pt-6 font-nav",
      }}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="max-w-fit">
          <NextLink className="flex items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-danger" href="/">
            <Image
              priority
              unoptimized
              alt="RLE Enterprises home"
              className="h-12 w-auto"
              height={866}
              src="/images/RLE_logo.svg"
              width={3000}
            />
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden lg:flex gap-0" justify="center">
        {siteConfig.navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <NavbarItem key={item.href} isActive={isActive}>
              <NextLink
                className={clsx(
                  "block px-4 leading-[5.5rem] text-[15px] uppercase tracking-[0.12em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-danger focus-visible:-outline-offset-8",
                  isActive
                    ? "text-danger shadow-[inset_0_-3px_0] shadow-danger"
                    : "text-neutral-600 hover:text-black dark:text-[#999999] dark:hover:text-white"
                )}
                aria-current={isActive ? "page" : undefined}
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          );
        })}
      </NavbarContent>

      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="hidden xl:flex gap-3">
          {socialLinks.map(({ label, href, Icon }) => (
            <Link key={label} isExternal aria-label={`${label} (opens in new tab)`} href={href}>
              <Icon className="text-neutral-600 hover:text-black dark:text-[#999999] dark:hover:text-white transition-colors" />
            </Link>
          ))}
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            isExternal
            as={Link}
            className="uppercase tracking-[0.12em] text-sm text-foreground border-danger hover:bg-danger hover:text-white"
            href={siteConfig.links.Join}
            radius="none"
            variant="bordered"
          >
            Join Us
            <span className="sr-only"> (opens in new tab)</span>
          </Button>
        </NavbarItem>
        <NavbarItem className="flex">
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="lg:hidden basis-1 pl-4" justify="end">
        <NavbarItem className="flex sm:hidden">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="flex">
          <NavbarMenuToggle className="text-foreground" />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-4">
          {siteConfig.navMenuItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <NavbarMenuItem key={item.href}>
                <NextLink
                  className={clsx(
                    "text-xl uppercase tracking-[0.15em] transition-colors rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-danger",
                    isActive ? "text-danger" : "text-neutral-700 hover:text-black dark:text-[#cccccc] dark:hover:text-white"
                  )}
                  aria-current={isActive ? "page" : undefined}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </NextLink>
              </NavbarMenuItem>
            );
          })}
          <div className="flex gap-4 pt-4 border-t border-black/10 dark:border-white/10">
            {socialLinks.map(({ label, href, Icon }) => (
              <Link key={label} isExternal aria-label={`${label} (opens in new tab)`} href={href}>
                <Icon className="text-neutral-600 dark:text-[#999999]" />
              </Link>
            ))}
          </div>
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
