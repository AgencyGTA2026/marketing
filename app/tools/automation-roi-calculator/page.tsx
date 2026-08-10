import { AutomationRoiCalculator } from "@/components/free-tools/automation-roi-calculator";
import { ToolPage } from "@/components/free-tools/tool-page";
import { FREE_TOOLS } from "@/lib/data/tools";
import { buildPageMetadata } from "@/lib/seo";

const tool = FREE_TOOLS[0];

export const metadata = buildPageMetadata({
  title: "Free Automation ROI Calculator | Bayline Digital",
  description: "Calculate recovered hours, annual labour capacity, and estimated payback for a workflow automation project. Free and no signup required.",
  path: "/tools/automation-roi-calculator",
});

export default function AutomationRoiCalculatorPage() {
  return <ToolPage tool={tool}><AutomationRoiCalculator /></ToolPage>;
}
