"use client";

import { Logo } from "./logo";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { businessConfig } from "@/lib/data/business";
import { trackClientEvent } from "@/lib/analytics";

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
      { label: "Blog", href: "/blog" },
      { label: "Process", href: "/#process" },
      { label: "Contact", href: "/contact" },
      { label: "Book Intro Call ↗", href: businessConfig.calendlyUrl },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t-4 border-ink bg-bg text-ink">
      <Link
        href="/contact"
        className="group flex items-center justify-between px-5 py-12 transition-colors hover:bg-ink hover:text-bg sm:px-8"
      >
        <span className="font-display text-[clamp(2.5rem,9vw,7rem)] font-black uppercase leading-none tracking-tighter">
          Start a project
        </span>
        <ArrowUpRight className="size-[clamp(2.5rem,7vw,5rem)] shrink-0 transition-transform group-hover:rotate-45" />
      </Link>

      <div className="grid border-t-2 border-ink sm:grid-cols-2 md:grid-cols-4">
        <div className="border-b-2 border-ink p-6 sm:border-r-2 md:border-b-0">
          <Link href="/" aria-label="Bayline Digital home">
            <Logo />
          </Link>
          <p className="mt-4 max-w-[260px] font-mono text-xs leading-relaxed text-muted">
            Modern websites, conversion funnels, and custom workflow systems.
            Toronto, ON · Remote.
          </p>
        </div>

        {COLS.map((c) => (
          <nav key={c.title} className="border-b-2 border-ink last:border-b-0 md:border-r-2 md:border-b-0 md:last:border-r-0">
            <p className="border-b-2 border-ink px-6 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-blue">
              {c.title}
            </p>
            <ul className="m-0 flex list-none flex-col p-0">
              {c.links.map((l) => {
                const isExternal = l.href.startsWith("http");
                const cls =
                  "flex items-center justify-between border-b-2 border-ink px-6 py-2.5 text-sm font-bold uppercase tracking-tight transition-colors last:border-b-0 hover:bg-blue hover:text-white";
                return (
                  <li key={l.label}>
                    {isExternal ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          if (l.href === businessConfig.calendlyUrl) {
                            trackClientEvent("click_calendly", { location: "footer" });
                          }
                        }}
                        className={cls}
                      >
                        {l.label}
                        <span aria-hidden>↗</span>
                      </a>
                    ) : (
                      <Link href={l.href} className={cls}>
                        {l.label}
                        <span aria-hidden>→</span>
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        ))}
      </div>

      <div className="flex flex-wrap justify-between gap-3 border-t-2 border-ink px-6 py-4 font-mono text-[11px] font-bold uppercase tracking-wider text-muted">
        <span>© {new Date().getFullYear()} Bayline Digital Inc. · Toronto, ON</span>
        <span>Designed &amp; engineered in-house</span>
      </div>
    </footer>
  );
}
