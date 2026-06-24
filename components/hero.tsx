"use client";

import { ArrowDown, Asterisk } from "lucide-react";
import { useLocalTargeting } from "@/lib/hooks/useLocalTargeting";
import { businessConfig } from "@/lib/data/business";
import { trackClientEvent } from "@/lib/analytics";
import Link from "next/link";
import { WordStagger, Marquee } from "./kinetic/motion-primitives";
import { BrutalBadge } from "./kinetic/brutal-ui";

interface HeroProps {
  badge?: string;
  /** Either an array of lines (each rises independently) or a single node/string. */
  headline?: React.ReactNode | React.ReactNode[];
  subheadline?: string;
  ctaLabel?: string;
  secondaryAudienceLabel?: string;
  secondaryAudienceHref?: string;
  showSecondaryCta?: boolean;
  showTicker?: boolean;
  showBadge?: boolean;
  showScrollCue?: boolean;
  appendShippingLine?: boolean;
  /** Accepted for compatibility with inner-page callers; not rendered. */
  visualType?: "default" | "hvac" | "marketing" | "b2b";
}

const TICKER = [
  "Next.js builds",
  "Payload CMS",
  "Lead automation",
  "Local SEO",
  "Internal tools",
  "Conversion funnels",
];

export function Hero({
  badge = "2 build slots left — Summer 2026",
  headline,
  subheadline = "We design polished marketing sites, modernize outdated workflows, and build custom systems that make growth easier to manage. No decks. No discovery phases that last a fiscal year.",
  ctaLabel = "Start a project",
  secondaryAudienceLabel,
  secondaryAudienceHref,
  showSecondaryCta = true,
  showTicker = true,
  showBadge = true,
  showScrollCue = true,
  appendShippingLine = true,
}: HeroProps) {
  const { badgeText } = useLocalTargeting(badge);

  const defaultLines: React.ReactNode[] = [
    "Websites",
    "that hit",
    <>
      like a <span className="bg-blue px-3 text-white">tonne.</span>
    </>,
  ];
  const lines: React.ReactNode[] = Array.isArray(headline)
    ? headline
    : headline
      ? [headline]
      : defaultLines;

  return (
    <section id="top" className="relative overflow-hidden border-b-4 border-ink bg-bg text-ink">
      <div className="relative px-5 pt-16 pb-20 sm:px-8 sm:pt-24">
        {showBadge ? (
          <div className="absolute top-10 right-6 z-10 hidden -rotate-3 sm:block">
            <BrutalBadge>
              <Asterisk className="size-3.5" />
              {badgeText}
            </BrutalBadge>
          </div>
        ) : null}

        <WordStagger
          lines={lines}
          className="font-display text-[clamp(3rem,11vw,9rem)] font-black uppercase leading-[0.88] tracking-tighter"
        />

        <div className="mt-12 flex flex-wrap items-center gap-7">
          <div className="flex flex-col items-start gap-3">
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 border-2 border-ink bg-ink px-8 py-4 text-lg font-black uppercase tracking-tight text-bg shadow-[6px_6px_0_0_var(--color-blue)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_0_var(--color-blue)]"
            >
              {ctaLabel}
            </Link>

            {secondaryAudienceLabel && secondaryAudienceHref ? (
              <Link
                href={secondaryAudienceHref}
                className="font-mono text-[13px] font-bold uppercase tracking-tight text-muted underline decoration-2 underline-offset-4 transition-colors hover:text-blue"
              >
                {secondaryAudienceLabel}
              </Link>
            ) : null}
          </div>

          {showSecondaryCta ? (
            <a
              href={businessConfig.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClientEvent("click_calendly", { location: "hero" })}
              className="border-b-2 border-ink font-mono text-sm font-bold uppercase tracking-tight transition-colors hover:text-blue"
            >
              or book a call ↗
            </a>
          ) : null}

          <p className="max-w-xs font-mono text-sm leading-snug text-muted">
            {subheadline.split(".")[0]}.{appendShippingLine ? " We ship in six weeks." : null}
          </p>

          {showScrollCue ? <ArrowDown className="ml-auto hidden size-10 animate-bounce md:block" /> : null}
        </div>
      </div>

      {showTicker ? (
        <div className="border-t-4 border-ink bg-ink py-3 text-bg">
          <Marquee duration={24}>
            {TICKER.map((item, i) => (
              <span key={i} className="flex items-center gap-8 px-4 font-display text-xl font-black uppercase tracking-tight">
                {item}
                <Asterisk className="size-5 text-blue" />
              </span>
            ))}
          </Marquee>
        </div>
      ) : null}
    </section>
  );
}
