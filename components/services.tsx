"use client";

import { useMemo } from "react";
import { SectionHeader } from "./section-header";
import { Reveal } from "./reveal";
import Link from "next/link";

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
    bullets: ["SMS auto-dispatch & notifications", "Form-to-CRM automation flows", "Automated customer retention sequences"],
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
    bullets: ["99.99% uptime edge hosting", "Daily automated data backups", "Priority support & updates window"],
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
    // 1. First merge customizations if they exist
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

    // 2. Reorder if customOrder is provided
    if (customOrder && customOrder.length > 0) {
      services = [...services].sort((a, b) => {
        const indexA = customOrder.indexOf(a.n);
        const indexB = customOrder.indexOf(b.n);
        // If an item isn't in customOrder, push it to the end
        const orderA = indexA > -1 ? indexA : 999;
        const orderB = indexB > -1 ? indexB : 999;
        return orderA - orderB;
      });
    }

    return services;
  }, [customOrder, customizations]);

  return (
    <section id="services" className="py-32 bg-bg border-t border-line">
      <div className="mx-auto w-full max-w-[1280px] px-8">
        <SectionHeader
          eyebrow="02 — Services"
          title={<>What we <span className="font-serif italic text-blue">build</span>.</>}
          sub="Six services, focused on the things that move the needle for growing businesses. Pick what you need — or talk to us if you're not sure."
        />
        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {displayedServices.map((s) => (
            <ServiceCard key={s.n} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}


function ServiceCard({ n, title, blurb, bullets }: (typeof DEFAULT_SERVICES)[number]) {
  const slug = SLUG_MAP[n];
  const href = slug ? `/services/${slug}` : "#";

  return (
    <Reveal className="group relative flex min-h-[320px] flex-col rounded-[20px] border border-line bg-bg-card p-7 shadow-sm transition-all duration-300 ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-[3px] hover:shadow-md">
      <Link href={href} className="absolute inset-0 z-30" aria-label={`Learn more about ${title}`} />
      <div className="flex items-start justify-between relative z-20">
        <span className="font-mono text-[11px] text-muted-2">{n}</span>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink transition-colors duration-200 group-hover:bg-ink group-hover:text-bg">
          ↗
        </span>
      </div>
      <h3 className="mt-11 mb-2.5 text-[22px] font-medium tracking-[-0.015em] relative z-20">{title}</h3>
      <p className="m-0 text-[14.5px] leading-[1.55] text-muted relative z-20">{blurb}</p>
      <ul className="mt-5 list-none border-t border-line pt-4 pl-0 relative z-20">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2.5 py-1.5 text-[13px] text-ink-2">
            <span className="text-blue mt-px">—</span>
            {b}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
