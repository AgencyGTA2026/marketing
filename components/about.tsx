"use client";

import { Reveal } from "./reveal";
import { Eyebrow } from "./section-header";

const PRINCIPLES = [
  ["Make it understandable.", "If a small-business owner can't describe what we built in one sentence, it's wrong."],
  ["Ship in small steps.", "Tight, weekly increments beat heroic launches. Always."],
  ["Choose boring tech.", "Modern, well-supported, and dull where it matters. Save the novelty for the design."],
  ["Stay for the messy bits.", "Launch day is page one of the project, not the last."],
];

const STATS: { value: string; label: string }[] = [
  { value: "40+", label: "Projects shipped" },
  { value: "3 yrs", label: "In business" },
  { value: "96%", label: "Client retention" },
];

export function About() {
  return (
    <section id="about" className="border-t-4 border-ink bg-bg-sunken px-5 py-24 sm:px-8">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="grid grid-cols-1 items-stretch border-2 border-ink lg:grid-cols-[1fr_1.1fr]">
          <div className="border-b-2 border-ink bg-bg-card p-8 sm:p-10 lg:border-b-0 lg:border-r-2">
            <Reveal>
              <Eyebrow>05 — About</Eyebrow>
            </Reveal>
            <Reveal
              as="h2"
              className="m-0 mt-5 mb-7 font-display text-[clamp(2rem,4.4vw,3.4rem)] font-black uppercase leading-[0.92] tracking-tighter"
            >
              Clarity, <span className="bg-blue px-2 text-white">not clutter</span>
            </Reveal>
            <Reveal as="p" className="m-0 max-w-[520px] font-mono text-[14px] leading-relaxed text-muted">
              Bayline Digital is a focused studio building modern websites, campaign-ready landing
              pages, and custom workflow systems for service companies, operators, and growing
              teams. No template farms. No bloated handoff chain — just senior design and
              engineering from kickoff through post-launch.
            </Reveal>

            <Reveal className="mt-9 grid grid-cols-3 gap-px border-2 border-ink bg-ink">
              {STATS.map((s) => (
                <div key={s.label} className="bg-bg-card p-5">
                  <div className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-black tracking-tighter text-ink">
                    {s.value}
                  </div>
                  <div className="mt-1 font-mono text-[10px] font-bold uppercase tracking-wider text-muted">
                    {s.label}
                  </div>
                </div>
              ))}
            </Reveal>
          </div>

          <div className="bg-bg-card p-8 sm:p-10">
            <div className="mb-6 flex items-center justify-between font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
              <span>Bayline / Principles</span>
              <span>v.2026</span>
            </div>
            {PRINCIPLES.map(([t, d], i) => (
              <Reveal
                key={t}
                delay={i * 60}
                className={`grid grid-cols-[40px_1fr] gap-4 border-b-2 border-ink py-5 ${i === 0 ? "border-t-2" : ""} last:border-b-0`}
              >
                <div className="pt-1 font-mono text-sm font-bold text-blue">0{i + 1}</div>
                <div>
                  <div className="mb-1 font-display text-lg font-black uppercase leading-tight tracking-tight">
                    {t}
                  </div>
                  <div className="font-mono text-[12.5px] leading-snug text-muted">{d}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
