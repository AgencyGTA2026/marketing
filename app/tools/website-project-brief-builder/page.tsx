import { ToolPage } from "@/components/free-tools/tool-page";
import { WebsiteProjectBriefBuilder } from "@/components/free-tools/website-project-brief-builder";
import { FREE_TOOLS } from "@/lib/data/tools";
import { buildPageMetadata } from "@/lib/seo";

const tool = FREE_TOOLS[2];

export const metadata = buildPageMetadata({
  title: "Free Website Project Brief Builder | Bayline Digital",
  description: "Generate a practical website brief with a project summary, recommended pages, priorities, and success measures. Free and no signup required.",
  path: "/tools/website-project-brief-builder",
});

export default function WebsiteProjectBriefBuilderPage() {
  return <ToolPage tool={tool}><WebsiteProjectBriefBuilder /></ToolPage>;
}
