export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Explore Nest",
  description: "Make your journey with Nest",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "News Feed",
      href: "news-feed",
    },
    {
      label: "Contact",
      href: "/contact",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "News Feed",
      href: "news-feed",
    },
    {
      label: "Contact",
      href: "/contact",
    },
    {
      label: "About",
      href: "/about",
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
