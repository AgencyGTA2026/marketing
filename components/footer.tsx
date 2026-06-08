import { Logo } from "./logo";
import Link from "next/link";

const COLS = [
  {
    title: "Services",
    links: [
      { label: "Custom CMS Websites", href: "/services/custom-websites" },
      { label: "Landing Pages", href: "/services/landing-pages" },
      { label: "Inventory & Web Apps", href: "/services/web-apps" },
      { label: "Lead Automation", href: "/services/automation" },
      { label: "Automated & Local SEO", href: "/services/seo" },
      { label: "Monthly Support & Hosting", href: "/services/maintenance" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "B2B Enterprise", href: "/industries/b2b-enterprises" },
      { label: "SEO Marketing", href: "/industries/marketing-firms" },
      { label: "Home Services", href: "/industries/home-services" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "About", href: "/#about" },
      { label: "Process", href: "/#process" },
      { label: "Work", href: "/work" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Elsewhere",
    links: [
      { label: "LinkedIn ↗", href: "https://linkedin.com" },
      { label: "Clutch ↗", href: "https://clutch.co" },
      { label: "GitHub ↗", href: "https://github.com" },
      { label: "Dribbble ↗", href: "https://dribbble.com" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line px-0 pb-9 pt-14 bg-bg">
      <div className="mx-auto w-full max-w-[1280px] px-8">
        <div className="grid grid-cols-1 gap-10 pb-10 sm:grid-cols-2 md:grid-cols-5 md:[&>:first-child]:col-span-1">
          <div>
            <Link href="/" aria-label="Bayline Digital home">
              <Logo />
            </Link>
            <p className="mt-4 max-w-[280px] text-[14px] leading-[1.55] text-muted">
              Bayline Digital builds modern websites, conversion-focused funnels, and custom workflow systems for teams that care about clarity, speed, and dependable execution.
            </p>
          </div>
          {COLS.map((c) => (
            <div key={c.title}>
              <div className="mb-3.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-2">
                {c.title}
              </div>
              <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                {c.links.map((l) => {
                  const isExternal = l.href.startsWith("http");
                  return (
                    <li key={l.label}>
                      {isExternal ? (
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[14px] text-ink-2 transition-colors hover:text-blue"
                        >
                          {l.label}
                        </a>
                      ) : (
                        <Link href={l.href} className="text-[14px] text-ink-2 transition-colors hover:text-blue">
                          {l.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-between gap-3 border-t border-line pt-6 text-[12px] text-muted-2">
          <span className="font-mono">© 2026 BAYLINE DIGITAL INC. · TORONTO, ON</span>
          <span className="font-mono">DESIGNED &amp; ENGINEERED IN-HOUSE</span>
        </div>
      </div>
    </footer>
  );
}
