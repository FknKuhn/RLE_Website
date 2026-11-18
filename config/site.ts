export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "RLE Enterprises",
  description:
    "Family-owned since 1991 in Moscow, PA: trucking & hauling, excavation, crane, oil & gas, towing, dumpster and pilot car services.",
  // Public address of the live site (used for sitemap.xml / robots.txt)
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rleenterprises.com",
  // Every public page, used by the Site Map page and sitemap.xml
  sitePages: [
    { label: "Home", href: "/", description: "About RLE Enterprises and an overview of our services" },
    { label: "Services", href: "/services", description: "Details on each service we offer" },
    { label: "Gallery", href: "/gallery", description: "Photos of our equipment and work" },
    { label: "Shop", href: "/shop", description: "RLE merchandise (coming soon)" },
    { label: "Contact Us", href: "/contact", description: "Address, phone numbers and a contact form" },
    { label: "Privacy Policy", href: "/privacy", description: "What information this site collects and how it is used" },
    { label: "Accessibility", href: "/accessibility", description: "Our accessibility statement and how to report a problem" },
    { label: "Site Map", href: "/site-map", description: "A list of every page on this site" },
  ],
  serviceTabs: [
    { label: "Trucking & Hauling", tab: "trucking" },
    { label: "Excavation", tab: "excavation" },
    { label: "Crane Services", tab: "crane" },
    { label: "Oil & Gas Services", tab: "oil" },
    { label: "Towing Services", tab: "towing" },
    { label: "Dumpster & Container Services", tab: "dumpster" },
    { label: "Pilot Car Services", tab: "pilotservices" },
  ],
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Services",
      href: "/services",
    },
    {
      label: "Gallery",
      href: "/gallery",
    },
    {
      label: "Shop",
      href: "/shop",
    },
    {
      label: "Contact Us",
      href: "/contact",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Services",
      href: "/services",
    },
    {
      label: "Gallery",
      href: "/gallery",
    },
    {
      label: "Shop",
      href: "/shop",
    },
    {
      label: "Contact Us",
      href: "/contact",
    },
  ],
  links: {
    TikTok: "https://github.com/heroui-inc/heroui",
    Instagram: "https://twitter.com/hero_ui",
    LinkedIn: "https://www.linkedin.com/company/heroui",
    Facebook: "https://discord.gg/9b6yyZKmH4",
    Join: "https://form.jotform.com/250494193372056",
  },
  Images: {
    TruckingImage: "/images/TruckingAndHauling.jpg",
    ExcavationImage: "/images/Excavation.jpg",
    CraneImage: "/images/Crane.jpg",
    OilAndGasImage: "/images/OilandGas.jpg",
    TowingImage: "/images/Towing.jpg",
    DumpsterImage: "/images/Dumpster.jpg",
    PilotCarImage: "/images/PilotCar.jpg",
  },
};
