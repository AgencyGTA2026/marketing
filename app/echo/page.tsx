import Link from "next/link";
import { AppDocPage } from "@/components/app-legal";
import { ECHO } from "@/lib/data/apps";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Echo | Grid puzzle game for iPhone",
  description: "Echo is a grid puzzle game by Bayline Digital. An echo of you walks your exact path a few steps behind. You need it to hold doors open, and you must never touch it.",
  path: "/echo",
});

export default function EchoPage() {
  return (
    <AppDocPage app={ECHO} eyebrow="IPHONE GAME · BAYLINE DIGITAL INC." title="Echo">
      <p className="app-doc-lead">A grid puzzle game for iPhone. An echo of you walks your exact path a few steps behind. You need it to stand on plates and hold doors open for you, and you must never touch it. Every swipe moves both of you.</p>
      <h2>What’s inside</h2>
      <ul>
        <li>150 levels in six chapters. Each chapter adds one new idea: plates and doors, waiting, crumbling tiles, a delay that changes, a second echo, and a mirror echo.</li>
        <li>A daily puzzle that is the same for everyone, with a streak to keep and a result card to share.</li>
        <li>Free, unlimited undo and restart. A wrong step is taken back, with no “game over” screen.</li>
        <li>Up to three stars a level for solving it in few moves, and stars unlock new shapes, trails and board themes.</li>
        <li>One-thumb swipes in portrait, and it plays offline.</li>
      </ul>
      <h2>Ads</h2>
      <p>Echo is free. The first seven levels have no ads. After that, optional videos give a hint or skip a level, and an ad appears between some levels unless you buy Remove Ads.</p>
      <h2>Help and policies</h2>
      <p>Questions or problems? Visit <Link href="/echo/support">Echo support</Link> or email <a href="mailto:contact@baylinedigital.com">contact@baylinedigital.com</a>. Read the <Link href="/echo/privacy">privacy policy</Link> and <Link href="/echo/terms">terms of use</Link>.</p>
      <p>Echo is owned and operated by Bayline Digital Inc., Toronto, Ontario, Canada.</p>
    </AppDocPage>
  );
}
