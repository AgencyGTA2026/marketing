import Link from "next/link";
import { AppDocPage } from "@/components/app-legal";
import { TILE_AND_THRONE } from "@/lib/data/apps";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Tile & Throne | Word duel game for iPhone",
  description: "Tile & Throne is a word duel game by Bayline Digital. Trace words on a grid of letter tiles, win 90-second duels, climb the weekly leagues and build your own empire.",
  path: "/tile-and-throne",
});

export default function TileAndThronePage() {
  return (
    <AppDocPage app={TILE_AND_THRONE} eyebrow="IPHONE GAME · BAYLINE DIGITAL INC." title="Tile & Throne">
      <p className="app-doc-lead">A word duel game for iPhone. Drag across a grid of letter tiles to spell words, score with letter values and bonus squares, and outscore your rival before the 90 seconds run out. Wins earn trophies for the weekly leagues and bricks for an empire of your own.</p>
      <h2>What’s inside</h2>
      <ul>
        <li>Fast 90-second duels on a 4×4 board, with a crown tile that doubles a word and moves every 20 seconds.</li>
        <li>Eight weekly leagues from Squire to Emperor, and a world leaderboard ranked by trophies.</li>
        <li>A Daily Board and an untimed Practice mode on a larger 5×5 board, for playing alone.</li>
        <li>An empire to build with the bricks you earn, and raids on rival kingdoms for extra loot.</li>
        <li>Power-ups that rotate the board, light up a long word, swap tiles or add time.</li>
      </ul>
      <h2>Who you play</h2>
      <p>Most rivals are computer players. When you’re signed in to Game Center, the leagues and the world leaderboard also show other players, and you duel one when someone in your league wants a duel at the same moment.</p>
      <h2>Help and policies</h2>
      <p>Questions or problems? Visit <Link href="/tile-and-throne/support">Tile &amp; Throne support</Link> or email <a href="mailto:contact@baylinedigital.com">contact@baylinedigital.com</a>. Read the <Link href="/tile-and-throne/privacy">privacy policy</Link> and <Link href="/tile-and-throne/terms">terms of use</Link>.</p>
      <p>Tile &amp; Throne is owned and operated by Bayline Digital Inc., Toronto, Ontario, Canada.</p>
    </AppDocPage>
  );
}
