import Link from "next/link";
import { FREE_TOOLS, getToolHref } from "@/lib/data/tools";

export function FreeToolsPreview() {
  return (
    <section className="free-tools-preview">
      <div className="wrap">
        <header>
          <p className="eyebrow">FREE PLANNING TOOLS</p>
          <div>
            <h2>Useful answers before you start a project.</h2>
            <p>
              Model the opportunity, clarify the scope, and leave with something you can use.
              No email gate.
            </p>
          </div>
        </header>
        <div className="free-tool-cards">
          {FREE_TOOLS.map((tool) => (
            <Link key={tool.slug} href={getToolHref(tool.slug)}>
              <span>{tool.number} · {tool.category}</span>
              <h3>{tool.title}</h3>
              <p>{tool.description}</p>
              <strong>Use the free tool <span aria-hidden="true">↗</span></strong>
            </Link>
          ))}
        </div>
        <Link className="text-link" href="/tools">
          View all free tools <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
