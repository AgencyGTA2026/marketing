import { Reveal } from "./reveal";
import { EmailCapture } from "./email-capture";

interface LandingHeroProps {
  /** Eyebrow / status pill text above the headline. */
  eyebrow: string;
  /** Place woven into the headline — a city name, or "local" on the homepage. */
  placeName?: string;
  /** Optional location pill under the headline (city pages only). */
  localLine?: string;
  /** Live "recent activity" line under the hero. */
  recentActivity?: string;
  /** City context passed through to the lead capture. */
  city?: string;
  pageType?: string;
}

const CHECKS = ["100% code ownership", "Custom build, no template", "Ships in 4–6 weeks"];

const COVERS = [
  "A quick audit of your current site & Google presence",
  "Where leads are slipping through right now",
  "A clear plan, scope & timeline — no obligation",
];

export function LandingHero({
  eyebrow,
  placeName = "local",
  localLine,
  recentActivity,
  city,
  pageType = "site",
}: LandingHeroProps) {
  return (
    <section id="top" className="border-b border-line">
      <div className="mx-auto grid w-full max-w-[1240px] grid-cols-1 items-center gap-12 px-8 pt-14 pb-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-16 lg:pt-20">
        {/* Left — copy */}
        <div>
          <Reveal className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-line-2 bg-bg-card px-3.5 py-1.5">
            <span className="inline-block h-[7px] w-[7px] animate-pulse rounded-full bg-blue" />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.15em] text-ink-2">
              {eyebrow}
            </span>
          </Reveal>

          <Reveal
            as="h1"
            className="m-0 text-[clamp(40px,5.6vw,62px)] font-medium leading-[1.02] tracking-[-0.025em] text-balance"
          >
            Turn {placeName} searches into{" "}
            <em className="font-serif italic font-normal text-blue">booked jobs</em>.
          </Reveal>

          <Reveal as="p" className="mt-6 max-w-[520px] text-[18px] leading-[1.55] text-muted">
            Bayline Digital builds custom,{" "}
            <strong className="font-semibold text-ink">
              lead-ready websites for local service businesses
            </strong>{" "}
            — engineered to rank, load fast, and turn visitors into calls. You own the code top to
            bottom, with lead capture wired straight to your inbox and phone.
          </Reveal>

          <Reveal className="mt-7 flex flex-wrap gap-x-6 gap-y-2.5">
            {CHECKS.map((c) => (
              <span key={c} className="flex items-center gap-1.5 text-[13.5px] text-ink-2">
                <span className="font-semibold text-blue">✓</span> {c}
              </span>
            ))}
          </Reveal>

          {localLine && (
            <Reveal className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-pale px-3.5 py-2">
              <span className="text-[14px]">📍</span>
              <span className="text-[13.5px] font-medium text-ink-2">{localLine}</span>
            </Reveal>
          )}
        </div>

        {/* Right — intro-call card */}
        <Reveal className="rounded-[18px] border border-line bg-bg-card p-7 shadow-[0_30px_70px_-30px_rgba(11,26,69,0.30)] sm:p-8">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.15em] text-muted-2">
              Start here
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-blue">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-blue" />
              Booking
            </span>
          </div>

          <div className="text-[26px] font-medium leading-[1.1] tracking-[-0.02em]">
            Book a 15-min intro call
          </div>
          <p className="mb-6 mt-2 text-[14.5px] leading-[1.55] text-muted">
            A quick, no-pressure call to map out what&apos;s costing you calls today — and exactly
            what a new site would change.
          </p>

          <div className="mb-6 grid gap-2.5">
            {COVERS.map((c) => (
              <span key={c} className="flex items-start gap-2.5 text-[14px] text-ink-2">
                <span className="font-semibold text-blue">✓</span> {c}
              </span>
            ))}
          </div>

          <EmailCapture city={city} source="hero-intro" pageType={pageType} tone="light" />
        </Reveal>
      </div>

      {recentActivity && (
        <div className="mx-auto w-full max-w-[1240px] px-8 pb-12">
          <Reveal className="inline-flex items-center gap-2.5 text-[13px] text-muted-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-good" />
            {recentActivity}
          </Reveal>
        </div>
      )}
    </section>
  );
}
