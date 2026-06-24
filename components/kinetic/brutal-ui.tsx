import * as React from "react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  BrutalButton — thick navy border + hard offset shadow, presses in on hover */
/* -------------------------------------------------------------------------- */

interface BrutalButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "solid" | "outline" | "accent";
  children: React.ReactNode;
}

/**
 * Anchor-styled brutal button. The hover collapses the offset shadow so the
 * button appears to "press" into the page. Shadow colour follows the variant.
 */
export function BrutalButton({
  variant = "solid",
  className,
  children,
  ...props
}: BrutalButtonProps) {
  const base =
    "inline-flex items-center gap-2 border-2 border-ink px-7 py-4 text-base font-black uppercase tracking-tight transition-all hover:translate-x-[3px] hover:translate-y-[3px]";
  const variants = {
    solid:
      "bg-ink text-bg shadow-[6px_6px_0_0_var(--color-blue)] hover:shadow-[3px_3px_0_0_var(--color-blue)]",
    accent:
      "bg-blue text-white shadow-[6px_6px_0_0_var(--color-ink)] hover:shadow-[3px_3px_0_0_var(--color-ink)]",
    outline:
      "bg-bg text-ink shadow-[6px_6px_0_0_var(--color-ink)] hover:shadow-[3px_3px_0_0_var(--color-ink)]",
  };

  return (
    <a className={cn(base, variants[variant], className)} {...props}>
      {children}
    </a>
  );
}

/* -------------------------------------------------------------------------- */
/*  BrutalCard — bordered cell that inverts to ink-on-bg on hover              */
/* -------------------------------------------------------------------------- */

interface BrutalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  invert?: boolean;
  children: React.ReactNode;
}

export function BrutalCard({ invert = true, className, children, ...props }: BrutalCardProps) {
  return (
    <div
      className={cn(
        "group border-2 border-ink bg-bg-card text-ink transition-colors duration-150",
        invert && "hover:bg-ink hover:text-bg",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  BrutalBadge — small rotated "sticker" with a hard shadow                   */
/* -------------------------------------------------------------------------- */

export function BrutalBadge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border-2 border-ink bg-blue px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-white shadow-[4px_4px_0_0_var(--color-ink)]",
        className
      )}
    >
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  BrutalKicker — uppercase mono eyebrow used above brutal section titles     */
/* -------------------------------------------------------------------------- */

export function BrutalKicker({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p
      className={cn(
        "font-mono text-xs font-bold uppercase tracking-[0.2em] text-blue",
        className
      )}
    >
      {children}
    </p>
  );
}
