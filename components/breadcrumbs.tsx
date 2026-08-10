import Link from "next/link";
import { absoluteUrl } from "@/lib/seo";

export type BreadcrumbItem = {
  label: string;
  href: string;
};

export function Breadcrumbs({ items }: { items: ReadonlyArray<BreadcrumbItem> }) {
  const crumbs = [{ label: "Home", href: "/" }, ...items];
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };

  return (
    <>
      <nav className="breadcrumbs wrap" aria-label="Breadcrumb">
        <ol>
          {crumbs.map((item, index) => {
            const current = index === crumbs.length - 1;
            return (
              <li key={item.href}>
                {current ? (
                  <span aria-current="page">{item.label}</span>
                ) : (
                  <Link href={item.href}>{item.label}</Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
