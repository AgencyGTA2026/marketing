"use client";

import Link from "next/link";
import { Logo } from "./logo";
import { businessConfig, primaryNavigation, serviceNavigation } from "@/lib/data/business";
import { trackClientEvent } from "@/lib/analytics";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-main">
        <div className="footer-brand">
          <Link href="/" aria-label="Bayline Digital home"><Logo /></Link>
          <p>Clear websites and practical digital systems for growing businesses.</p>
        </div>
        <div className="footer-column">
          <span>Explore</span>
          {primaryNavigation.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
          <Link href="/contact">Contact</Link>
        </div>
        <div className="footer-column footer-services">
          <span>Services</span>
          {serviceNavigation.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
        </div>
        <div className="footer-column">
          <span>Contact</span>
          <a href={`mailto:${businessConfig.email}`} onClick={() => trackClientEvent("email_click", { location: "footer" })}>{businessConfig.email}</a>
          <a href={`tel:${businessConfig.phone.replace(/[^\d+]/g, "")}`} onClick={() => trackClientEvent("phone_click", { location: "footer" })}>{businessConfig.phone}</a>
          <p>{businessConfig.office}</p>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>© {new Date().getFullYear()} {businessConfig.name}</span>
        <span>Designed and engineered in-house</span>
      </div>
    </footer>
  );
}
