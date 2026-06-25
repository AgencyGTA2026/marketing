import { Reveal } from "./reveal";

const ITEMS = [
  {
    n: "01",
    title: "Custom website",
    body: "A fast, mobile-first Next.js site built around your business — not a drag-and-drop template.",
  },
  {
    n: "02",
    title: "Local SEO setup",
    body: "Google Business profile, local schema, and pages tuned to rank in the towns you serve.",
  },
  {
    n: "03",
    title: "Lead capture",
    body: "Contact forms wired straight to your inbox and phone, so no enquiry slips through.",
  },
  {
    n: "04",
    title: "Easy editing",
    body: "Update hours, pricing, or photos yourself through a simple dashboard — no developer needed.",
  },
  {
    n: "05",
    title: "Hosting & security",
    body: "Fast edge hosting, SSL, and backups set up and handed over — you own all of it.",
  },
  {
    n: "06",
    title: "Launch in 4–6 weeks",
    body: "A clear, weekly process from kickoff to live — you always know what's happening next.",
  },
];

interface WhatsIncludedProps {
  /** Optional city woven into the section intro. */
  cityName?: string;
}

export function WhatsIncluded({ cityName }: WhatsIncludedProps) {
  return (
    <section id="included" className="border-t border-line bg-bg">
      <div className="mx-auto w-full max-w-[1240px] px-8 py-[72px] lg:py-24">
        <Reveal className="mb-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-2">
          01 — What&apos;s included
        </Reveal>
        <Reveal
          as="h2"
          className="m-0 mb-3.5 max-w-[760px] text-[clamp(30px,4vw,38px)] font-medium leading-[1.08] tracking-[-0.02em]"
        >
          Everything a {cityName ? `${cityName} business` : "local business"} <em className="font-serif font-normal italic text-blue">actually needs</em>.
        </Reveal>
        <Reveal as="p" className="m-0 mb-10 max-w-[600px] text-[17px] leading-[1.55] text-muted">
          No upsell menu — every build ships with the full stack to get found, look sharp, and turn
          visitors into calls.
        </Reveal>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[16px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item) => (
            <Reveal key={item.n} className="bg-bg-card p-7">
              <div className="mb-[18px] font-mono text-[11px] text-muted-2">{item.n}</div>
              <div className="mb-2 text-[17px] font-semibold tracking-[-0.01em]">{item.title}</div>
              <p className="m-0 text-[14px] leading-[1.55] text-muted">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
