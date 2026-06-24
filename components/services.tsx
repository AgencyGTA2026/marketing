"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "./section-header";

interface ServicesProps {
  customOrder?: string[];
  customizations?: Record<
    string,
    {
      title?: string;
      blurb?: string;
      bullets?: string[];
    }
  >;
}

const DEFAULT_SERVICES = [
  {
    n: "01",
    title: "Custom CMS Websites (Payload)",
    blurb: "Fully customizable websites built on Payload CMS. Give your team full editing power without bloating code or breaking styles.",
    bullets: ["Payload CMS integration", "Visual editor for non-tech staff", "High-speed Next.js frontend"],
  },
  {
    n: "02",
    title: "Landing Pages for Small Business",
    blurb: "Single-purpose marketing pages built for launches, ads, or local promotions — fast to ship and optimized to convert clicks to calls.",
    bullets: ["Conversion-focused copywriting", "Google Ads tracking & analytics", "Instant loading times (Lighthouse 95+)"],
  },
  {
    n: "03",
    title: "Custom Inventory & Web Apps",
    blurb: "Internal dashboards, client portals, and inventory apps that replace messy spreadsheets and fit your actual operations.",
    bullets: ["Inventory & dispatch tracking", "Secure user roles & auth", "Custom database wiring (Postgres)"],
  },
  {
    n: "04",
    title: "Lead & Retention Automation",
    blurb: "We connect your website, CRM, and SMS/email flows so leads get answered in seconds and customer retention happens on autopilot.",
    bullets: ["SMS auto-dispatch & notifications", "Form-to-CRM automation flows", "Automated retention sequences"],
  },
  {
    n: "05",
    title: "Automated & Local SEO",
    blurb: "Get found in your city. We implement localized schema markup, claim Google Business profiles, and launch high-ranking programmatic SEO pages.",
    bullets: ["Google Business profile setup", "Neighborhood local SEO routes", "Structured schema markup"],
  },
  {
    n: "06",
    title: "Monthly Support & Hosting",
    blurb: "Ongoing care for your digital systems — secure edge-network hosting, daily database backups, and custom script integrations.",
    bullets: ["99.99% uptime edge hosting", "Daily automated data backups", "Priority support window"],
  },
];

const SLUG_MAP: Record<string, string> = {
  "01": "custom-websites",
  "02": "landing-pages",
  "03": "web-apps",
  "04": "automation",
  "05": "seo",
  "06": "maintenance",
};

export function Services({ customOrder, customizations }: ServicesProps) {
  const displayedServices = useMemo(() => {
    let services = DEFAULT_SERVICES.map((s) => {
      const custom = customizations?.[s.n];
      if (custom) {
        return {
          ...s,
          title: custom.title ?? s.title,
          blurb: custom.blurb ?? s.blurb,
          bullets: custom.bullets ?? s.bullets,
        };
      }
      return s;
    });

    if (customOrder && customOrder.length > 0) {
      services = [...services].sort((a, b) => {
        const orderA = customOrder.indexOf(a.n) > -1 ? customOrder.indexOf(a.n) : 999;
        const orderB = customOrder.indexOf(b.n) > -1 ? customOrder.indexOf(b.n) : 999;
        return orderA - orderB;
      });
    }

    return services;
  }, [customOrder, customizations]);

  return (
    <section id="services" className="border-t-4 border-ink bg-bg px-5 py-24 sm:px-8">
      <div className="mx-auto w-full max-w-[1280px]">
        <SectionHeader
          eyebrow="02 — Services"
          title={
            <>
              What we <span className="bg-blue px-2 text-white">build</span>
            </>
          }
          sub="Six services, focused on the things that move the needle. No retainers for vanity work. No decks. We ship."
        />

        <div className="mt-14 grid border-2 border-ink sm:grid-cols-2 lg:grid-cols-3">
          {displayedServices.map((s) => {
            const slug = SLUG_MAP[s.n];
            const href = slug ? `/services/${slug}` : "#";
            return (
              <article
                key={s.n}
                className="group relative -mt-px -ml-px flex min-h-[280px] flex-col border-2 border-ink bg-bg-card p-7 transition-colors duration-150 hover:bg-ink hover:text-bg"
              >
                <Link href={href} className="absolute inset-0 z-20" aria-label={`Learn more about ${s.title}`} />
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs font-bold text-blue group-hover:text-bg">{s.n}</span>
                  <ArrowUpRight className="size-6 transition-transform group-hover:rotate-45" strokeWidth={2.5} />
                </div>
                <h3 className="mt-10 font-display text-xl font-black uppercase leading-tight tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-2.5 font-mono text-[13px] leading-snug opacity-80">{s.blurb}</p>
                <ul className="mt-auto list-none space-y-1 border-t-2 border-current/20 pt-4 pl-0">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-2 text-[12.5px] font-bold uppercase tracking-tight">
                      <span className="text-blue group-hover:text-bg">—</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
