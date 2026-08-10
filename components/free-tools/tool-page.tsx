import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ClosingCTA } from "@/components/editorial";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { FREE_TOOLS, getToolHref, type FreeTool } from "@/lib/data/tools";
import { absoluteUrl } from "@/lib/seo";
import { ToolAnalytics } from "./tool-analytics";

export function ToolPage({ tool, children }: { tool: FreeTool; children: React.ReactNode }) {
  const related = FREE_TOOLS.filter((item) => item.slug !== tool.slug);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.title,
    description: tool.description,
    url: absoluteUrl(getToolHref(tool.slug)),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: 0, priceCurrency: "CAD" },
    provider: {
      "@type": "Organization",
      name: "Bayline Digital",
      url: absoluteUrl("/"),
    },
  };

  return (
    <>
      <Nav />
      <main>
        <ToolAnalytics slug={tool.slug} />
        <Breadcrumbs
          items={[
            { label: "Free Tools", href: "/tools" },
            { label: tool.shortTitle, href: getToolHref(tool.slug) },
          ]}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <section className="tool-hero wrap">
          <div>
            <p className="eyebrow">FREE {tool.category.toUpperCase()} TOOL</p>
            <h1>{tool.title}</h1>
          </div>
          <div>
            <p>{tool.description}</p>
            <div className="tool-trust-row" aria-label="Tool details">
              <span>Free</span>
              <span>Instant result</span>
              <span>No signup</span>
            </div>
          </div>
        </section>
        {children}
        <section className="related-tools wrap" aria-labelledby="related-tools-title">
          <p className="eyebrow">MORE FREE TOOLS</p>
          <h2 id="related-tools-title">Keep working through the decision.</h2>
          <div>
            {related.map((item) => (
              <Link key={item.slug} href={getToolHref(item.slug)}>
                <span>{item.number}</span>
                <strong>{item.title}</strong>
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </section>
        <ClosingCTA
          eyebrow="READY TO TURN THE RESULT INTO A BUILD?"
          title="Bring us the numbers."
          copy="Share the result and the current workflow or website. Bayline will reply with a practical scope and the first step worth taking."
          linkLabel="Get help building it"
        />
      </main>
      <Footer />
    </>
  );
}
