"use client";

import * as React from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useInView,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  RevealUp — fade + spring-up when scrolled into view (replaces old Reveal)  */
/* -------------------------------------------------------------------------- */

interface RevealUpProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "h1" | "h2" | "h3" | "p" | "ul" | "li" | "span";
}

export function RevealUp({ children, className, delay = 0, as = "div" }: RevealUpProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;

  return (
    <Comp
      className={className}
      initial={reduce ? undefined : { opacity: 0, y: 22 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", stiffness: 220, damping: 28, delay }}
    >
      {children}
    </Comp>
  );
}

/* -------------------------------------------------------------------------- */
/*  WordStagger — headline whose words rise from a clipped mask, one by one    */
/* -------------------------------------------------------------------------- */

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
};
const word: Variants = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { type: "spring", stiffness: 420, damping: 34 } },
};

interface WordStaggerProps {
  /** Each entry is rendered as its own line; arrays let you mark accent spans. */
  lines: React.ReactNode[];
  className?: string;
}

export function WordStagger({ lines, className }: WordStaggerProps) {
  const reduce = useReducedMotion();

  return (
    <motion.h1
      className={className}
      variants={reduce ? undefined : container}
      initial={reduce ? undefined : "hidden"}
      animate={reduce ? undefined : "show"}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]">
          <motion.span className="block" variants={reduce ? undefined : word}>
            {line}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}

/* -------------------------------------------------------------------------- */
/*  MagneticLink — anchor that leans toward the cursor with spring physics     */
/* -------------------------------------------------------------------------- */

interface MagneticLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  strength?: number;
  external?: boolean;
  onClick?: () => void;
}

export function MagneticLink({
  href,
  children,
  className,
  strength = 0.3,
  external,
  onClick,
}: MagneticLinkProps) {
  const ref = React.useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const [pos, setPos] = React.useState({ x: 0, y: 0 });

  function onMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({
      x: (e.clientX - (r.left + r.width / 2)) * strength,
      y: (e.clientY - (r.top + r.height / 2)) * strength,
    });
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className={className}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </motion.a>
  );
}

/* -------------------------------------------------------------------------- */
/*  CountUp — number that springs from 0 to target when scrolled into view     */
/* -------------------------------------------------------------------------- */

interface CountUpProps {
  to: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}

export function CountUp({ to, suffix = "", prefix = "", decimals = 0, className }: CountUpProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const spring = useSpring(0, { stiffness: 60, damping: 18 });
  const text = useTransform(spring, (v) => `${prefix}${v.toFixed(decimals)}${suffix}`);

  React.useEffect(() => {
    if (!inView) return;
    if (reduce) spring.jump(to);
    else spring.set(to);
  }, [inView, reduce, spring, to]);

  return (
    <motion.span ref={ref} className={className}>
      {reduce ? `${prefix}${to.toFixed(decimals)}${suffix}` : text}
    </motion.span>
  );
}

/* -------------------------------------------------------------------------- */
/*  CyclingWord — a single word that swaps through a list on a timer           */
/* -------------------------------------------------------------------------- */

interface CyclingWordProps {
  words: string[];
  className?: string;
  interval?: number;
}

export function CyclingWord({ words, className, interval = 2000 }: CyclingWordProps) {
  const reduce = useReducedMotion();
  const [i, setI] = React.useState(0);

  React.useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [reduce, words.length, interval]);

  return (
    <span className={cn("relative inline-grid", className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[i]}
          initial={reduce ? false : { y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduce ? undefined : { y: "-100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          className="col-start-1 row-start-1"
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Marquee — infinite horizontal loop of its children (pauses on hover)       */
/* -------------------------------------------------------------------------- */

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  reverse?: boolean;
}

export function Marquee({ children, className, duration = 22, reverse = false }: MarqueeProps) {
  const reduce = useReducedMotion();
  const [paused, setPaused] = React.useState(false);

  return (
    <div
      className={cn("overflow-hidden", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        className="flex w-max items-center whitespace-nowrap"
        animate={reduce || paused ? undefined : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
