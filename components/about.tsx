import { Reveal } from "./reveal";
import { Eyebrow } from "./section-header";

const PRINCIPLES = [
  ["Make it understandable.", "If a small-business owner can't describe what we built in one sentence, it's wrong."],
  ["Ship in small steps.", "Tight, weekly increments beat heroic launches. Always."],
  ["Choose boring tech.", "Modern, well-supported, and dull where it matters. Save the novelty for the design."],
  ["Stay for the messy bits.", "Launch day is page one of the project, not the last."],
];

const STATS = [
  ["40+", "Projects shipped"],
  ["6 yrs", "In business"],
  ["96%", "Client retention"],
];

export function About() {
  return (
    <section id="about" className="border-y border-line bg-bg-sunken py-32">
      <div className="mx-auto w-full max-w-[1280px] px-8">
        <div className="grid grid-cols-1 gap-14 items-center lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <Reveal>
              <Eyebrow>06 — About</Eyebrow>
            </Reveal>
            <Reveal as="h2" className="m-0 mt-5 mb-7 text-[clamp(36px,4.6vw,56px)] tracking-[-0.03em] leading-none font-medium">
              Bayline Digital for <br />teams that want <br />
              <span className="font-serif italic text-blue">clarity</span>, not clutter.
            </Reveal>
            <Reveal as="p" className="m-0 max-w-[520px] text-[17px] leading-[1.65] text-muted">
              Bayline Digital is a focused studio building modern websites, campaign-ready landing
              pages, and custom workflow systems for service companies, operators, and growing
              teams. We care about crisp communication, sensible technology, and work that holds up
              after launch.
            </Reveal>
            <Reveal as="p" className="mt-[18px] max-w-[520px] text-[17px] leading-[1.65] text-muted">
              No template farms. No bloated handoff chain. Just senior design and engineering
              attention from kickoff through post-launch iteration.
            </Reveal>

            <Reveal className="mt-9 grid grid-cols-3 gap-4 border-t border-line pt-7">
              {STATS.map(([v, l]) => (
                <div key={l}>
                  <div className="text-[32px] font-medium tracking-[-0.02em]">{v}</div>
                  <div className="mt-1 font-mono text-[11px] text-muted-2">{l.toUpperCase()}</div>
                </div>
              ))}
            </Reveal>
          </div>

          <Reveal className="relative px-2">
            <div className="rounded-[22px] border border-line bg-bg-card p-7 shadow-md">
              <div className="mb-6 flex items-center justify-between">
                <div className="font-mono text-[10px] text-muted-2">BAYLINE / PRINCIPLES</div>
                <div className="font-mono text-[10px] text-muted-2">v.2026</div>
              </div>
              {PRINCIPLES.map(([t, d], i) => (
                <div
                  key={t}
                  className={`grid grid-cols-[40px_1fr] gap-4 border-b border-line py-[18px] ${i === 0 ? "border-t" : ""}`}
                >
                  <div className="font-mono text-[11px] text-muted-2 pt-1">0{i + 1}</div>
                  <div>
                    <div className="mb-1 text-[18px] font-medium tracking-[-0.01em]">{t}</div>
                    <div className="text-[14.5px] leading-[1.5] text-muted">{d}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute -right-2.5 -top-4 rounded-xl bg-ink px-3 py-2 font-mono text-[12px] text-bg shadow-md">
              ● EST. 2020
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
