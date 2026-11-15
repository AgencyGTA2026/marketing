import Link from "next/link";
import { AppDocPage } from "@/components/app-legal";
import { WORD_HARBOR } from "@/lib/data/apps";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Word Harbor | Cozy seaside word puzzle for iPhone",
  description: "Word Harbor is a word puzzle by Bayline Digital. Swipe letters to fill the crossword, tour a seaside coast, and grow your own harbor town.",
  path: "/word-harbor",
});

export default function WordHarborPage() {
  return (
    <AppDocPage app={WORD_HARBOR} eyebrow="IPHONE GAME · BAYLINE DIGITAL INC." title="Word Harbor">
      <p className="app-doc-lead">A calm word puzzle for iPhone. Swipe across the letter wheel to spell words and fill the crossword. Every word you find helps a little seaside harbor town grow, one lighthouse, boat and cottage at a time.</p>
      <h2>What’s inside</h2>
      <ul>
        <li>600 levels across 30 stages, touring ten coastal places from Sandy Cove to Starlit Bay in morning, sunset and night light.</li>
        <li>Bonus words fill a jar for free hints, and letter, lighthouse and word reveals help when you’re stuck.</li>
        <li>A daily puzzle with streaks, streak freezes and a monthly calendar to catch up on days you missed.</li>
        <li>Harbor pieces and postcards to collect, Game Center achievements, and progress that follows you between devices with iCloud.</li>
      </ul>
      <h2>Help and policies</h2>
      <p>Questions or problems? Visit <Link href="/word-harbor/support">Word Harbor support</Link> or email <a href="mailto:contact@baylinedigital.com">contact@baylinedigital.com</a>. Read the <Link href="/word-harbor/privacy">privacy policy</Link> and <Link href="/word-harbor/terms">terms of use</Link>.</p>
      <p>Word Harbor is owned and operated by Bayline Digital Inc., Toronto, Ontario, Canada.</p>
    </AppDocPage>
  );
}
