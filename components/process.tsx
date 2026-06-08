"use client";

import { useState } from "react";
import { SectionHeader } from "./section-header";

const STEPS = [
  {
    k: "Discover",
    w: "Week 1",
    d: "We learn about your business, audience, goals, and what's working (and what isn't) on your current site or system.",
    deliverables: ["Kickoff call & questionnaire", "Audit of current site / systems", "Goals & success metrics doc"],
  },
  {
    k: "Plan",
    w: "Week 2",
    d: "We map structure, content, and features into a clear plan you can sign off on before anything visual is built.",
    deliverables: ["Sitemap & content outline", "Wireframes for key pages", "Scope & timeline locked"],
  },
  {
    k: "Build",
    w: "Week 3–5",
    d: "Design and development happen in tight, reviewable steps. You see real progress every week — no big-bang reveals.",
    deliverables: ["Weekly design & dev reviews", "Staging link from week one", "QA on real devices"],
  },
  {
    k: "Launch & Support",
    w: "Ongoing",
    d: "We handle the launch, train your team, and stay available for ongoing improvements once you're live.",
    deliverables: ["Launch checklist & DNS handoff", "Team training session", "Optional monthly care plan"],
  },
];

export function Process() {
  const [active, setActive] = useState(0);
  const step = STEPS[active];

  return (
    <section id="process" className="py-32">
      <div className="mx-auto w-full max-w-[1280px] px-8">
        <SectionHeader
          eyebrow="04 — Process"
          title={<>A simple <span className="font-serif italic text-blue">four-step</span> way of working.</>}
          sub="Most projects ship in four to six weeks. You always know what's happening this week, what's next, and what's blocking — nothing more, nothing less."
        />

        <div className="mt-16 grid grid-cols-1 gap-14 items-start md:grid-cols-[1fr_1.1fr]">
          <div className="flex flex-col">
            {STEPS.map((s, i) => (
              <button
                key={s.k}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className="grid cursor-pointer grid-cols-[48px_1fr_auto] items-center gap-4 border-t border-line py-5 text-left last:border-b last:border-line"
              >
                <span className={`font-mono text-[12px] transition-colors ${active === i ? "text-ink" : "text-muted-2"}`}>
                  0{i + 1}
                </span>
                <span className={`text-[24px] font-medium tracking-[-0.02em] transition-colors ${active === i ? "text-ink" : "text-muted"}`}>
                  {s.k}
                </span>
                <span className={`font-mono text-[11px] text-muted-2 rounded-full border border-line px-2.5 py-1 ${active === i ? "bg-bg-card" : "bg-transparent"}`}>
                  {s.w}
                </span>
              </button>
            ))}
          </div>

          <div className="sticky top-24 min-h-[380px] rounded-[20px] border border-line bg-bg-card p-9 shadow-sm">
            <div className="font-mono text-[11px] text-muted-2 mb-4">
              STEP 0{active + 1} OF 04 · {step.w.toUpperCase()}
            </div>
            <h3 className="m-0 text-[38px] leading-[1.05] tracking-[-0.03em] font-medium">{step.k}</h3>
            <p className="mt-4 text-[17px] leading-[1.55] text-muted">{step.d}</p>

            <div className="mt-7 border-t border-line pt-5">
              <div className="font-mono text-[11px] text-muted-2 mb-3">YOU&apos;LL GET</div>
              <ul className="m-0 flex list-none flex-col gap-2 p-0">
                {step.deliverables.map((b) => (
                  <li key={b} className="flex gap-2.5 text-[14px] text-ink-2">
                    <span className="text-blue">—</span>{b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
