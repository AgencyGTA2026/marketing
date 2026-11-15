import type { AppInfo } from "@/components/app-legal";

export const SIP_AND_SORT: AppInfo = {
  name: "Sip & Sort",
  slug: "sip-and-sort",
  tagline: "A cozy café sort puzzle for iPhone.",
};

export const FLYAWAY_FLOCK: AppInfo = {
  name: "Flyaway Flock",
  slug: "flyaway-flock",
  tagline: "A tap-to-escape bird puzzle for iPhone.",
};

const APPS = [SIP_AND_SORT, FLYAWAY_FLOCK];

export const APP_PAGES = APPS.flatMap((app) => ["", "/support", "/privacy", "/terms"].map((path) => `/${app.slug}${path}`));
