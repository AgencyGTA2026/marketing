import { requireStudioSession } from "@/lib/studio-auth";

export const metadata = { title: "Social Studio | Bayline Digital", robots: { index: false, follow: false } };

export default async function SocialLayout({ children }: { children: React.ReactNode }) {
  await requireStudioSession();
  return children;
}
