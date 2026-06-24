import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
  dark,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-[11.5px] font-bold uppercase tracking-[0.2em]",
        dark ? "text-blue" : "text-blue",
        className
      )}
    >
      <span className={cn("h-px w-6", dark ? "bg-bg/40" : "bg-blue")} />
      {children}
    </div>
  );
}

interface SectionHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  dark?: boolean;
}

/**
 * Brutal section header — mono kicker + mega uppercase display title. Layout
 * splits to title-left / sub-right on desktop, matching the brutal block rhythm.
 */
export function SectionHeader({ eyebrow, title, sub, dark }: SectionHeaderProps) {
  return (
    <div className="grid grid-cols-1 items-end gap-7 md:grid-cols-2 md:gap-20">
      <div>
        <Reveal>
          <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal
          as="h2"
          className={cn(
            "m-0 mt-5 font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-black uppercase leading-[0.92] tracking-tighter",
            dark ? "text-bg" : "text-ink"
          )}
        >
          {title}
        </Reveal>
      </div>
      {sub && (
        <Reveal
          as="p"
          className={cn(
            "m-0 max-w-[480px] font-mono text-[15px] leading-relaxed",
            dark ? "text-bg/70" : "text-muted"
          )}
        >
          {sub}
        </Reveal>
      )}
    </div>
  );
}
