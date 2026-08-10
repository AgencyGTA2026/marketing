export const businessConfig = {
  name: "Bayline Digital Inc.",
  shortName: "Bayline Digital",
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/bayline-digital/intro",
  email: "contact@baylinedigital.com",
  phone: "+1 (613) 818-8550",
  hours: "Mon–Fri · 9am–5pm EST",
  office: "Toronto, Ontario",
  responsePromise: "Personal reply within one business day.",
} as const;

export const primaryNavigation = [
  { label: "Services", href: "/services" },
  { label: "Tools", href: "/tools" },
  { label: "Industries", href: "/industries" },
  { label: "Blog", href: "/blog" },
] as const;

export const serviceNavigation = [
  { label: "Custom websites", href: "/services/custom-websites" },
  { label: "Landing pages", href: "/services/landing-pages" },
  { label: "Web apps", href: "/services/web-apps" },
  { label: "Automation", href: "/services/automation" },
  { label: "SEO", href: "/services/seo" },
  { label: "Maintenance", href: "/services/maintenance" },
] as const;
