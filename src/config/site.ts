export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "ExploreNest",
  description: "information.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About Us",
      href: "/aboutUs",
    },
    {
      label: "Contact Us",
      href: "/contactUs",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About Us",
      href: "/aboutUs",
    },
    {
      label: "Contact Us",
      href: "/contactUs",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
