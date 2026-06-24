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
    <section id="process" className="border-t-4 border-ink bg-bg px-5 py-24 sm:px-8">
      <div className="mx-auto w-full max-w-[1280px]">
        <SectionHeader
          eyebrow="04 — Process"
          title={
            <>
              Four steps. <span className="bg-blue px-2 text-white">No drama</span>
            </>
          }
          sub="Most projects ship in four to six weeks. You always know what's happening this week, what's next, and what's blocking — nothing more."
        />

        <div className="mt-14 grid grid-cols-1 border-2 border-ink md:grid-cols-[1fr_1.1fr]">
          <div className="flex flex-col">
            {STEPS.map((s, i) => (
              <button
                key={s.k}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`grid cursor-pointer grid-cols-[48px_1fr_auto] items-center gap-4 border-b-2 border-ink px-6 py-6 text-left transition-colors last:border-b-0 ${
                  active === i ? "bg-ink text-bg" : "bg-bg-card text-ink hover:bg-bg-sunken"
                }`}
              >
                <span className="font-mono text-sm font-bold">0{i + 1}</span>
                <span className="font-display text-2xl font-black uppercase tracking-tight">{s.k}</span>
                <span
                  className={`border-2 px-2.5 py-1 font-mono text-[11px] font-bold uppercase ${
                    active === i ? "border-bg text-bg" : "border-ink text-muted"
                  }`}
                >
                  {s.w}
                </span>
              </button>
            ))}
          </div>

          <div className="border-t-2 border-ink bg-blue p-9 text-white md:border-t-0 md:border-l-2">
            <div className="font-mono text-[11px] font-bold uppercase tracking-widest text-white/70">
              Step 0{active + 1} of 04 · {step.w}
            </div>
            <div>
              <h3 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] font-black uppercase leading-none tracking-tighter">
                {step.k}
              </h3>
              <p className="mt-4 max-w-md text-[15px] font-medium leading-relaxed text-white/90">{step.d}</p>

              <div className="mt-7 border-t-2 border-white/30 pt-5">
                <div className="mb-3 font-mono text-[11px] font-bold uppercase tracking-widest text-white/70">
                  You&apos;ll get
                </div>
                <ul className="m-0 flex list-none flex-col gap-2 p-0">
                  {step.deliverables.map((b) => (
                    <li key={b} className="flex gap-2.5 text-sm font-bold uppercase tracking-tight">
                      <span>—</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
