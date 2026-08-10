"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { NumberField, formatCurrency, formatNumber } from "./tool-fields";
import { trackClientEvent } from "@/lib/analytics";

export function LandingPageOpportunityCalculator() {
  const [visitors, setVisitors] = useState(1500);
  const [currentRate, setCurrentRate] = useState(2.5);
  const [targetRate, setTargetRate] = useState(4);
  const [qualifiedRate, setQualifiedRate] = useState(60);
  const [leadValue, setLeadValue] = useState(300);

  const result = useMemo(() => {
    const currentLeads = Math.max(0, visitors) * Math.max(0, currentRate) / 100;
    const targetLeads = Math.max(0, visitors) * Math.max(0, targetRate) / 100;
    const additionalLeads = Math.max(0, targetLeads - currentLeads);
    const qualifiedLeads = additionalLeads * Math.min(100, Math.max(0, qualifiedRate)) / 100;
    const monthlyValue = qualifiedLeads * Math.max(0, leadValue);
    const recommendation =
      additionalLeads >= 20
        ? "There is enough traffic for conversion improvements to compound quickly. Prioritize message match, proof, form friction, and a page built around one campaign intent."
        : additionalLeads >= 5
          ? "The opportunity is meaningful, but the page needs a focused hypothesis. Start with the offer, primary CTA, trust proof, and the biggest mobile friction point."
          : "At this traffic level, conversion work still matters, but distribution may be the bigger constraint. Pair page improvements with a clearer acquisition plan.";
    return { currentLeads, targetLeads, additionalLeads, qualifiedLeads, monthlyValue, recommendation };
  }, [visitors, currentRate, targetRate, qualifiedRate, leadValue]);

  return (
    <section className="tool-workspace wrap" aria-labelledby="landing-inputs-title">
      <div className="tool-input-panel">
        <div className="tool-panel-heading">
          <span>YOUR INPUTS</span>
          <h2 id="landing-inputs-title">Model one page or campaign.</h2>
          <p>Use analytics from the same page and time period. Set a target you consider achievable.</p>
        </div>
        <div className="tool-field-grid">
          <NumberField id="landing-visitors" label="Monthly page visitors" value={visitors} onChange={setVisitors} min={0} max={10000000} step={100} />
          <NumberField id="landing-current" label="Current conversion rate" value={currentRate} onChange={setCurrentRate} min={0} max={100} step={0.1} suffix="%" />
          <NumberField id="landing-target" label="Target conversion rate" value={targetRate} onChange={setTargetRate} min={0} max={100} step={0.1} suffix="%" />
          <NumberField id="landing-qualified" label="Leads that are qualified" value={qualifiedRate} onChange={setQualifiedRate} min={0} max={100} suffix="%" />
          <NumberField id="landing-value" label="Value of a qualified lead" value={leadValue} onChange={setLeadValue} min={0} max={1000000} step={50} prefix="$" suffix="CAD" help="Use expected gross profit, not total contract revenue." />
        </div>
      </div>
      <div className="tool-result-panel" aria-live="polite">
        <div className="tool-panel-heading tool-panel-heading-dark">
          <span>MODELLED MONTHLY OPPORTUNITY</span>
          <h2>{formatCurrency(result.monthlyValue)}</h2>
          <p>Potential qualified-lead value at the target rate—not a performance guarantee.</p>
        </div>
        <div className="tool-metrics">
          <div><span>Current leads</span><strong>{formatNumber(result.currentLeads, 1)}</strong></div>
          <div><span>Leads at target</span><strong>{formatNumber(result.targetLeads, 1)}</strong></div>
          <div><span>Additional qualified leads</span><strong>{formatNumber(result.qualifiedLeads, 1)}</strong></div>
        </div>
        <div className="tool-recommendation">
          <span>WHAT THE MODEL SUGGESTS</span>
          <p>{result.recommendation}</p>
          <ul>
            <li>Keep one primary conversion action above the fold.</li>
            <li>Match the headline to the ad, search, or referral promise.</li>
            <li>Measure qualified outcomes—not form submissions alone.</li>
          </ul>
        </div>
        <Link className="tool-cta" href="/contact?service=Landing%20Pages&utm_source=free-tool&utm_campaign=landing-page-opportunity-calculator" onClick={() => trackClientEvent("free_tool_cta_click", { tool: "landing-page-opportunity-calculator", monthly_opportunity: Math.round(result.monthlyValue) })}>
          Get help building the landing page <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
