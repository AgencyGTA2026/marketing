"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SelectField } from "./tool-fields";
import { trackClientEvent } from "@/lib/analytics";

const GOALS = [
  { value: "leads", label: "Generate more qualified inquiries" },
  { value: "trust", label: "Look more credible and established" },
  { value: "launch", label: "Launch a new offer or product" },
  { value: "local", label: "Grow visibility in local search" },
  { value: "workflow", label: "Connect the site to an internal workflow" },
] as const;

const PROBLEMS = [
  { value: "unclear", label: "The message is unclear" },
  { value: "dated", label: "The site looks dated or generic" },
  { value: "slow", label: "The site is slow or difficult to update" },
  { value: "conversion", label: "Traffic is not turning into inquiries" },
  { value: "manual", label: "Leads create too much manual follow-up" },
] as const;

export function WebsiteProjectBriefBuilder() {
  const [business, setBusiness] = useState("Northstar Home Services");
  const [audience, setAudience] = useState("Homeowners looking for a dependable local service company");
  const [offer, setOffer] = useState("Same-week estimates and professionally completed residential work");
  const [goal, setGoal] = useState("leads");
  const [problem, setProblem] = useState("unclear");
  const [timeline, setTimeline] = useState("6–8 weeks");
  const [copied, setCopied] = useState(false);

  const brief = useMemo(() => buildBrief({ business, audience, offer, goal, problem, timeline }), [business, audience, offer, goal, problem, timeline]);

  async function copyBrief() {
    try {
      await navigator.clipboard.writeText(brief.plainText);
      trackClientEvent("free_tool_brief_copy", { tool: "website-project-brief-builder", goal, problem });
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  const recommendedService = goal === "workflow" || problem === "manual" ? "Automation Systems" : "Custom Websites";

  return (
    <section className="tool-workspace tool-workspace-brief wrap" aria-labelledby="brief-inputs-title">
      <div className="tool-input-panel">
        <div className="tool-panel-heading">
          <span>PROJECT INPUTS</span>
          <h2 id="brief-inputs-title">Describe the business, not the technology.</h2>
          <p>The builder will turn these answers into a practical first-scope brief.</p>
        </div>
        <div className="tool-field-grid">
          <label className="tool-field tool-field-wide" htmlFor="brief-business">
            <span>Business or project name</span>
            <input id="brief-business" value={business} onChange={(event) => setBusiness(event.target.value)} />
          </label>
          <label className="tool-field tool-field-wide" htmlFor="brief-audience">
            <span>Primary audience</span>
            <textarea id="brief-audience" rows={2} value={audience} onChange={(event) => setAudience(event.target.value)} />
          </label>
          <label className="tool-field tool-field-wide" htmlFor="brief-offer">
            <span>Main offer or promise</span>
            <textarea id="brief-offer" rows={2} value={offer} onChange={(event) => setOffer(event.target.value)} />
          </label>
          <SelectField id="brief-goal" label="Primary business goal" value={goal} onChange={setGoal} options={GOALS} />
          <SelectField id="brief-problem" label="Biggest current problem" value={problem} onChange={setProblem} options={PROBLEMS} />
          <label className="tool-field tool-field-wide" htmlFor="brief-timeline">
            <span>Ideal timeline</span>
            <input id="brief-timeline" value={timeline} onChange={(event) => setTimeline(event.target.value)} />
          </label>
        </div>
      </div>
      <div className="tool-result-panel tool-brief-result" aria-live="polite">
        <div className="tool-panel-heading tool-panel-heading-dark">
          <span>WORKING PROJECT BRIEF</span>
          <h2>{business.trim() || "Your website project"}</h2>
          <p>Use this to align your team, compare proposals, or start a build conversation.</p>
        </div>
        <div className="brief-output-section">
          <span>01 · PROJECT SUMMARY</span>
          <p>{brief.summary}</p>
        </div>
        <div className="brief-output-section">
          <span>02 · RECOMMENDED FIRST SCOPE</span>
          <ul>{brief.pages.map((page) => <li key={page}>{page}</li>)}</ul>
        </div>
        <div className="brief-output-section">
          <span>03 · BUILD PRIORITIES</span>
          <ul>{brief.priorities.map((priority) => <li key={priority}>{priority}</li>)}</ul>
        </div>
        <div className="brief-output-section">
          <span>04 · SUCCESS MEASURES</span>
          <ul>{brief.measures.map((measure) => <li key={measure}>{measure}</li>)}</ul>
        </div>
        <button className="tool-copy-button" type="button" onClick={copyBrief}>
          {copied ? "Brief copied" : "Copy complete brief"}<span aria-hidden="true">{copied ? "✓" : "↗"}</span>
        </button>
        <Link className="tool-cta" href={`/contact?service=${encodeURIComponent(recommendedService)}&utm_source=free-tool&utm_campaign=website-project-brief-builder`} onClick={() => trackClientEvent("free_tool_cta_click", { tool: "website-project-brief-builder", goal, problem })}>
          Get help building this scope <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}

function buildBrief({
  business,
  audience,
  offer,
  goal,
  problem,
  timeline,
}: {
  business: string;
  audience: string;
  offer: string;
  goal: string;
  problem: string;
  timeline: string;
}) {
  const name = business.trim() || "The business";
  const audienceText = audience.trim() || "its primary customers";
  const offerText = offer.trim() || "its core offer";
  const goalLabel = GOALS.find((item) => item.value === goal)?.label.toLowerCase() ?? "improve the website";
  const problemLabel = PROBLEMS.find((item) => item.value === problem)?.label.toLowerCase() ?? "the current site is underperforming";
  const pages = ["Homepage — establish the promise, proof, and primary next step", "About / proof page — show why the team is credible", "Contact page — make the inquiry path simple and measurable"];

  if (goal === "local") pages.splice(1, 0, "Service and location pages — match local search intent with specific proof");
  else if (goal === "launch") pages.splice(1, 0, "Focused offer page — explain the new product and remove competing actions");
  else if (goal === "workflow") pages.splice(1, 0, "Workflow intake — capture structured information and route it to the right system");
  else pages.splice(1, 0, "Service pages — connect customer problems to clear, specific offers");

  const priorities = [
    `Lead with a clear promise for ${audienceText}.`,
    `Make “${offerText}” easy to understand and verify.`,
    problem === "slow" ? "Use a fast, maintainable foundation with structured editing." : problem === "manual" ? "Connect inquiries to the follow-up workflow instead of creating another inbox task." : problem === "conversion" ? "Reduce form and decision friction around one primary conversion action." : problem === "dated" ? "Build a distinctive visual system that looks credible on mobile and desktop." : "Clarify the page hierarchy before adding more content.",
    `Plan the first launch around a ${timeline.trim() || "practical"} timeline.`,
  ];

  const measures = goal === "local"
    ? ["Qualified organic inquiries by service area", "Visibility for priority local searches", "Calls and forms attributed to landing pages"]
    : goal === "workflow"
      ? ["Minutes of manual handling per inquiry", "Time from submission to first response", "Percentage of records routed without re-entry"]
      : goal === "trust"
        ? ["Engagement with proof and service pages", "Branded-search and direct inquiry growth", "Sales feedback on lead confidence"]
        : ["Qualified inquiry conversion rate", "Completion rate for the primary CTA", "Lead quality by source and landing page"];

  const summary = `${name} needs a focused website for ${audienceText}. The first release should ${goalLabel} by making ${offerText} clear and credible. The current constraint is that ${problemLabel}. Target timeline: ${timeline.trim() || "to be confirmed"}.`;
  const plainText = [
    `WEBSITE PROJECT BRIEF — ${name}`,
    "",
    "PROJECT SUMMARY",
    summary,
    "",
    "RECOMMENDED FIRST SCOPE",
    ...pages.map((item) => `- ${item}`),
    "",
    "BUILD PRIORITIES",
    ...priorities.map((item) => `- ${item}`),
    "",
    "SUCCESS MEASURES",
    ...measures.map((item) => `- ${item}`),
  ].join("\n");

  return { summary, pages, priorities, measures, plainText };
}
