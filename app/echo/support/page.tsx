import { AppDocPage } from "@/components/app-legal";
import { ECHO } from "@/lib/data/apps";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Echo Support | Bayline Digital",
  description: "Help with Echo: how to play, hints and skips, stars, the daily puzzle and streaks, restoring Remove Ads, progress, ads and privacy choices, and how to contact Bayline Digital.",
  path: "/echo/support",
});

export default function EchoSupportPage() {
  return (
    <AppDocPage app={ECHO} eyebrow="ECHO" title="Support">
      <p className="app-doc-lead">We’re happy to help. Email <a href="mailto:contact@baylinedigital.com?subject=Echo%20support">contact@baylinedigital.com</a> with your iPhone model, iOS version, what happened, and a screenshot if you can. We usually reply within one business day.</p>

      <h2>How to play</h2>
      <p>Swipe to move one tile. Your echo starts where you started and steps onto the tile you stood on a few moves ago; the number on it is how many moves behind it is, and the glowing tiles show where it goes next. Collect every spark to open the exit, then reach it. A door is open only while you or an echo stands on the plate of the same color. You can’t step onto your echo, let it step onto you, or swap places with it; a move that would do that is taken back.</p>

      <h2>Undo, hints and skipping</h2>
      <p>Undo and restart are free and unlimited. A hint shows your next three moves, and takes you back first if you’ve walked into a dead end. Hints are free in the first seven levels and cost a short video after that. If a level keeps beating you, the game offers to skip it for a video; a skipped level stays unsolved so you can come back for its stars.</p>

      <h2>Stars and styles</h2>
      <p>Any solution earns one star. Solving in the fewest moves earns three, and a few moves more earns two. Stars unlock new shapes, trails and board themes under Styles. Styles change only how the game looks.</p>

      <h2>Daily puzzle and streaks</h2>
      <p>The daily puzzle unlocks when you reach level 10. It’s the same for every player and changes at midnight in your time zone, getting harder from Monday to Sunday. Solving it on consecutive days builds a streak. If you miss a day, you can repair the streak with a video, once a week.</p>

      <h2>Restore Remove Ads</h2>
      <p>Open Settings and tap <strong>Restore purchases</strong>, signed in with the Apple Account that made the purchase. Remove Ads stops the ads between levels. Optional videos for hints, skips and streak repairs stay available.</p>

      <h2>Prices and refunds</h2>
      <p>The app shows the price from the App Store in your own currency. Apple handles payments and refunds. Request a refund at <a href="https://reportaproblem.apple.com">reportaproblem.apple.com</a>.</p>

      <h2>My progress</h2>
      <p>Your progress is saved on your iPhone only. Deleting the app deletes your progress, and it can’t be recovered. Remove Ads can always be restored.</p>

      <h2>Ads and tracking</h2>
      <p>The first seven levels have no ads. After that, optional videos give hints and skips, and an ad may appear between some levels unless you buy Remove Ads. You can change ad privacy choices in Settings when they apply to your region, and change tracking permission in iOS Settings → Privacy &amp; Security → Tracking. See the <a href="/echo/privacy">privacy policy</a> for details.</p>

      <h2>Reminders, sound and haptics</h2>
      <p>The daily reminder is off until you turn it on in Settings; it’s one notification a day at 6 pm, and none on a day you’ve already solved. Sound and haptics have their own switches in Settings. The game’s sound follows the silent switch and doesn’t interrupt your own music.</p>

      <h2>Contact</h2>
      <p>Bayline Digital Inc. · Toronto, Ontario, Canada · <a href="mailto:contact@baylinedigital.com">contact@baylinedigital.com</a> · +1 (613) 818-8550</p>
    </AppDocPage>
  );
}
