"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: keyof React.JSX.IntrinsicElements;
  delay?: number;
}

export function Reveal({
  as: Tag = "div",
  delay = 0,
  className,
  children,
  ...props
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  const Comp = Tag as React.ElementType;
  return (
    <Comp
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)]",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3.5",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
