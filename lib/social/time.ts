import { GENERATION_LEAD_DAYS, STUDIO_TIMEZONE } from "./constants";

type Parts = { year: number; month: number; day: number; hour: number; minute: number; second: number };

function partsAt(date: Date, timeZone = STUDIO_TIMEZONE): Parts {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) => Number(parts.find((p) => p.type === type)?.value);
  return { year: get("year"), month: get("month"), day: get("day"), hour: get("hour"), minute: get("minute"), second: get("second") };
}

function offsetAt(date: Date, timeZone: string) {
  const p = partsAt(date, timeZone);
  return Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second) - Math.floor(date.getTime() / 1000) * 1000;
}

export function zonedDateTimeToUtc(localDate: string, localTime: string, timeZone = STUDIO_TIMEZONE) {
  const [year, month, day] = localDate.split("-").map(Number);
  const [hour, minute] = localTime.split(":").map(Number);
  const wall = Date.UTC(year, month - 1, day, hour, minute, 0);
  let result = new Date(wall - offsetAt(new Date(wall), timeZone));
  // A second pass handles an offset transition close to the requested wall time.
  result = new Date(wall - offsetAt(result, timeZone));
  const roundTrip = partsAt(result, timeZone);
  if (roundTrip.year !== year || roundTrip.month !== month || roundTrip.day !== day || roundTrip.hour !== hour || roundTrip.minute !== minute) {
    throw new Error(`The local time ${localDate} ${localTime} does not exist in ${timeZone}`);
  }
  return result;
}

export function localDateAt(date: Date, timeZone = STUDIO_TIMEZONE) {
  const p = partsAt(date, timeZone);
  return `${p.year}-${String(p.month).padStart(2, "0")}-${String(p.day).padStart(2, "0")}`;
}

function addLocalDays(localDate: string, days: number) {
  const [y, m, d] = localDate.split("-").map(Number);
  const next = new Date(Date.UTC(y, m - 1, d + days));
  return next.toISOString().slice(0, 10);
}

export function occurrenceKey(automationId: string, scheduledFor: Date) {
  return `${automationId}:${scheduledFor.toISOString()}`;
}

export function generationWindowOpens(scheduledFor: Date) {
  const localDate = localDateAt(scheduledFor, STUDIO_TIMEZONE);
  const local = partsAt(scheduledFor, STUDIO_TIMEZONE);
  const localTime = `${String(local.hour).padStart(2, "0")}:${String(local.minute).padStart(2, "0")}`;
  return zonedDateTimeToUtc(addLocalDays(localDate, -GENERATION_LEAD_DAYS), localTime, STUDIO_TIMEZONE);
}

export function shouldGenerate(scheduledFor: Date, now: Date) {
  return scheduledFor > now && generationWindowOpens(scheduledFor) <= now;
}

export function nextWeeklyOccurrence(input: {
  after: Date;
  startDate: string;
  endDate?: string | null;
  weekdays: number[];
  publishTime: string;
  timezone?: string;
}) {
  const timezone = input.timezone || STUDIO_TIMEZONE;
  let candidate = localDateAt(input.after, timezone);
  for (let i = 0; i < 370; i += 1) {
    if (candidate >= input.startDate && (!input.endDate || candidate <= input.endDate)) {
      const noon = zonedDateTimeToUtc(candidate, "12:00", timezone);
      const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(
        new Intl.DateTimeFormat("en-US", { timeZone: timezone, weekday: "short" }).format(noon),
      );
      if (input.weekdays.includes(weekday)) {
        const occurrence = zonedDateTimeToUtc(candidate, input.publishTime, timezone);
        if (occurrence > input.after) return occurrence;
      }
    }
    candidate = addLocalDays(candidate, 1);
    if (input.endDate && candidate > input.endDate) return null;
  }
  return null;
}

export function dueDisposition(input: { scheduledFor: Date; now: Date; approval: "PENDING" | "APPROVED" }) {
  if (input.scheduledFor > input.now) return "WAIT" as const;
  return input.approval === "APPROVED" ? "PUBLISH" as const : "MISSED" as const;
}

export function formatStudioDate(date: Date | string) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: STUDIO_TIMEZONE,
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(new Date(date));
}
