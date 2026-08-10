"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { NumberField, formatCurrency, formatNumber } from "./tool-fields";
import { trackClientEvent } from "@/lib/analytics";

export function AutomationRoiCalculator() {
  const [people, setPeople] = useState(3);
  const [hours, setHours] = useState(8);
  const [hourlyCost, setHourlyCost] = useState(45);
  const [automatable, setAutomatable] = useState(60);
  const [buildCost, setBuildCost] = useState(12000);

  const result = useMemo(() => {
    const rate = Math.min(100, Math.max(0, automatable)) / 100;
    const weeklyHours = Math.max(0, people) * Math.max(0, hours) * rate;
    const weeklySavings = weeklyHours * Math.max(0, hourlyCost);
    const annualSavings = weeklySavings * 48;
    const monthlySavings = annualSavings / 12;
    const paybackMonths = monthlySavings > 0 ? Math.max(0, buildCost) / monthlySavings : 0;
    const recommendation =
      annualSavings >= 30000
        ? "The economics support exploring a focused custom tool or connected workflow. Start with the highest-volume handoff and build the smallest version that removes it."
        : annualSavings >= 10000
          ? "A targeted automation is worth scoping. A form-to-CRM flow, approval workflow, or lightweight internal dashboard may capture most of the value without a large platform build."
          : "The opportunity is modest at this volume. Standardize the process first, then test a small no-code automation before considering a custom build.";
    return { weeklyHours, weeklySavings, annualSavings, paybackMonths, recommendation };
  }, [people, hours, hourlyCost, automatable, buildCost]);

  return (
    <section className="tool-workspace wrap" aria-labelledby="automation-inputs-title">
      <div className="tool-input-panel">
        <div className="tool-panel-heading">
          <span>YOUR INPUTS</span>
          <h2 id="automation-inputs-title">Model one repeated workflow.</h2>
          <p>Use fully loaded labour cost if you know it. The model uses 48 working weeks.</p>
        </div>
        <div className="tool-field-grid">
          <NumberField id="automation-people" label="People doing this work" value={people} onChange={setPeople} min={1} max={500} />
          <NumberField id="automation-hours" label="Hours per person each week" value={hours} onChange={setHours} min={0} max={80} step={0.5} suffix="hrs" />
          <NumberField id="automation-rate" label="Hourly labour cost" value={hourlyCost} onChange={setHourlyCost} min={0} max={500} prefix="$" suffix="CAD" />
          <NumberField id="automation-percent" label="Realistically automatable" value={automatable} onChange={setAutomatable} min={0} max={100} suffix="%" help="Leave time for exceptions, judgment, and review." />
          <NumberField id="automation-cost" label="Estimated build cost" value={buildCost} onChange={setBuildCost} min={0} max={1000000} step={1000} prefix="$" suffix="CAD" help="Use 0 if you only want the savings estimate." />
        </div>
      </div>
      <div className="tool-result-panel" aria-live="polite">
        <div className="tool-panel-heading tool-panel-heading-dark">
          <span>ESTIMATED OPPORTUNITY</span>
          <h2>{formatCurrency(result.annualSavings)} per year</h2>
          <p>This is recovered labour capacity, not guaranteed cash savings.</p>
        </div>
        <div className="tool-metrics">
          <div><span>Hours recovered weekly</span><strong>{formatNumber(result.weeklyHours, 1)}</strong></div>
          <div><span>Weekly capacity value</span><strong>{formatCurrency(result.weeklySavings)}</strong></div>
          <div><span>Estimated payback</span><strong>{buildCost > 0 && result.paybackMonths > 0 ? `${formatNumber(result.paybackMonths, 1)} mo` : "—"}</strong></div>
        </div>
        <div className="tool-recommendation">
          <span>WHAT THE NUMBERS SUGGEST</span>
          <p>{result.recommendation}</p>
          <ul>
            <li>Validate the weekly hours with the people doing the work.</li>
            <li>Separate repeatable steps from judgment-heavy exceptions.</li>
            <li>Price the smallest useful workflow before a full platform.</li>
          </ul>
        </div>
        <Link className="tool-cta" href="/contact?service=Automation%20Systems&utm_source=free-tool&utm_campaign=automation-roi-calculator" onClick={() => trackClientEvent("free_tool_cta_click", { tool: "automation-roi-calculator", annual_savings: Math.round(result.annualSavings) })}>
          Get help scoping the automation <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
