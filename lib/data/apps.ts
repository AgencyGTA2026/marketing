import type { AppInfo } from "@/components/app-legal";

export const SIP_AND_SORT: AppInfo = {
  name: "Sip & Sort",
  slug: "sip-and-sort",
  tagline: "A cozy café sort puzzle for iPhone.",
};

export const APP_PAGES = ["", "/support", "/privacy", "/terms"].map((path) => `/${SIP_AND_SORT.slug}${path}`);
