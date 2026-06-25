import { Reveal } from "./reveal";

const PILLARS = [
  {
    k: "A",
    title: "Built to be found",
    body: "Local SEO, Google Business, and clean schema so you show up when people in the towns you serve are searching.",
  },
  {
    k: "B",
    title: "Built to convert",
    body: "Fast load times, clear calls-to-action, and forms wired to your inbox and phone — so visits turn into booked jobs.",
  },
  {
    k: "C",
    title: "Built to own",
    body: "Custom code you keep outright — no template, no lock-in, no monthly hostage fees. The site is yours, top to bottom.",
  },
];

export function WhyBayline() {
  return (
    <section id="why" className="border-t border-line bg-bg-sunken">
      <div className="mx-auto w-full max-w-[1240px] px-8 py-[72px] lg:py-24">
        <Reveal className="mb-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-2">
          02 — Why Bayline
        </Reveal>
        <Reveal
          as="h2"
          className="m-0 mb-3.5 max-w-[760px] text-[clamp(30px,4vw,38px)] font-medium leading-[1.08] tracking-[-0.02em]"
        >
          Built to <em className="font-serif font-normal italic text-blue">earn its keep</em>.
        </Reveal>
        <Reveal as="p" className="m-0 mb-10 max-w-[620px] text-[17px] leading-[1.55] text-muted">
          A website should pay for itself in the calls it brings in. Every build is engineered around
          three jobs — get found, convert, and stay yours.
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {PILLARS.map((p) => (
            <Reveal key={p.k} className="rounded-[14px] border border-line bg-bg-card p-7">
              <div className="mb-4 font-mono text-[11px] text-muted-2">{p.k}</div>
              <div className="mb-2.5 text-[17px] font-semibold tracking-[-0.01em]">{p.title}</div>
              <p className="m-0 text-[14.5px] leading-[1.55] text-muted">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
