export function isLoopbackHostname(hostname: string) {
  const normalized = hostname.toLowerCase().replace(/^\[|\]$/g, "");
  return normalized === "localhost"
    || normalized.endsWith(".localhost")
    || normalized === "127.0.0.1"
    || normalized === "::1";
}

export function hostnameFromHostHeader(host: string) {
  const value = host.trim().toLowerCase();
  if (value.startsWith("[")) {
    const closing = value.indexOf("]");
    return closing === -1 ? value : value.slice(1, closing);
  }
  return value.split(":", 1)[0];
}
