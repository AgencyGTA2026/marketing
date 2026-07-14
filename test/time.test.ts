import { describe, expect, it } from "vitest";
import { dueDisposition, generationWindowOpens, nextWeeklyOccurrence, shouldGenerate, zonedDateTimeToUtc } from "@/lib/social/time";

describe("America/Toronto scheduling", () => {
  it("converts winter and summer wall times across DST", () => {
    expect(zonedDateTimeToUtc("2026-01-15", "10:00").toISOString()).toBe("2026-01-15T15:00:00.000Z");
    expect(zonedDateTimeToUtc("2026-07-15", "10:00").toISOString()).toBe("2026-07-15T14:00:00.000Z");
  });

  it("rejects a wall time skipped by spring-forward", () => {
    expect(() => zonedDateTimeToUtc("2026-03-08", "02:30")).toThrow(/does not exist/);
  });

  it("finds weekly recurrences and respects the end date", () => {
    const next = nextWeeklyOccurrence({
      after: new Date("2026-07-13T15:00:00.000Z"),
      startDate: "2026-07-01",
      endDate: "2026-07-31",
      weekdays: [2, 4],
      publishTime: "10:00",
    });
    expect(next?.toISOString()).toBe("2026-07-14T14:00:00.000Z");
    expect(nextWeeklyOccurrence({ after: new Date("2026-08-01"), startDate: "2026-07-01", endDate: "2026-07-31", weekdays: [2], publishTime: "10:00" })).toBeNull();
  });

  it("advances recurring schedules to the next selected weekday", () => {
    const first = zonedDateTimeToUtc("2026-07-14", "10:00");
    const following = nextWeeklyOccurrence({
      after: first,
      startDate: "2026-07-01",
      weekdays: [2, 4],
      publishTime: "10:00",
    });
    expect(following?.toISOString()).toBe("2026-07-16T14:00:00.000Z");
  });

  it("opens generation exactly three days before an occurrence", () => {
    const occurrence = new Date("2026-07-16T14:00:00.000Z");
    expect(generationWindowOpens(occurrence).toISOString()).toBe("2026-07-13T14:00:00.000Z");
    expect(shouldGenerate(occurrence, new Date("2026-07-13T13:59:59.999Z"))).toBe(false);
    expect(shouldGenerate(occurrence, new Date("2026-07-13T14:00:00.000Z"))).toBe(true);
  });

  it("keeps the same Toronto wall time when the three-day window crosses DST", () => {
    const occurrence = zonedDateTimeToUtc("2026-03-10", "10:00");
    // March 7 is EST and March 10 is EDT: three calendar days is 71 elapsed hours.
    expect(generationWindowOpens(occurrence).toISOString()).toBe("2026-03-07T15:00:00.000Z");
  });

  it("never publishes a due unapproved draft", () => {
    const input = { scheduledFor: new Date("2026-07-13T14:00:00Z"), now: new Date("2026-07-13T14:15:00Z") };
    expect(dueDisposition({ ...input, approval: "PENDING" })).toBe("MISSED");
    expect(dueDisposition({ ...input, approval: "APPROVED" })).toBe("PUBLISH");
  });
});
