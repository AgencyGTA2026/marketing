"use client";
/* eslint-disable @next/next/no-img-element */

import { FormEvent, useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight, CalendarDays, Check, CircleAlert, Clock3, ExternalLink,
  Copy, Facebook, Image as ImageIcon, Instagram, Loader2, LogOut, Menu,
  Pause, Play, Plus, RotateCcw, Send, ShieldCheck, Sparkles, Trash2, X,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

type Connection = { id: string; pageName: string; pageId: string; instagramUsername: string | null; status: "CONNECTED" | "EXPIRED" | "ERROR" | "DISCONNECTED"; lastCheckedAt: string | null; tokenExpiresAt: string | null; lastError: string | null };
type Automation = { id: string; name: string; kind: "ONE_TIME" | "WEEKLY"; status: "ACTIVE" | "PAUSED" | "COMPLETED"; destinations: ("FACEBOOK" | "INSTAGRAM")[]; startDate: string; endDate: string | null; weekdays: number[] | null; publishTime: string; nextOccurrenceAt: string | null; promptSpec: { topic: string; audience: string; keyMessage: string; cta: string; url?: string; notes?: string } };
type Version = { id: string; version: number; brief: { headline: string; visualBrief: string; hashtags: string[] }; facebookCaption: string; instagramCaption: string; assetUrl: string; createdAt: string };
type Draft = { id: string; automationId: string | null; scheduledFor: string; destinations: ("FACEBOOK" | "INSTAGRAM")[]; status: string; generationStage: "QUEUED" | "WRITING" | "GENERATING_IMAGE" | "COMPOSITING" | "UPLOADING" | "READY"; generationProgress: number; approval: "PENDING" | "APPROVED"; failureCount: number; lastError: string | null; currentVersionId: string | null };
type Attempt = { id: string; draftId: string; platform: "FACEBOOK" | "INSTAGRAM"; status: string; attempts: number; externalPostId: string | null; permalink: string | null; lastError: string | null; publishedAt: string | null };
type SocialIdea = { name: string; topic: string; keyMessage: string; cta: string; whyItWorks: string; pillar: string };
export type StudioData = { connection: Connection | null; automations: Automation[]; drafts: Array<{ draft: Draft; version: Version | null }>; attempts: Attempt[]; ownerEmail: string };

const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const liveStatuses = ["GENERATING", "AWAITING_APPROVAL", "APPROVED", "PUBLISHING", "GENERATION_FAILED", "PUBLISH_FAILED", "CANCELLED"];

const generationLabels = {
  QUEUED: "Queued",
  WRITING: "Writing captions and creative brief",
  GENERATING_IMAGE: "Generating the image layer",
  COMPOSITING: "Applying the Bayline Digital design system",
  UPLOADING: "Uploading the final 1080 × 1350 asset",
  READY: "Ready for approval",
} as const;

function studioDate(value: string) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Toronto", weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZoneName: "short" }).format(new Date(value));
}

function statusLabel(status: string) {
  return status.toLowerCase().replaceAll("_", " ").replace(/^./, (letter) => letter.toUpperCase());
}

function StatusPill({ status }: { status: string }) {
  const tone = status === "PUBLISHED" || status === "CONNECTED" || status === "APPROVED" ? "good" : status.includes("FAIL") || status === "MISSED" || status === "EXPIRED" ? "bad" : status === "AWAITING_APPROVAL" ? "blue" : "neutral";
  return <span className={`studio-status studio-status-${tone}`}><i />{statusLabel(status)}</span>;
}

function PlatformMarks({ destinations }: { destinations: string[] }) {
  return <span className="studio-platforms">{destinations.includes("FACEBOOK") && <Facebook size={13} />}{destinations.includes("INSTAGRAM") && <Instagram size={13} />}</span>;
}

type ConfirmState = { title: string; body: string; confirm: string; danger?: boolean; run: () => Promise<void> } | null;

export function StudioClient({ data }: { data: StudioData }) {
  const router = useRouter();
  const [tab, setTab] = useState<"queue" | "schedule" | "history">("queue");
  const active = data.drafts.filter((item) => liveStatuses.includes(item.draft.status));
  const history = data.drafts.filter((item) => !liveStatuses.includes(item.draft.status));
  const [selectedId, setSelectedId] = useState(active[0]?.draft.id || history[0]?.draft.id || "");
  const selectedActive = active.find((item) => item.draft.id === selectedId) || active[0];
  const [mobileNav, setMobileNav] = useState(false);
  const [confirm, setConfirm] = useState<ConfirmState>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [requestCount, setRequestCount] = useState(0);
  const requesting = requestCount > 0;
  const [pending, startTransition] = useTransition();
  const createDialog = useRef<HTMLDialogElement>(null);
  const previewDialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!data.drafts.some((item) => item.draft.status === "GENERATING")) return;
    const timer = window.setInterval(() => router.refresh(), 1800);
    return () => window.clearInterval(timer);
  }, [data.drafts, router]);

  useEffect(() => {
    let running = false;
    const tick = async () => {
      if (running) return;
      running = true;
      try {
        const response = await fetch("/api/studio/social", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "tick" }),
        });
        const result = await response.json() as { ok: boolean; changed?: boolean };
        if (response.ok && result.ok && result.changed) router.refresh();
      } catch {
        // The next local tick retries automatically while the Studio remains open.
      } finally {
        running = false;
      }
    };
    const initial = window.setTimeout(tick, 2500);
    const timer = window.setInterval(tick, 60_000);
    return () => { window.clearTimeout(initial); window.clearInterval(timer); };
  }, [router]);

  async function action(payload: Record<string, unknown>) {
    const tracksGeneration = ["create", "regenerate", "retry"].includes(String(payload.action));
    setRequestCount((count) => count + 1);
    const timer = tracksGeneration ? window.setInterval(() => router.refresh(), 1200) : null;
    try {
      const response = await fetch("/api/studio/social", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json() as { ok: boolean; message: string };
      if (!response.ok || !result.ok) throw new Error(result.message);
      setToast(result.message);
      startTransition(() => router.refresh());
    } finally {
      if (timer) window.clearInterval(timer);
      setRequestCount((count) => Math.max(0, count - 1));
    }
  }

  function ask(next: NonNullable<ConfirmState>) { setConfirm(next); }
  async function runConfirm() {
    if (!confirm) return;
    const task = confirm.run;
    setConfirm(null);
    try { await task(); } catch (error) { setToast(error instanceof Error ? error.message : "Something went wrong."); }
  }

  return (
    <main className="studio-shell">
      <header className="studio-topbar">
        <button className="studio-mobile-menu" onClick={() => setMobileNav(!mobileNav)} aria-label="Toggle navigation"><Menu size={19} /></button>
        <div className="studio-wordmark"><span>{"//"}</span> BAYLINE DIGITAL <b>/ SOCIAL</b></div>
        <div className="studio-topbar-center"><span className="studio-live-dot" />PRIVATE STUDIO <i /> OWNER ONLY</div>
        <div className="studio-owner"><span>{data.ownerEmail}</span><button onClick={() => authClient.signOut({ fetchOptions: { onSuccess: () => router.push("/studio/sign-in") } })} aria-label="Sign out"><LogOut size={15} /></button></div>
      </header>

      <div className="studio-body">
        <aside className={`studio-sidebar ${mobileNav ? "is-open" : ""}`}>
          <nav>
            <p>Workspace</p>
            <button className={tab === "queue" ? "active" : ""} onClick={() => { setSelectedId(active[0]?.draft.id || ""); setTab("queue"); setMobileNav(false); }}><ImageIcon size={16} /> Draft queue <span>{active.length}</span></button>
            <button className={tab === "schedule" ? "active" : ""} onClick={() => { setTab("schedule"); setMobileNav(false); }}><CalendarDays size={16} /> Schedule</button>
            <button className={tab === "history" ? "active" : ""} onClick={() => { setSelectedId(history[0]?.draft.id || ""); setTab("history"); setMobileNav(false); }}><Clock3 size={16} /> Finished posts</button>
          </nav>
          <div className="studio-side-account">
            <p>Meta connection</p>
            <div className="studio-connection-mini"><span className={data.connection?.status === "CONNECTED" ? "connected" : ""}><Facebook size={14} /></span><div><strong>{data.connection?.pageName || "Not connected"}</strong><small>{data.connection?.instagramUsername ? `@${data.connection.instagramUsername}` : "Facebook + Instagram"}</small></div></div>
            <a href="/api/studio/meta/connect">{data.connection ? "Reconnect accounts" : "Connect Meta"}<ArrowRight size={13} /></a>
          </div>
          <div className="studio-approval-note"><ShieldCheck size={16} /><p><strong>Approval is mandatory.</strong><br />Unapproved posts are skipped at publish time.</p></div>
        </aside>

        <section className="studio-workspace">
          <div className="studio-pagehead">
            <div><p className="studio-kicker">{tab === "queue" ? "CONTENT OPERATIONS" : tab === "schedule" ? "AUTOMATIONS" : "POST ARCHIVE"}</p><h1>{tab === "queue" ? "Draft queue" : tab === "schedule" ? "Schedule" : "Finished posts"}</h1><p>{tab === "queue" ? `${active.filter((item) => item.draft.status === "AWAITING_APPROVAL").length} awaiting your review · ${active.length} active drafts` : tab === "schedule" ? `${data.automations.filter((item) => item.status === "ACTIVE").length} active schedules · Toronto time` : `${history.filter((item) => item.draft.status === "PUBLISHED").length} published · ${history.length} finished posts`}</p></div>
            <button className="studio-primary" onClick={() => createDialog.current?.showModal()}><Plus size={16} /> New schedule</button>
          </div>

          <ConnectionBanner connection={data.connection} />

          {tab === "queue" && <QueueView items={active} selectedId={selectedActive?.draft.id || ""} onSelect={setSelectedId} selected={selectedActive} attempts={data.attempts} action={action} ask={ask} preview={() => previewDialog.current?.showModal()} pending={pending} />}
          {tab === "schedule" && <ScheduleView automations={data.automations} action={action} ask={ask} pending={pending} />}
          {tab === "history" && <HistoryView items={history} attempts={data.attempts} selectedId={selectedId} onSelect={setSelectedId} />}
        </section>
      </div>

      <ScheduleDialog ref={createDialog} onCreate={async (payload, summary) => {
        createDialog.current?.close();
        ask({ title: "Create this schedule?", body: summary, confirm: "Create schedule", run: () => action(payload) });
      }} />
      <ConfirmDialog state={confirm} pending={pending} close={() => setConfirm(null)} run={runConfirm} />
      <dialog ref={previewDialog} className="studio-preview-dialog" onClick={(event) => { if (event.target === previewDialog.current) previewDialog.current.close(); }}>
        <button onClick={() => previewDialog.current?.close()} aria-label="Close preview"><X size={20} /></button>
        {selectedActive?.version && <img src={selectedActive.version.assetUrl} alt={selectedActive.version.brief.headline} />}
      </dialog>
      {toast && <button className="studio-toast" onClick={() => setToast(null)}><Check size={15} />{toast}<X size={14} /></button>}
      {(pending || requesting) && <div className="studio-global-progress"><Loader2 size={16} className="spin" /> Syncing generation progress…</div>}
    </main>
  );
}

function ConnectionBanner({ connection }: { connection: Connection | null }) {
  if (!connection || connection.status !== "CONNECTED") return <div className="studio-alert"><CircleAlert size={18} /><div><strong>{connection ? "Meta connection needs attention" : "Connect Meta to publish"}</strong><p>{connection?.lastError || "Authorize the Bayline Facebook Page and its linked Instagram professional account."}</p></div><a href="/api/studio/meta/connect">Connect accounts <ArrowRight size={14} /></a></div>;
  return <div className="studio-health"><div><span className="studio-live-dot" /><strong>{connection.pageName}</strong><small>Connection healthy</small></div><div><Facebook size={14} /> Facebook Page</div><div><Instagram size={14} />{connection.instagramUsername ? `@${connection.instagramUsername}` : "Not linked"}</div><small>Checked {connection.lastCheckedAt ? studioDate(connection.lastCheckedAt) : "on connect"}</small></div>;
}

function QueueView({ items, selectedId, onSelect, selected, attempts, action, ask, preview, pending }: { items: StudioData["drafts"]; selectedId: string; onSelect: (id: string) => void; selected?: StudioData["drafts"][number]; attempts: Attempt[]; action: (payload: Record<string, unknown>) => Promise<void>; ask: (state: NonNullable<ConfirmState>) => void; preview: () => void; pending: boolean }) {
  if (!items.length) return <EmptyState />;
  return <div className="studio-editor-grid">
    <div className="studio-queue-list">
      <div className="studio-list-label"><span>Upcoming</span><span>Toronto time</span></div>
      {items.map((item) => <button key={item.draft.id} className={selectedId === item.draft.id ? "active" : ""} onClick={() => onSelect(item.draft.id)}>
        <div className="studio-date-tile"><b>{new Intl.DateTimeFormat("en-CA", { timeZone: "America/Toronto", day: "2-digit" }).format(new Date(item.draft.scheduledFor))}</b><span>{new Intl.DateTimeFormat("en-CA", { timeZone: "America/Toronto", month: "short" }).format(new Date(item.draft.scheduledFor))}</span></div>
        <div><StatusPill status={item.draft.status} /><strong>{item.version?.brief.headline || generationLabels[item.draft.generationStage]}</strong><small>{studioDate(item.draft.scheduledFor)}</small>{item.draft.status === "GENERATING" && <span className="studio-queue-progress"><i style={{ width: `${item.draft.generationProgress}%` }} /></span>}</div>
        <PlatformMarks destinations={item.draft.destinations} />
      </button>)}
    </div>
    {selected && <DraftInspector key={`${selected.draft.id}:${selected.draft.currentVersionId || selected.draft.generationStage}`} item={selected} attempts={attempts.filter((attempt) => attempt.draftId === selected.draft.id)} action={action} ask={ask} preview={preview} pending={pending} />}
  </div>;
}

function DraftInspector({ item, attempts, action, ask, preview, pending }: { item: StudioData["drafts"][number]; attempts: Attempt[]; action: (payload: Record<string, unknown>) => Promise<void>; ask: (state: NonNullable<ConfirmState>) => void; preview: () => void; pending: boolean }) {
  const [platform, setPlatform] = useState<"FACEBOOK" | "INSTAGRAM">(item.draft.destinations[0] || "FACEBOOK");
  const [headline, setHeadline] = useState(item.version?.brief.headline || "");
  const [facebookCaption, setFacebookCaption] = useState(item.version?.facebookCaption || "");
  const [instagramCaption, setInstagramCaption] = useState(item.version?.instagramCaption || "");
  const [regenNotes, setRegenNotes] = useState("");
  const [reschedule, setReschedule] = useState(false);
  const scheduled = new Date(item.draft.scheduledFor);
  const editable = item.draft.status === "AWAITING_APPROVAL";

  const cancellable = ["GENERATING", "AWAITING_APPROVAL", "APPROVED"].includes(item.draft.status);
  const deletable = ["AWAITING_APPROVAL", "APPROVED", "GENERATION_FAILED", "MISSED", "CANCELLED"].includes(item.draft.status);

  return <article className="studio-inspector">
    <div className="studio-inspector-head"><div><p className="studio-kicker">DRAFT / {item.version ? `VERSION ${String(item.version.version).padStart(2, "0")}` : item.draft.status === "GENERATION_FAILED" ? "GENERATION FAILED" : item.draft.status}</p><h2>{item.version?.brief.headline || generationLabels[item.draft.generationStage]}</h2></div><div className="studio-inspector-actions">{cancellable && <button disabled={pending} onClick={() => ask({ title: "Cancel this draft?", body: item.draft.status === "GENERATING" ? "Generation will stop after its current stage. Nothing will publish." : "The draft will be removed from the approval flow and will not publish.", confirm: "Cancel draft", danger: true, run: () => action({ action: "cancel", draftId: item.draft.id }) })}><X size={15} /> Cancel</button>}{deletable && <button disabled={pending} onClick={() => ask({ title: "Permanently delete this draft?", body: "This removes the draft and its unpublished versions from the Studio. This cannot be undone.", confirm: "Delete draft", danger: true, run: () => action({ action: "delete", draftId: item.draft.id }) })}><Trash2 size={14} /> Delete</button>}</div></div>
    <div className="studio-schedule-line"><Clock3 size={14} /><span>Scheduled for <strong>{studioDate(item.draft.scheduledFor)}</strong></span><button onClick={() => setReschedule(!reschedule)}>Reschedule</button></div>
    {reschedule && <form className="studio-inline-form" onSubmit={async (event) => { event.preventDefault(); const fd = new FormData(event.currentTarget); await action({ action: "reschedule", draftId: item.draft.id, date: fd.get("date"), time: fd.get("time") }); setReschedule(false); }}><input name="date" type="date" required defaultValue={new Intl.DateTimeFormat("en-CA", { timeZone: "America/Toronto" }).format(scheduled)} /><input name="time" type="time" required defaultValue={new Intl.DateTimeFormat("en-CA", { timeZone: "America/Toronto", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(scheduled)} /><button>Apply</button></form>}
    {item.version ? <>
      <button className="studio-creative" onClick={preview} aria-label="Open full-size creative preview"><img src={item.version.assetUrl} alt={item.version.brief.headline} /><span><ImageIcon size={14} />1080 × 1350 PNG · Click to expand</span></button>
      <div className="studio-editor-tabs">{item.draft.destinations.map((entry) => <button key={entry} className={platform === entry ? "active" : ""} onClick={() => setPlatform(entry)}>{entry === "FACEBOOK" ? <Facebook size={14} /> : <Instagram size={14} />}{statusLabel(entry)}</button>)}</div>
      <div className="studio-copy-fields">
        <label>Creative headline <input value={headline} disabled={!editable} maxLength={84} onChange={(event) => setHeadline(event.target.value)} /><span>{headline.length}/84</span></label>
        {platform === "FACEBOOK" ? <label>Facebook caption <textarea value={facebookCaption} disabled={!editable} onChange={(event) => setFacebookCaption(event.target.value)} /><span>{facebookCaption.length}/1800</span></label> : <label>Instagram caption <textarea value={instagramCaption} disabled={!editable} onChange={(event) => setInstagramCaption(event.target.value)} /><span>{instagramCaption.length}/1800</span></label>}
        {editable && <button className="studio-text-action" disabled={pending} onClick={() => action({ action: "edit", draftId: item.draft.id, headline, facebookCaption, instagramCaption })}>Save as new version <ArrowRight size={13} /></button>}
      </div>
      {item.draft.lastError && <div className="studio-error-note"><CircleAlert size={15} />{item.draft.lastError}</div>}
      {attempts.length > 0 && <div className="studio-attempts">{attempts.map((attempt) => <div key={attempt.id}><PlatformMarks destinations={[attempt.platform]} /><StatusPill status={attempt.status} /><span>Attempt {attempt.attempts}</span>{attempt.permalink && <a href={attempt.permalink} target="_blank" rel="noreferrer"><ExternalLink size={13} /></a>}</div>)}</div>}
      {editable && <div className="studio-regen"><label>Regeneration note <input value={regenNotes} onChange={(event) => setRegenNotes(event.target.value)} placeholder="Optional direction for the next version" /></label><button disabled={pending} onClick={() => ask({ title: "Regenerate this draft?", body: "A new immutable copy and artwork version will be created. The current version will remain in history.", confirm: "Regenerate version", run: () => action({ action: "regenerate", draftId: item.draft.id, notes: regenNotes }) })}><RotateCcw size={14} /> Regenerate</button></div>}
      {["AWAITING_APPROVAL", "APPROVED"].includes(item.draft.status) && <div className="studio-approval-bar">
        {item.draft.approval === "APPROVED" ? <><div><Check size={17} /><span><strong>Approved</strong><small>Ready to publish</small></span></div><button className="studio-publish" onClick={() => ask({ title: "Publish this post now?", body: `This will immediately publish version ${item.version!.version} to ${item.draft.destinations.map(statusLabel).join(" and ")}. This cannot be undone.`, confirm: "Publish now", run: () => action({ action: "publishNow", draftId: item.draft.id }) })}><Send size={15} /> Publish now</button></> : <><div><ShieldCheck size={17} /><span><strong>Approval required</strong><small>Nothing publishes without it</small></span></div><button className="studio-approve" disabled={!editable || pending} onClick={() => ask({ title: "Approve this exact version?", body: `Version ${item.version!.version} will be locked for publication on ${studioDate(item.draft.scheduledFor)}. Later edits will reset approval.`, confirm: "Approve version", run: () => action({ action: "approve", draftId: item.draft.id }) })}><Check size={15} /> Approve post</button></>}
      </div>}
    </> : <div className={`studio-generating ${item.draft.status === "GENERATION_FAILED" ? "has-failed" : ""}`}>{item.draft.status === "GENERATING" ? <Loader2 className="spin" /> : <CircleAlert />}<strong>{item.draft.status === "GENERATION_FAILED" ? "Generation stopped" : item.draft.status === "CANCELLED" ? "Draft cancelled" : generationLabels[item.draft.generationStage]}</strong><div className="studio-generation-track" aria-label={`${item.draft.generationProgress}% complete`}><i style={{ width: `${item.draft.generationProgress}%` }} /></div><small>{item.draft.generationProgress}% · {generationLabels[item.draft.generationStage]}</small><p>{item.draft.lastError || "The Studio is writing the copy, generating the artwork, and assembling the final asset. You can leave this page; progress is saved."}</p>{item.draft.status === "GENERATION_FAILED" && <button disabled={pending} onClick={() => action({ action: "retry", draftId: item.draft.id })}><RotateCcw size={14} /> Retry generation</button>}</div>}
  </article>;
}

function ScheduleView({ automations, action, ask, pending }: { automations: Automation[]; action: (payload: Record<string, unknown>) => Promise<void>; ask: (state: NonNullable<ConfirmState>) => void; pending: boolean }) {
  if (!automations.length) return <EmptyState schedule />;
  return <div className="studio-schedule-table"><div className="studio-table-head"><span>Automation</span><span>Cadence</span><span>Destinations</span><span>Next occurrence</span><span>Status</span><span /></div>{automations.map((item) => <div className="studio-table-row" key={item.id}><div><strong>{item.name}</strong><small>{item.promptSpec.topic}</small></div><span>{item.kind === "ONE_TIME" ? "One time" : `${item.weekdays?.map((day) => week[day]).join(", ")} · ${item.publishTime}`}</span><PlatformMarks destinations={item.destinations} /><span>{item.nextOccurrenceAt ? studioDate(item.nextOccurrenceAt) : "—"}</span><StatusPill status={item.status} /><div className="studio-schedule-actions"><button aria-label={item.status === "ACTIVE" ? "Pause schedule" : "Resume schedule"} disabled={item.status === "COMPLETED" || pending} onClick={() => action({ action: "pause", automationId: item.id, paused: item.status === "ACTIVE" })}>{item.status === "ACTIVE" ? <Pause size={14} /> : <Play size={14} />}</button><button className="danger" aria-label="Delete schedule" disabled={pending} onClick={() => ask({ title: "Permanently delete this schedule?", body: `“${item.name}” will stop creating posts. Every unpublished draft belonging only to this schedule will also be removed. Published and partially published history will be preserved.`, confirm: "Delete schedule", danger: true, run: () => action({ action: "deleteSchedule", automationId: item.id }) })}><Trash2 size={14} /></button></div></div>)}</div>;
}

function HistoryView({ items, attempts, selectedId, onSelect }: { items: StudioData["drafts"]; attempts: Attempt[]; selectedId: string; onSelect: (id: string) => void }) {
  if (!items.length) return <div className="studio-empty"><Clock3 size={25} /><h2>No history yet.</h2><p>Published, missed, and cancelled posts will form an immutable ledger here.</p></div>;
  const selected = items.find((item) => item.draft.id === selectedId) || items[0];
  const selectedAttempts = attempts.filter((attempt) => attempt.draftId === selected.draft.id);

  async function copyCaption(label: string, caption: string) {
    await navigator.clipboard.writeText(caption);
    // A compact native announcement keeps this archive useful without adding another global state channel.
    const region = document.getElementById("studio-copy-status");
    if (region) region.textContent = `${label} caption copied`;
  }

  return <div className="studio-history-layout">
    <div className="studio-history-grid" aria-label="Finished post archive">{items.map((item) => {
      const publishedCount = attempts.filter((entry) => entry.draftId === item.draft.id && entry.status === "PUBLISHED").length;
      return <button key={item.draft.id} className={item.draft.id === selected.draft.id ? "active" : ""} aria-pressed={item.draft.id === selected.draft.id} onClick={() => onSelect(item.draft.id)}>{item.version?.assetUrl ? <img src={item.version.assetUrl} alt="" /> : <div className="studio-history-placeholder"><ImageIcon /></div>}<div><StatusPill status={item.draft.status} /><strong>{item.version?.brief.headline || "Draft without creative"}</strong><small>{studioDate(item.draft.scheduledFor)}</small><span>{publishedCount ? `${publishedCount} platform publication${publishedCount === 1 ? "" : "s"}` : "Not published"}</span></div></button>;
    })}</div>
    <article className="studio-finished-post">
      <div className="studio-finished-head"><div><p className="studio-kicker">FINISHED / VERSION {String(selected.version?.version || 0).padStart(2, "0")}</p><h2>{selected.version?.brief.headline || "Draft without creative"}</h2><div><StatusPill status={selected.draft.status} /><span>{studioDate(selected.draft.scheduledFor)}</span><PlatformMarks destinations={selected.draft.destinations} /></div></div></div>
      {selected.version ? <>
        <img className="studio-finished-creative" src={selected.version.assetUrl} alt={selected.version.brief.headline} />
        <section className="studio-finished-copy"><header><span><Facebook size={14} /> Facebook caption</span><button onClick={() => copyCaption("Facebook", selected.version!.facebookCaption)}><Copy size={13} /> Copy</button></header><p>{selected.version.facebookCaption}</p></section>
        <section className="studio-finished-copy"><header><span><Instagram size={14} /> Instagram caption</span><button onClick={() => copyCaption("Instagram", selected.version!.instagramCaption)}><Copy size={13} /> Copy</button></header><p>{selected.version.instagramCaption}</p></section>
      </> : <div className="studio-finished-missing"><ImageIcon size={22} /><p>No creative was completed for this post.</p></div>}
      {selectedAttempts.length > 0 && <div className="studio-finished-links"><p className="studio-kicker">PUBLICATION RECEIPTS</p>{selectedAttempts.map((attempt) => <div key={attempt.id}><span>{attempt.platform === "FACEBOOK" ? <Facebook size={14} /> : <Instagram size={14} />}{statusLabel(attempt.platform)}</span><StatusPill status={attempt.status} />{attempt.permalink ? <a href={attempt.permalink} target="_blank" rel="noreferrer">View live post <ExternalLink size={12} /></a> : <small>{attempt.lastError || "No public link available"}</small>}</div>)}</div>}
      <span id="studio-copy-status" className="studio-sr-only" aria-live="polite" />
    </article>
  </div>;
}

function EmptyState({ schedule = false }: { schedule?: boolean }) {
  return <div className="studio-empty"><span className="studio-empty-mark">{"//"}</span><p className="studio-kicker">{schedule ? "NO AUTOMATIONS" : "DESK IS CLEAR"}</p><h2>{schedule ? "No schedules yet." : "No drafts need attention."}</h2><p>{schedule ? "Give Autopilot a topic and schedule. It creates the first draft now and future recurring drafts three days ahead." : "Upcoming recurring drafts will appear automatically three days before their scheduled publish time."}</p></div>;
}

const ScheduleDialog = function ScheduleDialog({ ref, onCreate }: { ref: React.Ref<HTMLDialogElement>; onCreate: (payload: Record<string, unknown>, summary: string) => void }) {
  const [kind, setKind] = useState<"ONE_TIME" | "WEEKLY">("ONE_TIME");
  const [days, setDays] = useState<number[]>([2]);
  const [ideas, setIdeas] = useState<SocialIdea[]>([]);
  const [ideaLoading, setIdeaLoading] = useState(false);
  const [ideaError, setIdeaError] = useState("");
  const [selectedIdea, setSelectedIdea] = useState(0);
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  const [keyMessage, setKeyMessage] = useState("");
  const [cta, setCta] = useState("");

  function selectGeneratedIdea(idea: SocialIdea, index: number) {
    setSelectedIdea(index);
    setName(idea.name);
    setTopic(idea.topic);
    setKeyMessage(idea.keyMessage);
    setCta(idea.cta);
  }

  async function generateIdeas() {
    setIdeaLoading(true);
    setIdeaError("");
    try {
      const response = await fetch("/api/studio/social", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "ideas" }) });
      const result = await response.json() as { ok: boolean; ideas?: SocialIdea[]; message?: string };
      if (!response.ok || !result.ok || !result.ideas?.length) throw new Error(result.message || "Ideas could not be generated");
      setIdeas(result.ideas);
      selectGeneratedIdea(result.ideas[0], 0);
    } catch (error) {
      setIdeaError(error instanceof Error ? error.message : "Ideas could not be generated");
    } finally {
      setIdeaLoading(false);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const fd = new FormData(event.currentTarget);
    const destinations = [fd.get("facebook") && "FACEBOOK", fd.get("instagram") && "INSTAGRAM"].filter(Boolean);
    const payload = { action: "create", name: fd.get("name"), kind, promptSpec: { topic: fd.get("topic"), audience: fd.get("audience"), keyMessage: fd.get("keyMessage"), cta: fd.get("cta"), url: fd.get("url"), notes: fd.get("notes") }, destinations, startDate: fd.get("date"), oneTimeDate: fd.get("date"), endDate: kind === "WEEKLY" ? fd.get("endDate") || null : null, weekdays: kind === "WEEKLY" ? days : undefined, publishTime: fd.get("time") };
    const label = String(fd.get("name") || fd.get("topic"));
    onCreate(payload, `${label} will publish ${kind === "ONE_TIME" ? `once on ${fd.get("date")}` : `weekly on ${days.map((day) => week[day]).join(", ")}`} at ${fd.get("time")} America/Toronto. The first creative will generate now; every occurrence still requires approval.`);
  }
  return <dialog ref={ref} className="studio-dialog studio-create-dialog"><form onSubmit={submit}><header><div><p className="studio-kicker">AUTOPILOT</p><h2>Choose an idea and a time.</h2><p>Let Bayline Autopilot find a fresh angle from your agency context and recent post history—or enter your own.</p></div><button type="button" onClick={() => (ref as React.RefObject<HTMLDialogElement>).current?.close()}><X size={19} /></button></header><div className="studio-kind-switch"><button type="button" className={kind === "ONE_TIME" ? "active" : ""} onClick={() => setKind("ONE_TIME")}>One-time post</button><button type="button" className={kind === "WEEKLY" ? "active" : ""} onClick={() => setKind("WEEKLY")}>Recurring weekly</button></div><div className="studio-form-grid">
    <section className="studio-idea-generator"><div><span><Sparkles size={15} /></span><div><strong>Need an angle?</strong><p>Uses Bayline’s positioning, services, point of view, and recent posts.</p></div></div><button type="button" disabled={ideaLoading} onClick={generateIdeas}>{ideaLoading ? <Loader2 className="spin" size={14} /> : <Sparkles size={14} />}{ideaLoading ? "Finding fresh angles…" : ideas.length ? "Generate four more" : "Generate four ideas"}</button>{ideaError && <small><CircleAlert size={12} />{ideaError}</small>}</section>
    {ideas.length > 0 && <div className="studio-idea-grid">{ideas.map((idea, index) => <button type="button" key={`${idea.name}-${index}`} className={selectedIdea === index ? "active" : ""} onClick={() => selectGeneratedIdea(idea, index)}><span>{String(index + 1).padStart(2, "0")} / {idea.pillar}</span><strong>{idea.name}</strong><p>{idea.whyItWorks}</p><i>{selectedIdea === index ? "Selected" : "Use this angle"}<ArrowRight size={11} /></i></button>)}</div>}
    <label className="wide">Schedule name <small>Optional</small><input name="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Defaults to the topic" /></label>
    <label className="wide">Topic<input name="topic" required value={topic} onChange={(event) => setTopic(event.target.value)} placeholder="Generate an idea above or enter your own" /></label>
    <label>Audience <small>Optional</small><input name="audience" placeholder="Autopilot uses Bayline's default audience" /></label><label>Key message <small>Optional</small><input name="keyMessage" value={keyMessage} onChange={(event) => setKeyMessage(event.target.value)} placeholder="Autopilot chooses a useful angle" /></label>
    <label>Call to action <small>Optional</small><input name="cta" value={cta} onChange={(event) => setCta(event.target.value)} placeholder="Autopilot uses Bayline's default CTA" /></label><label>URL <small>Optional</small><input name="url" type="url" placeholder="https://" /></label>
    <label className="wide">Generation notes <small>Optional</small><textarea name="notes" placeholder="Add tone, imagery, or context only when you need it." /></label>
    <fieldset className="wide"><legend>Destinations</legend><label><input name="facebook" type="checkbox" defaultChecked /> <Facebook size={14} /> Facebook</label><label><input name="instagram" type="checkbox" defaultChecked /> <Instagram size={14} /> Instagram</label></fieldset>
    {kind === "WEEKLY" && <fieldset className="wide"><legend>Weekdays</legend><div className="studio-weekdays">{week.map((label, day) => <button type="button" className={days.includes(day) ? "active" : ""} key={label} onClick={() => setDays(days.includes(day) ? days.filter((entry) => entry !== day) : [...days, day])}>{label.slice(0, 1)}</button>)}</div></fieldset>}
    <label>{kind === "ONE_TIME" ? "Publish date" : "Start date"}<input name="date" type="date" required /></label>{kind === "WEEKLY" && <label>End date <small>Optional</small><input name="endDate" type="date" /></label>}<label>Publish time<input name="time" type="time" defaultValue="10:00" required /></label><label>Timezone<input value="America/Toronto" disabled /></label>
  </div><footer><button type="button" onClick={() => (ref as React.RefObject<HTMLDialogElement>).current?.close()}>Cancel</button><button className="studio-primary">Review schedule <ArrowRight size={14} /></button></footer></form></dialog>;
};

function ConfirmDialog({ state, close, run, pending }: { state: ConfirmState; close: () => void; run: () => void; pending: boolean }) {
  if (!state) return null;
  return <div className="studio-confirm-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}><div role="alertdialog" aria-modal="true" aria-labelledby="confirm-title" className="studio-confirm"><span className="studio-confirm-icon"><ShieldCheck size={20} /></span><p className="studio-kicker">CONFIRM ACTION</p><h2 id="confirm-title">{state.title}</h2><p>{state.body}</p><div><button onClick={close}>Go back</button><button className={state.danger ? "danger" : ""} disabled={pending} onClick={run}>{state.confirm}<ArrowRight size={14} /></button></div></div></div>;
}
