"use client";

import { ShieldCheck, Zap, Cpu } from "lucide-react";
import { SectionHeader } from "./section-header";
import { Reveal } from "./reveal";

const PILLARS = [
  {
    n: "01",
    icon: ShieldCheck,
    title: "Trust & Accountability",
    body: "Trust is the currency of local commerce. 100% code ownership, direct builder access, and fast, beautiful sites customers trust on sight.",
    points: [
      ["100% Code Ownership", "No hostage hosting. You own the Next.js source from day one."],
      ["Customer-Facing Credibility", "Modern, secure designs that make customers feel safe calling you."],
      ["Direct Builder Access", "No account managers. You work with the engineers building your system."],
    ],
    featured: true,
  },
  {
    n: "02",
    icon: Zap,
    title: "Speed & Conversion",
    body: "Supersonic React/Next.js pages that kill bounces and turn local search traffic into paying customers.",
    points: [
      ["Sub-Second Load Times", "Lighthouse performance scores of 95+, every build."],
      ["Clarity & Copywriting", "Simple, persuasive copy. No confusing jargon."],
      ["Mobile-First Engineering", "Custom-responsive touchpoints for the 65% on mobile."],
    ],
    featured: false,
  },
  {
    n: "03",
    icon: Cpu,
    title: "Operational Utility",
    body: "Tools that eliminate friction, automate manual admin, and connect your whole business stack.",
    points: [
      ["No-Friction Automations", "Auto-sync leads, bookings, and alerts across your tools."],
      ["Neighborhood Local SEO", "Structured schema + Google Business optimization."],
      ["Tailored Content Control", "Intuitive Payload CMS your staff can update instantly."],
    ],
    featured: false,
  },
];

export function Philosophy() {
  return (
    <section id="philosophy" className="border-t-4 border-ink bg-bg px-5 py-24 sm:px-8">
      <div className="mx-auto w-full max-w-[1280px]">
        <SectionHeader
          eyebrow="01 — Philosophy"
          title={
            <>
              Built on <span className="bg-blue px-2 text-white">trust</span>
            </>
          }
          sub="Small businesses live and die by their local reputation. Digital partnerships should run on the same foundations: transparency, clarity, accountability."
        />

        <div className="mt-14 grid border-2 border-ink lg:grid-cols-3">
          {PILLARS.map((p) => (
            <Reveal
              key={p.n}
              className={`group -mt-px -ml-px flex flex-col border-2 border-ink p-8 transition-colors duration-150 ${
                p.featured
                  ? "bg-blue text-white"
                  : "bg-bg-card text-ink hover:bg-ink hover:text-bg"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`grid size-12 place-items-center border-2 ${
                    p.featured ? "border-white" : "border-ink group-hover:border-bg"
                  }`}
                >
                  <p.icon size={24} strokeWidth={2.5} />
                </span>
                <div>
                  <span className="block font-mono text-[11px] font-bold uppercase tracking-widest opacity-70">
                    Pillar {p.n}
                  </span>
                  <h3 className="font-display text-xl font-black uppercase leading-none tracking-tight">
                    {p.title}
                  </h3>
                </div>
              </div>

              <p className="mt-6 text-[14px] font-medium leading-relaxed opacity-90">{p.body}</p>

              <ul className="mt-7 flex-1 list-none space-y-4 border-t-2 border-current/25 pt-6 pl-0">
                {p.points.map(([h, d]) => (
                  <li key={h} className="flex gap-3">
                    <span className="mt-0.5 font-mono text-sm font-bold">→</span>
                    <div>
                      <h4 className="m-0 text-[14px] font-black uppercase tracking-tight">{h}</h4>
                      <p className="m-0 mt-1 font-mono text-[12px] leading-snug opacity-75">{d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
