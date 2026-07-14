import { redirect } from "next/navigation";
import { getStudioSession } from "@/lib/studio-auth";
import { SignInForm } from "./sign-in-form";

export const metadata = { title: "Sign in | Bayline Digital Social Studio", robots: { index: false, follow: false } };

export default async function StudioSignInPage() {
  if (await getStudioSession()) redirect("/studio/social");
  return (
    <main className="studio-signin-shell">
      <section className="studio-signin-brand">
        <div className="studio-wordmark"><span>{"//"}</span> BAYLINE DIGITAL <b>/ SOCIAL</b></div>
        <div>
          <p className="studio-kicker">PRIVATE WORKSPACE · TORONTO</p>
          <h1>One considered post at a time.</h1>
          <p>Generate, review, approve, and publish Bayline’s social work from one quiet editorial desk.</p>
        </div>
        <small>Every post requires explicit approval.</small>
      </section>
      <section className="studio-signin-panel">
        <div>
          <p className="studio-kicker">OWNER ACCESS</p>
          <h2>Enter the studio.</h2>
          <p>No password. We’ll email a single-use link to the authorized owner address.</p>
          <SignInForm />
        </div>
      </section>
    </main>
  );
}
