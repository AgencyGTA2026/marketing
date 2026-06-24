"use client";

import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Logo } from "./logo";
import { AnnouncementBar } from "./announcement-bar";

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const links = [
    ["Work", isHome ? "#services" : "/services"],
    ["Process", isHome ? "#process" : "/#process"],
    ["About", isHome ? "#about" : "/#about"],
    ["Blog", "/blog"],
  ] as const;

  return (
    <>
      <AnnouncementBar />
      <header className="sticky top-0 z-50 border-b-4 border-ink bg-bg text-ink">
      <div className="flex items-stretch justify-between">
        <Link
          href={isHome ? "#top" : "/"}
          aria-label="Bayline Digital home"
          className="flex items-center px-5 py-3"
        >
          <Logo />
        </Link>

        <nav className="hidden items-stretch md:flex">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="flex items-center border-l-2 border-ink px-6 text-sm font-bold uppercase tracking-wide transition-colors hover:bg-ink hover:text-bg"
            >
              {label}
            </Link>
          ))}
          <Link
            href={isHome ? "#contact" : "/contact"}
            className="flex items-center gap-2 border-l-2 border-ink bg-blue px-6 text-sm font-black uppercase tracking-wide text-white transition-colors hover:bg-ink hover:text-bg"
          >
            Contact
            <ArrowUpRight className="size-4" />
          </Link>
        </nav>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="flex items-center border-l-2 border-ink px-5 md:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t-2 border-ink md:hidden">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block border-b-2 border-ink px-5 py-4 text-2xl font-black uppercase hover:bg-ink hover:text-bg"
            >
              {label}
            </Link>
          ))}
          <Link
            href={isHome ? "#contact" : "/contact"}
            onClick={() => setOpen(false)}
            className="flex items-center justify-between bg-blue px-5 py-4 text-2xl font-black uppercase text-white"
          >
            Contact
            <ArrowUpRight className="size-6" />
          </Link>
        </nav>
      )}
      </header>
    </>
  );
}
