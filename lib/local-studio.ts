export function isLoopbackHostname(hostname: string) {
  const normalized = hostname.toLowerCase().replace(/^\[|\]$/g, "");
  return normalized === "localhost"
    || normalized.endsWith(".localhost")
    || normalized === "127.0.0.1"
    || normalized === "::1";
}

export function isStudioHostname(hostname: string, configured = [
  process.env.STUDIO_ALLOWED_HOSTS,
  process.env.BETTER_AUTH_URL,
  process.env.SITE_URL,
].filter(Boolean).join(",")) {
  if (isLoopbackHostname(hostname)) return true;
  const normalized = hostnameFromHostHeader(hostname);
  const allowed = configured.split(",").map((entry) => {
    const value = entry.trim();
    if (!value) return "";
    try { return new URL(value.includes("://") ? value : `https://${value}`).hostname.toLowerCase(); }
    catch { return ""; }
  });
  return allowed.includes(normalized);
}

export function hostnameFromHostHeader(host: string) {
  const value = host.trim().toLowerCase();
  if (value.startsWith("[")) {
    const closing = value.indexOf("]");
    return closing === -1 ? value : value.slice(1, closing);
  }
  return value.split(":", 1)[0];
}
