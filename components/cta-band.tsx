import { Reveal } from "./reveal";
import { EmailCapture } from "./email-capture";

interface CtaBandProps {
  city?: string;
  pageType?: string;
}

// Dark "Get started" band — the closing email capture on the homepage and
// location pages.
export function CtaBand({ city, pageType = "site" }: CtaBandProps) {
  return (
    <section id="contact" className="bg-ink-deep">
      <div className="mx-auto grid w-full max-w-[1240px] grid-cols-1 items-center gap-12 px-8 py-[72px] lg:grid-cols-[1.1fr_.9fr] lg:gap-16 lg:py-24">
        <div>
          <Reveal className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-[#6f84bf]">
            03 — Get started
          </Reveal>
          <Reveal
            as="h2"
            className="m-0 mb-4 text-[clamp(34px,4.6vw,46px)] font-medium leading-[1.04] tracking-[-0.025em] text-white text-balance"
          >
            Let&apos;s get you more{" "}
            <em className="font-serif font-normal italic text-[#9fb6ff]">calls</em>.
          </Reveal>
          <Reveal as="p" className="m-0 max-w-[480px] text-[17px] leading-[1.55] text-[#aab8de]">
            Drop your email and we&apos;ll reply within one business day. We start with a quick audit
            and a clear plan — no obligation, no hard sell.
          </Reveal>
        </div>

        <Reveal>
          <EmailCapture city={city} source="cta-band" pageType={pageType} tone="dark" />
        </Reveal>
      </div>
    </section>
  );
}
