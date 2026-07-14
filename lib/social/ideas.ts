import "server-only";
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";
import { AGENCY_CONTEXT } from "./constants";

const IdeaSchema = z.object({
  name: z.string().min(4).max(80),
  topic: z.string().min(8).max(160),
  keyMessage: z.string().min(20).max(500),
  cta: z.string().min(4).max(160),
  whyItWorks: z.string().min(15).max(220),
  pillar: z.enum(["Websites", "Conversion", "Automation", "Local SEO", "Operations", "Agency perspective"]),
});

const IdeasSchema = z.object({ ideas: z.array(IdeaSchema).length(4) });

export type SocialIdea = z.infer<typeof IdeaSchema>;

export async function generateSocialIdeas(history: string[], now = new Date()) {
  if (!process.env.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY is not configured");
  const response = await new OpenAI({ apiKey: process.env.OPENAI_API_KEY }).responses.parse({
    model: process.env.OPENAI_TEXT_MODEL || "gpt-5-mini",
    input: [
      {
        role: "system",
        content: `You are the senior content strategist for Bayline Digital. Generate four strong social post ideas that Bayline could credibly publish today.

${AGENCY_CONTEXT}

Uniqueness rules:
- Every idea must have a materially different subject, insight, and opening angle.
- Avoid generic listicles, broad "why your business needs a website" advice, trend summaries, and empty motivational copy.
- Prefer a sharp observation, useful diagnostic, overlooked decision, process insight, or concrete lesson an Ontario service-business owner can apply.
- Do not repeat or lightly rephrase anything in the recent-history list.
- Rotate across content pillars; use at least three different pillars in the set.
- Do not invent news, urgency, statistics, clients, results, or claims.
- The topic should be a complete creative direction, not just a two-word category.
- The key message should tell the post writer exactly what useful argument to make.
- Keep the CTA low-pressure and relevant to the idea.`,
      },
      {
        role: "user",
        content: `Current date: ${now.toISOString().slice(0, 10)}\nRecent and already-scheduled Bayline topics to avoid:\n${history.length ? history.slice(0, 40).map((item, index) => `${index + 1}. ${item}`).join("\n") : "None yet. Still make all four ideas distinct from one another."}`,
      },
    ],
    text: { format: zodTextFormat(IdeasSchema, "bayline_social_ideas") },
  });
  if (!response.output_parsed) throw new Error("The content model did not return social ideas");
  return response.output_parsed.ideas;
}
