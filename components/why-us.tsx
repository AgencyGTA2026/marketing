"use client";

import { SectionHeader } from "./section-header";
import { Reveal } from "./reveal";

interface WhyUsProps {
  painPoints?: {
    title: string;
    description: string;
  }[];
}

const DEFAULT_WHY = [
  { t: "Clean, considered design", d: "Every page is laid out with intent. No cluttered templates, no random stock graphics, no clutter for clutter's sake." },
  { t: "Fast, on every device", d: "Sites are tuned for performance from day one — quick first paint, smooth scrolling, no broken layouts on phones." },
  { t: "Plain-English communication", d: "You'll never be lost in jargon. Weekly check-ins, clear next steps, and one point of contact from start to finish." },
  { t: "Custom, not cookie-cutter", d: "Everything is shaped around your business, your customers, and the way your team actually works." },
  { t: "Support after launch", d: "Launching is the start, not the end. We stay available for tweaks, content updates, and small fixes." },
  { t: "Built on modern tech", d: "Modern frameworks, modern hosting, and modern security — without the over-engineering that slows everything down." },
];

export function WhyUs({ painPoints }: WhyUsProps) {
  const isCustom = painPoints && painPoints.length > 0;
  const items = isCustom
    ? painPoints.map((p) => ({ t: p.title, d: p.description }))
    : DEFAULT_WHY;

  const eyebrow = isCustom ? "03 — Solutions" : "03 — Why Bayline";
  const title = isCustom ? (
    <>
      Core challenges <br />
      <span className="font-serif italic text-blue">we solve</span>.
    </>
  ) : (
    <>
      Six reasons clients <br />
      <span className="font-serif italic text-blue">keep coming back</span>.
    </>
  );

  const sub = isCustom
    ? "We replace manual friction, outdated tools, and slow turnarounds with fast, secure operational systems."
    : "Bayline stays intentionally small. That means senior people on every project, tighter communication, and a level of care that usually disappears inside bigger agencies.";

  return (
    <section id="why" className="border-y border-line bg-bg-sunken py-32">
      <div className="mx-auto w-full max-w-[1280px] px-8">
        <SectionHeader eyebrow={eyebrow} title={title} sub={sub} />

        <div className="mt-16 overflow-hidden rounded-[20px] border border-line bg-line">
          <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3">
            {items.map((w, i) => (
              <Reveal key={w.t} className="min-h-[220px] bg-bg-card p-7">
                <div className="font-mono text-[11px] text-muted-2 mb-5">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h4 className="m-0 mb-2.5 text-[18px] font-medium tracking-[-0.01em]">{w.t}</h4>
                <p className="m-0 text-[14.5px] leading-[1.55] text-muted">{w.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
