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

export const WORD_HARBOR: AppInfo = {
  name: "Word Harbor",
  slug: "word-harbor",
  tagline: "A cozy seaside word puzzle for iPhone.",
};

export const TILE_AND_THRONE: AppInfo = {
  name: "Tile & Throne",
  slug: "tile-and-throne",
  tagline: "A word duel game for iPhone.",
};

export const ECHO: AppInfo = {
  name: "Echo",
  slug: "echo",
  tagline: "A grid puzzle game for iPhone.",
};

const APPS = [SIP_AND_SORT, FLYAWAY_FLOCK, WORD_HARBOR, TILE_AND_THRONE, ECHO];

export const APP_PAGES = APPS.flatMap((app) => ["", "/support", "/privacy", "/terms"].map((path) => `/${app.slug}${path}`));
