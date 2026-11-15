import Link from "next/link";
import type { ReactNode } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export type AppInfo = { name: string; slug: string; tagline: string };

/** Shared layout for an app's overview, privacy, terms, and support pages. */
export function AppDocPage({ app, eyebrow, title, updated, children }: {
  app: AppInfo;
  eyebrow: string;
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  const base = `/${app.slug}`;
  return (
    <>
      <Nav />
      <main className="app-doc wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {updated && <p className="app-doc-updated">Effective {updated}</p>}
        <nav className="app-doc-links" aria-label={`${app.name} pages`}>
          <Link href={base}>{app.name}</Link>
          <Link href={`${base}/support`}>Support</Link>
          <Link href={`${base}/privacy`}>Privacy policy</Link>
          <Link href={`${base}/terms`}>Terms of use</Link>
        </nav>
        <article className="app-doc-body">{children}</article>
      </main>
      <Footer />
    </>
  );
}
