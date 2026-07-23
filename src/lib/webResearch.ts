import { createServerFn } from "@tanstack/react-start";
import type { Brief } from "@/data/sampleBriefs";

// ---------------------------------------------------------------------------
// Real web research via Google's Gemini API with Search Grounding.
//
// Runs server-side only (createServerFn) so GEMINI_API_KEY never reaches the
// client bundle. Gemini's `google_search` tool does live web search, and the
// model synthesizes the result in the same call.
//
// Note: Gemini doesn't reliably support forcing a strict JSON response
// schema *together* with the google_search tool in one call, so instead we
// instruct the model very explicitly to return JSON only, and parse the text
// defensively (stripping markdown code fences etc.) rather than relying on
// API-level schema enforcement.
//
// Env: set GEMINI_API_KEY in .env (server-only, do NOT prefix with VITE_).
// Get a key at https://aistudio.google.com/app/apikey
// ---------------------------------------------------------------------------

const GEMINI_MODEL = "gemini-3.6-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

type ResearchedBrief = Omit<Brief, "slug" | "website" | "generatedAt">;

const SYSTEM_PROMPT = `You are a B2B sales research analyst working for Compound Law, a legal-tech company selling to founders and GTM/ops leaders at growth-stage startups.

Given a company name or website, use Google Search to research it and produce a prospect brief. Be specific and factual — cite real news, real people, real numbers where you find them. If you cannot verify something, say so explicitly in the relevant field and mark its confidence as "low" rather than inventing detail.

Every "confidence" field must honestly reflect how well-sourced that section is:
- "high": corroborated by multiple recent, credible sources
- "medium": found in one credible source or inferred from strong context
- "low": not found; you are giving a best-effort, clearly-flagged guess

Respond with ONLY a single JSON object — no markdown code fences, no prose before or after — matching exactly this shape:

{
  "company": string,
  "snapshot": {
    "description": string,
    "industry": string,
    "hq": string,
    "employees": string,
    "funding": string,
    "stage": string,
    "news": [{ "title": string, "source": string, "date": string }]
  },
  "signals": [{ "label": string, "confidence": "high"|"medium"|"low", "why": string }],
  "decisionMakers": [{ "name": string, "role": string, "why": string }],
  "opportunity": {
    "whyCompound": string,
    "priorities": string[],
    "entryPoint": string,
    "expansion": string[]
  },
  "outreach": {
    "opener": string,
    "angle": string,
    "talkingPoints": string[],
    "objections": [{ "objection": string, "response": string }],
    "nextStep": string
  },
  "buyingSignals": {
    "score": number,
    "whyNow": string,
    "increased": string[],
    "missing": string[]
  },
  "confidence": {
    "snapshot": "high"|"medium"|"low",
    "signals": "high"|"medium"|"low",
    "decisionMakers": "high"|"medium"|"low",
    "opportunity": "high"|"medium"|"low",
    "outreach": "high"|"medium"|"low",
    "buyingSignals": "high"|"medium"|"low"
  }
}`;

function extractJson(rawText: string): string {
  // Strip ```json ... ``` or ``` ... ``` fences if the model added them
  // despite instructions, and grab the outermost { ... } block.
  const fenced = rawText.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1] : rawText;
  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");
  if (start === -1 || end === -1 || end < start) return candidate.trim();
  return candidate.slice(start, end + 1);
}

export const researchCompany = createServerFn({ method: "POST" })
  .validator((input: string) => input)
  .handler(
    async ({
      data: input,
    }): Promise<{ ok: true; brief: ResearchedBrief } | { ok: false; reason: string }> => {
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return { ok: false, reason: "GEMINI_API_KEY is not set on the server." };
      }

      try {
        const response = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: `Research this company and build a prospect brief: ${input}` }],
              },
            ],
            systemInstruction: {
              parts: [{ text: SYSTEM_PROMPT }],
            },
            tools: [{ google_search: {} }],
          }),
        });

        if (!response.ok) {
          const errText = await response.text();
          return {
            ok: false,
            reason: `Gemini API error ${response.status}: ${errText.slice(0, 300)}`,
          };
        }

        const payload = await response.json();
        const rawText: string | undefined = payload?.candidates?.[0]?.content?.parts
          ?.map((p: { text?: string }) => p.text ?? "")
          .join("");

        if (!rawText) {
          return { ok: false, reason: "Gemini response had no text content." };
        }

        const parsed = JSON.parse(extractJson(rawText)) as ResearchedBrief;
        return { ok: true, brief: parsed };
      } catch (error) {
        return {
          ok: false,
          reason: error instanceof Error ? error.message : "Unknown research error.",
        };
      }
    },
  );

export function hasResearchKey(): boolean {
  return Boolean(process.env.GEMINI_API_KEY);
}

export const checkResearchStatus = createServerFn({ method: "GET" }).handler(async () => {
  return { connected: hasResearchKey() };
});
