import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, className, dark }: { children: React.ReactNode; className?: string; dark?: boolean }) {
  return (
    <div className={cn(
      "inline-flex items-center gap-2.5 font-mono text-[11.5px] uppercase tracking-[0.14em]",
      dark ? "text-bg/55" : "text-muted",
      className
    )}>
      <span className={cn("h-px w-6", dark ? "bg-bg/35" : "bg-line-2")} />
      {children}
    </div>
  );
}

interface SectionHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
}

export function SectionHeader({ eyebrow, title, sub }: SectionHeaderProps) {
  return (
    <div className="grid grid-cols-1 gap-7 items-end md:grid-cols-2 md:gap-20">
      <div>
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal as="h2" className="mt-5 m-0 text-[clamp(36px,4.8vw,60px)] tracking-[-0.03em] leading-none font-medium">
          {title}
        </Reveal>
      </div>
      {sub && (
        <Reveal as="p" className="m-0 text-[17px] leading-snug text-muted max-w-[480px]">
          {sub}
        </Reveal>
      )}
    </div>
  );
}
