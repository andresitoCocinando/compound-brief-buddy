import { createServerFn } from "@tanstack/react-start";
import type { Brief, Confidence } from "@/data/sampleBriefs";

// ---------------------------------------------------------------------------
// Real web research via Perplexity's Sonar API.
//
// Runs server-side only (createServerFn) so PERPLEXITY_API_KEY never reaches
// the client bundle. Perplexity does live web search + synthesis in a single
// call and can be constrained to a JSON schema, so we don't need a separate
// search step (Tavily/Firecrawl) + separate LLM step.
//
// Env: set PERPLEXITY_API_KEY in .env (server-only, do NOT prefix with VITE_).
// ---------------------------------------------------------------------------

const PERPLEXITY_URL = "https://api.perplexity.ai/chat/completions";

const CONFIDENCE_ENUM = ["high", "medium", "low"] as const;

// JSON schema for the parts of Brief that actually need research.
// slug / website / generatedAt are filled in by us, not the model.
const briefSchema = {
  type: "object",
  properties: {
    company: { type: "string" },
    snapshot: {
      type: "object",
      properties: {
        description: { type: "string" },
        industry: { type: "string" },
        hq: { type: "string" },
        employees: { type: "string" },
        funding: { type: "string" },
        stage: { type: "string" },
        news: {
          type: "array",
          items: {
            type: "object",
            properties: {
              title: { type: "string" },
              source: { type: "string" },
              date: { type: "string" },
            },
            required: ["title", "source", "date"],
          },
        },
      },
      required: ["description", "industry", "hq", "employees", "funding", "stage", "news"],
    },
    signals: {
      type: "array",
      items: {
        type: "object",
        properties: {
          label: { type: "string" },
          confidence: { type: "string", enum: CONFIDENCE_ENUM },
          why: { type: "string" },
        },
        required: ["label", "confidence", "why"],
      },
    },
    decisionMakers: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          role: { type: "string" },
          why: { type: "string" },
        },
        required: ["name", "role", "why"],
      },
    },
    opportunity: {
      type: "object",
      properties: {
        whyCompound: { type: "string" },
        priorities: { type: "array", items: { type: "string" } },
        entryPoint: { type: "string" },
        expansion: { type: "array", items: { type: "string" } },
      },
      required: ["whyCompound", "priorities", "entryPoint", "expansion"],
    },
    outreach: {
      type: "object",
      properties: {
        opener: { type: "string" },
        angle: { type: "string" },
        talkingPoints: { type: "array", items: { type: "string" } },
        objections: {
          type: "array",
          items: {
            type: "object",
            properties: { objection: { type: "string" }, response: { type: "string" } },
            required: ["objection", "response"],
          },
        },
        nextStep: { type: "string" },
      },
      required: ["opener", "angle", "talkingPoints", "objections", "nextStep"],
    },
    buyingSignals: {
      type: "object",
      properties: {
        score: { type: "number" },
        whyNow: { type: "string" },
        increased: { type: "array", items: { type: "string" } },
        missing: { type: "array", items: { type: "string" } },
      },
      required: ["score", "whyNow", "increased", "missing"],
    },
    confidence: {
      type: "object",
      properties: {
        snapshot: { type: "string", enum: CONFIDENCE_ENUM },
        signals: { type: "string", enum: CONFIDENCE_ENUM },
        decisionMakers: { type: "string", enum: CONFIDENCE_ENUM },
        opportunity: { type: "string", enum: CONFIDENCE_ENUM },
        outreach: { type: "string", enum: CONFIDENCE_ENUM },
        buyingSignals: { type: "string", enum: CONFIDENCE_ENUM },
      },
      required: [
        "snapshot",
        "signals",
        "decisionMakers",
        "opportunity",
        "outreach",
        "buyingSignals",
      ],
    },
  },
  required: [
    "company",
    "snapshot",
    "signals",
    "decisionMakers",
    "opportunity",
    "outreach",
    "buyingSignals",
    "confidence",
  ],
} as const;

type ResearchedBrief = Omit<Brief, "slug" | "website" | "generatedAt">;

const SYSTEM_PROMPT = `You are a B2B sales research analyst working for Compound Law, a legal-tech company selling to founders and GTM/ops leaders at growth-stage startups.

Given a company name or website, search the live web and produce a prospect brief. Be specific and factual — cite real news, real people, real numbers where you find them. If you cannot verify something, say so explicitly in the relevant field and mark its confidence as "low" rather than inventing detail.

Every "confidence" field must honestly reflect how well-sourced that section is:
- "high": corroborated by multiple recent, credible sources
- "medium": found in one credible source or inferred from strong context
- "low": not found; you are giving a best-effort, clearly-flagged guess

Output must match the given JSON schema exactly. No prose outside the JSON.`;

export const researchCompany = createServerFn({ method: "POST" })
  .validator((input: string) => input)
  .handler(
    async ({
      data: input,
    }): Promise<{ ok: true; brief: ResearchedBrief } | { ok: false; reason: string }> => {
      const apiKey = process.env.PERPLEXITY_API_KEY;

      if (!apiKey) {
        return { ok: false, reason: "PERPLEXITY_API_KEY is not set on the server." };
      }

      try {
        const response = await fetch(PERPLEXITY_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "sonar-pro",
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              {
                role: "user",
                content: `Research this company and build a prospect brief: ${input}`,
              },
            ],
            response_format: {
              type: "json_schema",
              json_schema: { schema: briefSchema },
            },
          }),
        });

        if (!response.ok) {
          const errText = await response.text();
          return {
            ok: false,
            reason: `Perplexity API error ${response.status}: ${errText.slice(0, 300)}`,
          };
        }

        const payload = await response.json();
        const content = payload?.choices?.[0]?.message?.content;

        if (!content) {
          return { ok: false, reason: "Perplexity response had no content." };
        }

        const parsed = JSON.parse(content) as ResearchedBrief;
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
  return Boolean(process.env.PERPLEXITY_API_KEY);
}

export const checkResearchStatus = createServerFn({ method: "GET" }).handler(async () => {
  return { connected: hasResearchKey() };
});
