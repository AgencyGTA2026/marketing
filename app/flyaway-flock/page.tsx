import Link from "next/link";
import { AppDocPage } from "@/components/app-legal";
import { FLYAWAY_FLOCK } from "@/lib/data/apps";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Flyaway Flock | Tap-to-escape bird puzzle for iPhone",
  description: "Flyaway Flock is a bird puzzle by Bayline Digital. Tap each bird to fly it off the wire, but only when its path is clear.",
  path: "/flyaway-flock",
});

export default function FlyawayFlockPage() {
  return (
    <AppDocPage app={FLYAWAY_FLOCK} eyebrow="IPHONE GAME · BAYLINE DIGITAL INC." title="Flyaway Flock">
      <p className="app-doc-lead">A bird puzzle for iPhone. Every bird on the wire faces a direction. Tap one and it flies away, but only if no other bird is in its path. Clear the whole flock before you run out of taps.</p>
      <h2>What’s inside</h2>
      <ul>
        <li>Hundreds of levels across seven chapters, from Dawn Meadow to Starlit Night, each checked to be solvable.</li>
        <li>Three stars for a clear with no wasted taps, sleepy birds that need waking, and hints, undo, and shoo when you’re stuck.</li>
        <li>Fourteen birds to collect with stars and coins, and a flock you choose to fill every board.</li>
        <li>A daily puzzle that’s the same for everyone, with streaks and a spoiler-free result to share.</li>
      </ul>
      <h2>Help and policies</h2>
      <p>Questions or problems? Visit <Link href="/flyaway-flock/support">Flyaway Flock support</Link> or email <a href="mailto:contact@baylinedigital.com">contact@baylinedigital.com</a>. Read the <Link href="/flyaway-flock/privacy">privacy policy</Link> and <Link href="/flyaway-flock/terms">terms of use</Link>.</p>
      <p>Flyaway Flock is owned and operated by Bayline Digital Inc., Toronto, Ontario, Canada.</p>
    </AppDocPage>
  );
}
