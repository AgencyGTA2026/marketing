"use client";

import { useMemo, useState, type FormEvent } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Armchair,
  ArrowRight,
  Check,
  ChevronLeft,
  Clock3,
  Hammer,
  ImagePlus,
  MapPin,
  MessageSquareText,
  Phone,
  Refrigerator,
  TreePine,
  Truck,
  Warehouse,
} from "lucide-react";
import {
  ACCESS_LEVELS,
  JUNK_TYPES,
  LOAD_SIZES,
  calculateDurhamQuote,
  formatQuoteRange,
  type AccessLevel,
  type JunkType,
  type LoadSize,
} from "@/lib/ideas/durham-quote";
import styles from "./durham-junk-removal-concept.module.css";

const PHONE_DISPLAY = "905-410-4036";
const PHONE_LINK = "9054104036";

type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const SERVICES: readonly Service[] = [
  {
    title: "Garage & basement cleanouts",
    description: "Clear boxes, broken items, and the clutter that keeps getting pushed to next weekend.",
    icon: Warehouse,
  },
  {
    title: "Furniture removal",
    description: "Couches, mattresses, tables, and other bulky pieces moved out without the heavy lifting.",
    icon: Armchair,
  },
  {
    title: "Appliance pickup",
    description: "Get old household appliances out of the way with a pickup planned around your access.",
    icon: Refrigerator,
  },
  {
    title: "Yard waste",
    description: "Branches, bagged debris, and leftovers from seasonal outdoor cleanup projects.",
    icon: TreePine,
  },
  {
    title: "Renovation debris",
    description: "Light project waste quoted by material, volume, and the work needed to load it safely.",
    icon: Hammer,
  },
  {
    title: "Small-load hauling",
    description: "A practical option when you have too much for the curb but nowhere near a full truck.",
    icon: Truck,
  },
];

const AREAS = ["Oshawa", "Whitby", "Ajax", "Pickering", "Bowmanville", "Courtice"] as const;

type QuoteStage = "estimate" | "lead" | "success";

export function DurhamJunkRemovalConcept() {
  const [junkType, setJunkType] = useState<JunkType>("household");
  const [loadSize, setLoadSize] = useState<LoadSize>("quarter");
  const [access, setAccess] = useState<AccessLevel>("curbside");
  const [stage, setStage] = useState<QuoteStage>("estimate");
  const [photoName, setPhotoName] = useState("");

  const quote = useMemo(
    () => calculateDurhamQuote({ junkType, loadSize, access }),
    [access, junkType, loadSize],
  );

  function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStage("success");
  }

  return (
    <main className={styles.site}>
      <header className={styles.header}>
        <a className={styles.brand} href="#durham-top" aria-label="Durham Junk Removal concept home">
          <span className={styles.brandMark} aria-hidden="true">
            <Truck size={21} strokeWidth={2.4} />
          </span>
          <span>
            <strong>Durham</strong>
            <small>Junk Removal</small>
          </span>
        </a>

        <nav className={styles.nav} aria-label="Durham concept navigation">
          <a href="#durham-services">Services</a>
          <a href="#durham-process">How it works</a>
          <a href="#durham-areas">Service areas</a>
        </nav>

        <a className={styles.headerCall} href={`tel:${PHONE_LINK}`}>
          <Phone size={14} />
          <span>{PHONE_DISPLAY}</span>
        </a>
      </header>

      <section className={styles.hero} id="durham-top">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><span /> Local hauling across Durham Region</p>
          <h1>Clear the clutter.<br /><em>Keep your weekend.</em></h1>
          <p className={styles.heroDescription}>
            Point to what needs to go. Durham Junk Removal handles the lifting, loading, and dump run—with a clear plan before pickup day.
          </p>

          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href="#quote-builder">
              Build my estimate <ArrowRight size={16} />
            </a>
            <a className={styles.textButton} href={`sms:${PHONE_LINK}`}>
              <MessageSquareText size={16} /> Text a photo
            </a>
          </div>

          <div className={styles.heroProof} aria-label="Service highlights">
            <div><ImagePlus size={17} /><span><strong>Photo quotes</strong><small>Show the load first</small></span></div>
            <div><MapPin size={17} /><span><strong>Durham-wide</strong><small>Local service area</small></span></div>
            <div><Clock3 size={17} /><span><strong>Your schedule</strong><small>Request a pickup time</small></span></div>
          </div>
        </div>

        <div className={styles.quoteWrap} id="quote-builder">
          <div className={styles.quoteGlow} aria-hidden="true" />
          <section className={styles.quoteCard} aria-live="polite">
            <div className={styles.quoteHeader}>
              <div>
                <span className={styles.conceptTag}>Interactive concept</span>
                <h2>{stage === "estimate" ? "Build a quick estimate" : stage === "lead" ? "Request your pickup" : "Request ready"}</h2>
              </div>
              <span className={styles.stepCount}>{stage === "estimate" ? "01" : stage === "lead" ? "02" : "03"}<small>/ 03</small></span>
            </div>

            {stage === "estimate" && (
              <div className={styles.estimator}>
                <fieldset>
                  <legend>What are we clearing?</legend>
                  <div className={styles.junkOptions}>
                    {JUNK_TYPES.map((option) => (
                      <button
                        className={junkType === option.value ? styles.optionActive : undefined}
                        key={option.value}
                        type="button"
                        aria-pressed={junkType === option.value}
                        onClick={() => setJunkType(option.value)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <fieldset>
                  <legend>How much space will it take?</legend>
                  <div className={styles.loadOptions}>
                    {LOAD_SIZES.map((option, index) => (
                      <button
                        className={loadSize === option.value ? styles.loadActive : undefined}
                        key={option.value}
                        type="button"
                        aria-label={option.label}
                        aria-pressed={loadSize === option.value}
                        onClick={() => setLoadSize(option.value)}
                      >
                        <span className={styles.loadVisual} aria-hidden="true">
                          <i style={{ width: `${20 + index * 20}%` }} />
                        </span>
                        <small>{option.shortLabel}</small>
                      </button>
                    ))}
                  </div>
                </fieldset>

                <label className={styles.accessLabel}>
                  Pickup access
                  <select value={access} onChange={(event) => setAccess(event.target.value as AccessLevel)}>
                    {ACCESS_LEVELS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                  </select>
                </label>

                <div className={styles.estimateResult}>
                  <div>
                    <span>Illustrative estimate</span>
                    <strong>{formatQuoteRange(quote)}</strong>
                  </div>
                  <p>Concept pricing only. Final pricing would be confirmed from job details and photos.</p>
                </div>

                <button className={styles.quoteContinue} type="button" onClick={() => setStage("lead")}>
                  Check pickup options <ArrowRight size={16} />
                </button>
              </div>
            )}

            {stage === "lead" && (
              <form className={styles.leadForm} onSubmit={submitLead}>
                <button className={styles.backButton} type="button" onClick={() => setStage("estimate")}>
                  <ChevronLeft size={14} /> Edit estimate
                </button>

                <div className={styles.quoteSummary}>
                  <span>Your concept estimate</span>
                  <strong>{formatQuoteRange(quote)}</strong>
                </div>

                <div className={styles.formGrid}>
                  <label>Full name<input name="name" autoComplete="name" placeholder="Your name" required /></label>
                  <label>Phone<input name="phone" autoComplete="tel" inputMode="tel" placeholder="(905) 000-0000" required /></label>
                  <label>Postal code<input name="postal" autoComplete="postal-code" placeholder="L1G 0A1" required /></label>
                  <label>Preferred timing<select name="timing" defaultValue="this-week"><option value="this-week">This week</option><option value="next-week">Next week</option><option value="flexible">I’m flexible</option></select></label>
                </div>

                <label className={styles.notesLabel}>What needs to go?<textarea name="details" rows={3} placeholder="A couch, two chairs, and several boxes…" /></label>

                <label className={styles.photoUpload}>
                  <ImagePlus size={18} />
                  <span><strong>{photoName || "Add a photo"}</strong><small>{photoName ? "Ready for this concept request" : "Helps confirm the final quote"}</small></span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => setPhotoName(event.target.files?.[0]?.name ?? "")}
                  />
                </label>

                <p className={styles.formNotice}>Demo only—this form does not send or store your information.</p>
                <button className={styles.quoteContinue} type="submit">Request my pickup <ArrowRight size={16} /></button>
              </form>
            )}

            {stage === "success" && (
              <div className={styles.successState}>
                <span className={styles.successIcon}><Check size={25} /></span>
                <p className={styles.conceptTag}>Concept interaction complete</p>
                <h3>Your request is ready to review.</h3>
                <p>In a live version, Durham Junk Removal would receive the job details and follow up to confirm pricing and pickup timing.</p>
                <button type="button" onClick={() => setStage("estimate")}>Build another estimate</button>
              </div>
            )}
          </section>
        </div>
      </section>

      <div className={styles.signalBar} aria-label="Key customer benefits">
        <span><Check size={13} /> Call or text</span>
        <span><Check size={13} /> Quote before pickup</span>
        <span><Check size={13} /> Local Durham service</span>
        <span><Check size={13} /> You point, we haul</span>
      </div>

      <section className={styles.services} id="durham-services">
        <div className={styles.sectionIntro}>
          <div><p className={styles.kicker}>What we clear</p><h2>One call.<br />More room to live.</h2></div>
          <p>From one awkward item to a full weekend cleanout, the experience stays simple: show the load, get the plan, and let the heavy lifting disappear.</p>
        </div>

        <div className={styles.serviceGrid}>
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <article key={service.title}>
                <span className={styles.serviceNumber}>{String(index + 1).padStart(2, "0")}</span>
                <Icon size={25} />
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <a href="#quote-builder">Estimate this job <ArrowRight size={13} /></a>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.spaceSection}>
        <div className={styles.spaceVisual} aria-label="Illustration of a cluttered space becoming clear">
          <div className={styles.beforeSpace}>
            <span>Before</span>
            <i /><i /><i /><i /><i />
          </div>
          <div className={styles.afterSpace}>
            <span>After</span>
            <div className={styles.clearMark}><Check size={22} /></div>
          </div>
          <div className={styles.visualArrow}><ArrowRight size={18} /></div>
        </div>
        <div className={styles.spaceCopy}>
          <p className={styles.kicker}>Make space for the good stuff</p>
          <h2>The best part is what’s left behind.</h2>
          <p>A garage that fits the car. A basement you can use. A move that feels lighter. Junk removal should end with relief, not another chore.</p>
          <a href="#quote-builder">See what your load could cost <ArrowRight size={14} /></a>
        </div>
      </section>

      <section className={styles.process} id="durham-process">
        <div className={styles.processHeading}>
          <p className={styles.kicker}>How it works</p>
          <h2>Point. Plan. Gone.</h2>
        </div>
        <ol>
          <li><span>01</span><div><strong>Show the load</strong><p>Build a quick estimate or text photos of what needs to go.</p></div></li>
          <li><span>02</span><div><strong>Confirm the job</strong><p>Review the items, access, final price, and a pickup time that works.</p></div></li>
          <li><span>03</span><div><strong>Reclaim the space</strong><p>Durham Junk Removal handles the lifting, loading, and haul-away.</p></div></li>
        </ol>
      </section>

      <section className={styles.localSection}>
        <div className={styles.ownerCard}>
          <div className={styles.ownerMark}>BM</div>
          <div><span>Local owner</span><strong>Brandon Morrison</strong></div>
        </div>
        <div className={styles.localCopy}>
          <p className={styles.kicker}>Local by design</p>
          <h2>Hard work, clear communication, and follow-through.</h2>
          <p>Durham Junk Removal is a young local business built around a straightforward promise: understand the job, agree on the plan, and get it handled with respect for the customer’s space and time.</p>
          <a href={`tel:${PHONE_LINK}`}><Phone size={14} /> Talk directly: {PHONE_DISPLAY}</a>
        </div>
      </section>

      <section className={styles.areas} id="durham-areas">
        <div>
          <p className={styles.kicker}>Service area</p>
          <h2>Across Durham.<br />Close to home.</h2>
        </div>
        <div className={styles.areaGrid}>
          {AREAS.map((area) => <span key={area}><MapPin size={14} /> {area}</span>)}
          <span className={styles.areaWide}><Truck size={15} /> Nearby Durham communities</span>
        </div>
      </section>

      <section className={styles.closing}>
        <p className={styles.kicker}>Ready when you are</p>
        <h2>Let’s get it<br /><em>out of the way.</em></h2>
        <p>Start with a quick estimate, or send a photo and tell us where the pickup is.</p>
        <div>
          <a className={styles.primaryButton} href="#quote-builder">Build my estimate <ArrowRight size={16} /></a>
          <a className={styles.closingCall} href={`tel:${PHONE_LINK}`}><Phone size={15} /> Call {PHONE_DISPLAY}</a>
        </div>
      </section>

      <footer className={styles.footer}>
        <a className={styles.brand} href="#durham-top">
          <span className={styles.brandMark}><Truck size={20} /></span>
          <span><strong>Durham</strong><small>Junk Removal</small></span>
        </a>
        <p>Serving Oshawa, Whitby, Ajax, Pickering, Bowmanville, Courtice, and nearby Durham communities.</p>
        <a href={`tel:${PHONE_LINK}`}>{PHONE_DISPLAY}</a>
      </footer>

      <div className={styles.mobileAction}>
        <a href={`tel:${PHONE_LINK}`}><Phone size={15} /> Call now</a>
        <a href="#quote-builder">Get estimate <ArrowRight size={15} /></a>
      </div>
    </main>
  );
}
