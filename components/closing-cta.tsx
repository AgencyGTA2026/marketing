import Link from "next/link";
import { ArrowUpRight, Asterisk } from "lucide-react";

/**
 * Brutal closing CTA (Tonne CtaBrutal) — full-bleed accent banner with a hard
 * static headline and an offset-shadow button. No motion.
 */
export function ClosingCta() {
  return (
    <section className="relative overflow-hidden border-t-4 border-ink bg-blue px-5 py-20 text-white sm:px-8">
      <Asterisk
        aria-hidden
        className="pointer-events-none absolute -top-10 -right-10 size-48 rotate-12 opacity-15"
        strokeWidth={1}
      />
      <div className="mx-auto flex max-w-[1280px] flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="font-display text-[clamp(2.2rem,7vw,5rem)] font-black uppercase leading-[0.92] tracking-tighter">
          Let&apos;s make it convert.
        </h2>

        <Link
          href="#contact"
          className="inline-flex shrink-0 items-center gap-2 border-2 border-ink bg-white px-9 py-4 text-base font-black uppercase tracking-tight text-blue shadow-[6px_6px_0_0_var(--color-ink)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_0_var(--color-ink)]"
        >
          Start a project <ArrowUpRight className="size-5" />
        </Link>
      </div>
    </section>
  );
}
