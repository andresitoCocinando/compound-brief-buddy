import { sampleBriefs, slugify, type Brief } from "@/data/sampleBriefs";

// Placeholder API — swap for real AI (OpenAI, Perplexity, Firecrawl, Tavily) later.
export async function generateBrief(input: string): Promise<Brief> {
  const slug = slugify(input);
  const match = sampleBriefs.find((b) => b.slug === slug || b.company.toLowerCase() === input.toLowerCase());

  // Simulate research latency
  await new Promise((r) => setTimeout(r, 1800));

  if (match) return match;

  // Generic fallback brief based on input
  const name = input.replace(/https?:\/\//, "").replace(/^www\./, "").split(/[./]/)[0];
  const pretty = name.charAt(0).toUpperCase() + name.slice(1);
  return {
    ...sampleBriefs[0],
    slug,
    company: pretty,
    website: input,
    generatedAt: "just now",
    snapshot: {
      ...sampleBriefs[0].snapshot,
      description: `${pretty} is a growth-stage company. Live AI research is not yet connected — this is a mock brief scaffolded from the Peec AI template so you can preview the UI.`,
    },
  };
}
