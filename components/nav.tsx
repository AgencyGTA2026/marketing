"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Logo } from "./logo";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const links = [
    ["Home", isHome ? "#top" : "/"],
    ["Services", isHome ? "#services" : "/services"],
    ["Work", isHome ? "#work" : "/work"],
    ["Process", isHome ? "#process" : "/#process"],
    ["About", isHome ? "#about" : "/#about"],
  ] as const;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 backdrop-blur-md backdrop-saturate-150 transition-[background-color,border-color] duration-200",
        scrolled ? "bg-bg/80 border-b border-line" : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-[1280px] items-center justify-between px-8">
        <Link href={isHome ? "#top" : "/"} aria-label="Bayline Digital home" className="text-ink">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map(([label, href]) => (
            <NavLink key={href} href={href} label={label} />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button asChild size="sm" className="h-10 px-4 text-sm">
            <Link href={isHome ? "#contact" : "/contact"}>
              Contact
              <span aria-hidden className="text-base leading-none -translate-y-px">↗</span>
            </Link>
          </Button>
          <button
            aria-label="Menu"
            onClick={() => setOpen(v => !v)}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-[10px] border border-line cursor-pointer text-ink"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-line bg-bg">
          <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-1 px-8 py-4">
            {links.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="py-3 px-2 border-b border-line text-base text-ink"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group relative px-3.5 py-2.5 text-sm text-ink-2 rounded-full transition-colors hover:text-ink"
    >
      {label}
      <span className="absolute left-3.5 right-3.5 bottom-1.5 h-px bg-ink origin-left scale-x-0 transition-transform duration-300 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-x-100" />
    </Link>
  );
}
