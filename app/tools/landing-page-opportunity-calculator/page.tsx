import { LandingPageOpportunityCalculator } from "@/components/free-tools/landing-page-opportunity-calculator";
import { ToolPage } from "@/components/free-tools/tool-page";
import { FREE_TOOLS } from "@/lib/data/tools";
import { buildPageMetadata } from "@/lib/seo";

const tool = FREE_TOOLS[1];

export const metadata = buildPageMetadata({
  title: "Free Landing Page Opportunity Calculator | Bayline Digital",
  description: "Model additional leads, qualified opportunities, and monthly value from a landing page conversion-rate improvement. Free and ungated.",
  path: "/tools/landing-page-opportunity-calculator",
});

export default function LandingPageOpportunityCalculatorPage() {
  return <ToolPage tool={tool}><LandingPageOpportunityCalculator /></ToolPage>;
}
