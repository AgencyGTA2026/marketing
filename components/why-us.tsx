"use client";

import { Check, X } from "lucide-react";
import { SectionHeader } from "./section-header";
import { Reveal } from "./reveal";

interface WhyUsProps {
  painPoints?: {
    title: string;
    description: string;
  }[];
}

const DEFAULT_WHY = [
  { t: "Clean, considered design", d: "Every page is laid out with intent. No cluttered templates, no random stock graphics." },
  { t: "Fast, on every device", d: "Tuned for performance from day one — quick first paint, smooth scrolling, no broken mobile layouts." },
  { t: "Plain-English communication", d: "No jargon. Weekly check-ins, clear next steps, one point of contact start to finish." },
  { t: "Custom, not cookie-cutter", d: "Shaped around your business, your customers, and the way your team actually works." },
  { t: "Support after launch", d: "Launching is the start, not the end. We stay on for tweaks, content, and small fixes." },
  { t: "Built on modern tech", d: "Modern frameworks, hosting, and security — without over-engineering that slows things down." },
];

const COMPARE = [
  "Senior engineer on every project",
  "100% code ownership, no lock-in",
  "Fixed scope, fixed price up front",
  "Ships in six weeks, not six months",
  "Direct builder access, no account managers",
  "Lighthouse 95+ on launch day",
];

export function WhyUs({ painPoints }: WhyUsProps) {
  const isCustom = painPoints && painPoints.length > 0;
  const items = isCustom
    ? painPoints.map((p) => ({ t: p.title, d: p.description }))
    : DEFAULT_WHY;

  const eyebrow = isCustom ? "03 — Solutions" : "03 — Why Bayline";
  const title = isCustom ? (
    <>
      Core challenges <span className="bg-blue px-2 text-white">we solve</span>
    </>
  ) : (
    <>
      Why teams <span className="bg-blue px-2 text-white">come back</span>
    </>
  );

  const sub = isCustom
    ? "We replace manual friction, outdated tools, and slow turnarounds with fast, secure operational systems."
    : "Bayline stays intentionally small. Senior people on every project, tighter communication, and care that disappears inside bigger agencies.";

  return (
    <section id="why" className="border-t-4 border-ink bg-bg-sunken px-5 py-24 sm:px-8">
      <div className="mx-auto w-full max-w-[1280px]">
        <SectionHeader eyebrow={eyebrow} title={title} sub={sub} />

        <div className="mt-14 grid border-2 border-ink sm:grid-cols-2 lg:grid-cols-3">
          {items.map((w, i) => (
            <div
              key={w.t}
              className="group -mt-px -ml-px min-h-[200px] border-2 border-ink bg-bg-card p-7 transition-colors duration-150 hover:bg-ink hover:text-bg"
            >
              <div className="font-mono text-xs font-bold text-blue group-hover:text-bg">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h4 className="mt-5 font-display text-lg font-black uppercase leading-tight tracking-tight">
                {w.t}
              </h4>
              <p className="mt-2 font-mono text-[13px] leading-snug opacity-80">{w.d}</p>
            </div>
          ))}
        </div>

        {!isCustom && (
          <Reveal className="mt-14 border-2 border-ink bg-bg-card">
            <div className="grid grid-cols-[1fr_auto_auto] border-b-2 border-ink">
              <div className="p-4" />
              <div className="flex w-24 items-center justify-center border-l-2 border-ink bg-blue p-4 text-center font-display text-sm font-black uppercase text-white sm:w-36">
                Bayline
              </div>
              <div className="flex w-24 items-center justify-center border-l-2 border-ink p-4 text-center font-mono text-xs font-bold uppercase text-muted sm:w-36">
                Typical agency
              </div>
            </div>
            {COMPARE.map((row, i) => (
              <div
                key={row}
                className={`grid grid-cols-[1fr_auto_auto] items-center ${
                  i > 0 ? "border-t-2 border-ink" : ""
                }`}
              >
                <p className="p-4 text-sm font-bold uppercase tracking-tight">{row}</p>
                <div className="flex w-24 justify-center border-l-2 border-ink p-4 sm:w-36">
                  <span className="grid size-7 place-items-center bg-blue text-white">
                    <Check className="size-4" strokeWidth={3} />
                  </span>
                </div>
                <div className="flex w-24 justify-center border-l-2 border-ink p-4 sm:w-36">
                  <span className="grid size-7 place-items-center border-2 border-ink text-muted">
                    <X className="size-4" strokeWidth={3} />
                  </span>
                </div>
              </div>
            ))}
          </Reveal>
        )}
      </div>
    </section>
  );
}
