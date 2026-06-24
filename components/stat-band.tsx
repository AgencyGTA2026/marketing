import { Clock, Gauge, Rocket, Star } from "lucide-react";

const STATS = [
  { icon: Rocket, value: "6 wk", label: "Typical ship time", sub: "kickoff to launch" },
  { icon: Gauge, value: "95+", label: "Lighthouse score", sub: "on launch day" },
  { icon: Star, value: "40+", label: "Projects shipped", sub: "and counting" },
  { icon: Clock, value: "1 day", label: "Response time", sub: "to every inquiry" },
];

/**
 * Brutal stat band (Tonne StatCards) — four bordered metric cells. Static.
 */
export function StatBand() {
  return (
    <section className="border-t-4 border-ink bg-bg px-5 py-20 sm:px-8">
      <div className="mx-auto grid max-w-[1280px] border-2 border-ink sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="-mt-px -ml-px border-2 border-ink bg-bg-card p-7">
            <span className="grid size-11 place-items-center border-2 border-ink text-blue">
              <s.icon className="size-5" strokeWidth={2.5} />
            </span>
            <p className="mt-5 font-display text-[clamp(2rem,4vw,3rem)] font-black tracking-tighter">
              {s.value}
            </p>
            <p className="mt-1 font-display text-sm font-black uppercase tracking-tight">{s.label}</p>
            <p className="font-mono text-xs text-muted">{s.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
