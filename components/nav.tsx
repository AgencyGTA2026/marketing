"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";
import { primaryNavigation } from "@/lib/data/business";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link href="/" aria-label="Bayline Digital home"><Logo /></Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {primaryNavigation.map((item) => (
            <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className="header-cta" href="/contact">Start a conversation <span aria-hidden="true">↗</span></Link>
        <button
          className="menu-button"
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <nav className="mobile-nav wrap" id="mobile-navigation" aria-label="Mobile navigation">
          {[{ label: "Home", href: "/" }, ...primaryNavigation, { label: "Contact", href: "/contact" }].map((item) => (
            <Link key={item.href} href={item.href}>{item.label}<span aria-hidden="true">↗</span></Link>
          ))}
        </nav>
      )}
    </header>
  );
}
