"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(event: FormEvent) {
    event.preventDefault();
    setState("sending");
    const response = await fetch("/api/studio/magic-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setState(response.ok ? "sent" : "error");
  }

  if (state === "sent") return (
    <div className="studio-signin-success" role="status">
      <Check size={18} />
      <div><strong>Check your inbox.</strong><p>If that address is authorized, a one-time link is on its way.</p></div>
    </div>
  );

  return (
    <form onSubmit={submit} className="studio-signin-form">
      <label htmlFor="email">Owner email</label>
      <input id="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@baylinedigital.com" />
      <button type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : "Send one-time link"}<ArrowRight size={16} />
      </button>
      {state === "error" && <p className="studio-auth-error">The link could not be sent. Check the server configuration and try again.</p>}
    </form>
  );
}
