import Link from "next/link";
import { AppDocPage } from "@/components/app-legal";
import { SIP_AND_SORT } from "@/lib/data/apps";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Sip & Sort | Cozy café sort puzzle for iPhone",
  description: "Sip & Sort is a cozy café sort puzzle by Bayline Digital. Pour ingredient layers into jars, serve customers, and decorate your café.",
  path: "/sip-and-sort",
});

export default function SipAndSortPage() {
  return (
    <AppDocPage app={SIP_AND_SORT} eyebrow="IPHONE GAME · BAYLINE DIGITAL INC." title="Sip & Sort">
      <p className="app-doc-lead">A cozy café sort puzzle for iPhone. Pour ingredient layers between jars until each jar holds a single flavor, serve your customers, and spend the stars you earn decorating your café.</p>
      <h2>What’s inside</h2>
      <ul>
        <li>Hundreds of handcrafted and generated puzzles, each checked to be solvable.</li>
        <li>New twists as you play: mystery layers, frozen jars, customer orders, cups and carafes, syrup pumps, and lidded jars.</li>
        <li>Customers and regulars who tip for their favorite drinks and visit your café as friendships grow.</li>
        <li>Five rooms to decorate and upgrade, a daily puzzle with streaks, and seasonal events.</li>
        <li>Progress saved to your iCloud so it follows you to a new iPhone, plus Game Center leaderboards.</li>
      </ul>
      <h2>Help and policies</h2>
      <p>Questions or problems? Visit <Link href="/sip-and-sort/support">Sip & Sort support</Link> or email <a href="mailto:contact@baylinedigital.com">contact@baylinedigital.com</a>. Read the <Link href="/sip-and-sort/privacy">privacy policy</Link> and <Link href="/sip-and-sort/terms">terms of use</Link>.</p>
      <p>Sip & Sort is owned and operated by Bayline Digital Inc., Toronto, Ontario, Canada.</p>
    </AppDocPage>
  );
}
