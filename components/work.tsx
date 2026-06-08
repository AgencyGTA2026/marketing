"use client";

import { useMemo, useState } from "react";
import { SectionHeader } from "./section-header";
import { Reveal } from "./reveal";
import { ArrowUpRight, Zap, Code, Shield, Brain } from "lucide-react";

interface WorkProps {
  featuredProjectSlug?: "coachly-crm" | "autoblogwriter" | "permipro" | "contentsplitter";
}

const WORK_ITEMS = [
  {
    slug: "permipro",
    tag: "SaaS Product",
    name: "PermiPro",
    cat: "Multi-tenant portal · B2B App",
    blurb: "Multi-tenant digital workflow system automating municipal zoning approvals, application routing, and cryptographic signatures.",
    accent: "from-ink-2 to-blue",
    title: "Approvals, simplified.",
    metrics: [["70%", "Friction Reduction"], ["Real-time", "E-Signatures"], ["Multi-tenant", "Core"]] as const,
    problem: "Paper-heavy, fragmented approvals causing months of municipal construction delays.",
    solution: "A modern multi-tenant web application that moves approval pipelines, reviews, and sign-offs online.",
    techWin: "Granular role-based security rules (RBAC), automatic digital signature cryptography, and webhooks for real-time inspector routing.",
    icon: Shield,
  },
  {
    slug: "contentsplitter",
    tag: "SaaS Product",
    name: "ContentSplitter",
    cat: "AI pipeline · SaaS Core",
    blurb: "Automated media processing pipeline that splits long videos and utilizes LLMs to generate platform-specific content articles.",
    accent: "from-accent to-[#6E8AB8]",
    title: "Content, multi-threaded.",
    metrics: [["10×", "Content Speed"], ["Automatic", "Transcribing"], ["Structured", "LLM Output"]] as const,
    problem: "Marketing agencies spending thousands of dollars monthly to manually convert video assets into text campaigns.",
    solution: "An automated media ingestion engine that extracts audio, transcribes it, and outputs formatted SEO blog structures.",
    techWin: "High-throughput asynchronous media processing queues built with BullMQ, integrated with Claude/GPT APIs for contextual writing.",
    icon: Brain,
  },
  {
    slug: "coachly-crm",
    tag: "SaaS Product",
    name: "CoachlyCRM",
    cat: "Lead Gen · SMS CRM",
    blurb: "Lightweight CRM built for local contractor teams. Features Twilio SMS-first booking flows and automatic dispatch alerts.",
    accent: "from-blue to-[#1A3B6F]",
    title: "Bookings, on autopilot.",
    metrics: [["2.4×", "Conversion Rate"], ["<2 min", "Response Time"], ["SMS-first", "Booking"]] as const,
    problem: "Service contractors losing up to 40% of inbound leads due to slow response times and call dispatch bottlenecks.",
    solution: "SMS-first automated booking flow with localized dispatcher coordination and automated customer follow-ups.",
    techWin: "Real-time bi-directional Twilio API webhooks, Mapbox route optimization API, and custom Google Calendar double-booking protection.",
    icon: Zap,
  },
  {
    slug: "autoblogwriter",
    tag: "SaaS Product",
    name: "AutoBlogWriter",
    cat: "SEO Engine · Tooling",
    blurb: "Programmatic SEO generator that reads target keyword structures and automatically outputs complete, internally linked article networks.",
    accent: "from-bg-sunken to-accent",
    title: "Programmatic search rank.",
    metrics: [["+280%", "Organic Search"], ["100% Auto", "Internal Links"], ["Built-in", "Schema.org"]] as const,
    problem: "Scaling companies struggle to affordably deploy and link hundreds of landing pages targeting local keyword niches.",
    solution: "A programmatic SEO engine that reads keyword hierarchies, drafts articles with factual guardrails, and deploys immediately.",
    techWin: "Graph-based internal linking algorithm to optimize PageRank flow, automated JSON-LD schema generation, and headless CMS integrations.",
    icon: Code,
  },
];

export function Work({ featuredProjectSlug }: WorkProps) {
  // Sort projects: Move featured project to the top
  const sortedWork = useMemo(() => {
    if (!featuredProjectSlug) return WORK_ITEMS;
    const items = [...WORK_ITEMS];
    const idx = items.findIndex((w) => w.slug === featuredProjectSlug);
    if (idx > -1) {
      const [featured] = items.splice(idx, 1);
      return [featured, ...items];
    }
    return items;
  }, [featuredProjectSlug]);

  return (
    <section id="work" className="bg-bg py-32 border-t border-line">
      <div className="mx-auto w-full max-w-[1280px] px-8">
        <SectionHeader
          eyebrow="05 — Selected work"
          title={<>Real-world <span className="font-serif italic text-blue">software products</span> and SaaS.</>}
          sub="Instead of building fake visual mockups, we showcase the operational platforms we have architected and launched. Hover or tap any project to reveal its technical details."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {sortedWork.map((w) => (
            <WorkCard key={w.name} {...w} isFeatured={w.slug === featuredProjectSlug} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkCard({
  tag,
  name,
  cat,
  blurb,
  accent,
  title,
  metrics,
  problem,
  solution,
  techWin,
  icon: Icon,
  isFeatured,
}: (typeof WORK_ITEMS)[number] & { isFeatured: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Reveal
      as="article"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative overflow-hidden rounded-[22px] border bg-bg-card shadow-sm transition-all duration-300 ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-[3px] hover:shadow-md ${
        isFeatured ? "border-blue ring-1 ring-blue/20" : "border-line"
      }`}
    >
      {/* Featured Badge */}
      {isFeatured && (
        <span className="absolute top-4 left-4 z-20 rounded-full bg-blue px-3 py-1 font-mono text-[9px] text-white font-medium uppercase tracking-wider">
          ★ RECOMMENDED FOR YOU
        </span>
      )}

      {/* Visual Header / Accent Gradient */}
      <div className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${accent}`}>
        {/* Visual card preview mock */}
        <div className="absolute inset-7 rounded-xl bg-bg-card/95 p-4 transition-transform duration-300 group-hover:-translate-y-1.5 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <div className="font-mono text-[9px] text-muted-2 mb-1">{name.toUpperCase()}</div>
              <div className="text-[17px] leading-[1.1] tracking-[-0.02em] font-medium text-ink">
                {title}
              </div>
            </div>
            <div className="h-7 w-7 rounded-lg border border-line flex items-center justify-center text-blue-pale bg-ink">
              <Icon size={14} className="text-blue" />
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="h-1.5 flex-[2] rounded-[3px] bg-bg-sunken flex overflow-hidden">
              <div className="bg-blue w-[75%] h-full rounded-l-[3px]" />
            </div>
            <div className="flex justify-between text-[9px] font-mono text-muted-2">
              <span>SYSTEM PERFORMANCE</span>
              <span>99.9% UPTIME</span>
            </div>
          </div>
        </div>

        {/* Dynamic Problem/Solution/Win Interactive Overlay */}
        <div
          className={`absolute inset-0 bg-[#0E1B32]/95 text-bg p-6 flex flex-col justify-between transition-all duration-300 ease-in-out ${
            hovered ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="space-y-3.5">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="font-mono text-[9.5px] text-blue-pale uppercase tracking-wider">Technical Win Details</span>
              <ArrowUpRight size={14} className="text-blue-pale" />
            </div>
            
            <div className="text-[11.5px] leading-relaxed">
              <span className="font-mono text-[9px] text-blue-pale/60 block mb-0.5">PROBLEM</span>
              <p className="m-0 text-white/90">{problem}</p>
            </div>

            <div className="text-[11.5px] leading-relaxed">
              <span className="font-mono text-[9px] text-blue-pale/60 block mb-0.5">SOLUTION</span>
              <p className="m-0 text-white/90 font-serif italic text-[12px]">{solution}</p>
            </div>

            <div className="text-[11.5px] leading-relaxed">
              <span className="font-mono text-[9px] text-blue-pale/60 block mb-0.5">TECHNICAL WIN</span>
              <p className="m-0 text-white/80">{techWin}</p>
            </div>
          </div>

          <div className="text-[10px] font-mono text-white/40 pt-2 border-t border-white/10 flex justify-between">
            <span>TAP TO HIDE</span>
            <span>SHIPPED CODECASE</span>
          </div>
        </div>
      </div>

      {/* Info Body */}
      <div className="p-6">
        <div className="mb-3.5 flex items-center justify-between">
          <span className="rounded-full border border-blue-pale bg-blue-pale/40 px-2.5 py-1 font-mono text-[10px] text-blue font-medium">
            {tag.toUpperCase()}
          </span>
          <span className="font-mono text-[11px] text-muted-2">{cat}</span>
        </div>

        <h3 className="m-0 mb-2 text-[22px] font-medium tracking-[-0.015em]">{name}</h3>
        <p className="m-0 text-[14.5px] leading-[1.55] text-muted">{blurb}</p>

        {/* Metrics Grid */}
        <div className="mt-5 grid grid-cols-3 gap-3 border-t border-line pt-4">
          {metrics.map(([v, l]) => (
            <div key={l}>
              <div className="text-[18px] font-medium tracking-[-0.01em] text-ink">{v}</div>
              <div className="mt-0.5 font-mono text-[10px] text-muted-2">{l.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
