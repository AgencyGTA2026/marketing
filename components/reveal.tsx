interface RevealProps {
  as?: "div" | "section" | "article" | "h1" | "h2" | "h3" | "p" | "ul" | "li" | "span";
  delay?: number;
  className?: string;
  id?: string;
  children: React.ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

/**
 * Static layout wrapper. The brutal (Tonne) style is intentionally motionless,
 * so this renders its element directly. Kept as a component (rather than ripped
 * out) so the many call sites — <Reveal>, <Reveal as="h2">, etc. — keep working.
 */
export function Reveal({
  as: Tag = "div",
  className,
  id,
  children,
  onMouseEnter,
  onMouseLeave,
}: RevealProps) {
  const Comp = Tag as React.ElementType;
  return (
    <Comp id={id} className={className} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {children}
    </Comp>
  );
}
