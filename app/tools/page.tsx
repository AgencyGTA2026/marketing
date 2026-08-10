import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ClosingCTA } from "@/components/editorial";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { FREE_TOOLS, getToolHref } from "@/lib/data/tools";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Free Website & Automation Tools | Bayline Digital",
  description:
    "Use Bayline Digital's free automation ROI calculator, landing page opportunity calculator, and website project brief builder. No signup required.",
  path: "/tools",
});

export default function ToolsPage() {
  return (
    <>
      <Nav />
      <main>
        <Breadcrumbs items={[{ label: "Free Tools", href: "/tools" }]} />
        <section className="page-hero wrap tools-index-hero">
          <p className="eyebrow">FREE PLANNING TOOLS</p>
          <h1>Get to a useful answer before the sales call.</h1>
          <p>
            Model the opportunity, clarify the first scope, and take the output with you.
            Every tool is free, instant, and ungated.
          </p>
        </section>
        <section className="tools-index wrap" aria-label="Free business tools">
          {FREE_TOOLS.map((tool) => (
            <article key={tool.slug}>
              <div className="tools-index-meta">
                <span>{tool.number}</span>
                <p>{tool.category}</p>
              </div>
              <div>
                <h2><Link href={getToolHref(tool.slug)}>{tool.title}</Link></h2>
                <p>{tool.description}</p>
              </div>
              <div>
                <span>{tool.outcome}</span>
                <Link className="text-link" href={getToolHref(tool.slug)}>
                  Use the tool <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>
          ))}
        </section>
        <section className="tools-principles wrap">
          <p className="eyebrow">WHY THESE ARE UNGATED</p>
          <div>
            <h2>The useful part should come first.</h2>
            <p>
              You do not need to trade an email address for the result. If the output surfaces
              something worth building, Bayline can help turn it into a clear scope.
            </p>
          </div>
        </section>
        <ClosingCTA
          eyebrow="HAVE A RESULT WORTH ACTING ON?"
          title="Turn the estimate into a plan."
          copy="Share the tool output and the current setup. Bayline will respond with the smallest useful next step."
          linkLabel="Get help building it"
        />
      </main>
      <Footer />
    </>
  );
}
