"use client";

import { Reveal } from "./reveal";
import { Button } from "./ui/button";
import { useLocalTargeting } from "@/lib/hooks/useLocalTargeting";
import Link from "next/link";
import { businessConfig } from "@/lib/data/business";
import { trackClientEvent } from "@/lib/analytics";

interface HeroProps {
  badge?: string;
  headline?: string | React.ReactNode;
  subheadline?: string;
  visualType?: "default" | "hvac" | "marketing" | "b2b";
}

export function Hero({
  badge = "Now booking projects — Summer 2026",
  headline = (
    <>
      Modern websites <br />
      and <span className="font-serif italic text-blue text-[1.05em]">automation systems</span> <br />
      built for growing <br />
      businesses.
    </>
  ),
  subheadline = "Bayline Digital designs polished marketing sites, modernizes outdated workflows, and builds custom digital systems that make growth easier to manage.",
}: HeroProps) {
  // Use client-side location detection
  const { badgeText, cityName } = useLocalTargeting(badge);

  // Dynamic local decoration for Ontario cities
  const decoratedHeadline =
    cityName && typeof headline === "string"
      ? headline.replace("localized websites", `${cityName} websites`)
      : headline;

  return (
    <section id="top" className="relative pt-24 pb-32 flex items-center justify-center min-h-[70vh]">
      <div className="mx-auto w-full max-w-[900px] px-8 text-center flex flex-col items-center">
        <Reveal className="mb-7 inline-flex items-center gap-2.5 font-mono text-[11.5px] uppercase tracking-[0.14em] text-muted">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-good animate-pulse" />
          {badgeText}
        </Reveal>

        <Reveal as="h1" className="m-0 text-[clamp(40px,5.8vw,80px)] leading-[0.98] tracking-[-0.035em] font-medium text-ink max-w-4xl mx-auto">
          {decoratedHeadline}
        </Reveal>

        <Reveal as="p" className="mt-9 max-w-[620px] text-[18px] leading-[1.55] text-muted mx-auto">
          {subheadline}
        </Reveal>

        <Reveal className="mt-10 flex flex-wrap justify-center gap-3.5">
          <Button asChild>
            <Link href="#contact">
              Start a project
              <span aria-hidden className="inline-flex h-[22px] w-[22px] items-center justify-center rounded-full bg-white/10 ml-2">→</span>
            </Link>
          </Button>
          <Button asChild variant="outline">
            <a
              href={businessConfig.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClientEvent("click_calendly", { location: "hero" })}
            >
              Book a call
            </a>
          </Button>
        </Reveal>

        <Reveal className="mt-20 flex flex-wrap items-center justify-center gap-7 border-t border-line pt-6 text-[13px] text-muted w-full max-w-[700px]">
          <span className="font-mono text-[11px] text-muted-2">BUILT FOR TEAMS THAT NEED</span>
          <div className="flex flex-wrap justify-center gap-7 text-ink-2 font-medium tracking-[-0.01em]">
            <span>Sharper&nbsp;websites</span>
            <span className="font-serif italic">Editable&nbsp;CMS&nbsp;control</span>
            <span className="font-bold tracking-[-0.03em]">Lead&nbsp;automation</span>
            <span className="font-mono text-[12px]">Internal&nbsp;tools</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
