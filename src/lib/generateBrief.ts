import { sampleBriefs, slugify, type Brief } from "@/data/sampleBriefs";
import { researchCompany } from "@/lib/webResearch";

function buildMockBrief(input: string, slug: string, reason?: string): Brief {
  const match = sampleBriefs.find(
    (b) => b.slug === slug || b.company.toLowerCase() === input.toLowerCase(),
  );
  if (match) return match;

  const name = input
    .replace(/https?:\/\//, "")
    .replace(/^www\./, "")
    .split(/[./]/)[0];
  const pretty = name.charAt(0).toUpperCase() + name.slice(1);
  return {
    ...sampleBriefs[0],
    slug,
    company: pretty,
    website: input,
    generatedAt: "just now",
    snapshot: {
      ...sampleBriefs[0].snapshot,
      description: reason
        ? `${pretty} — live research unavailable (${reason}). This is a mock brief scaffolded from the Peec AI template so you can preview the UI.`
        : `${pretty} is a growth-stage company. Live AI research is not yet connected — this is a mock brief scaffolded from the Peec AI template so you can preview the UI.`,
    },
  };
}

export async function generateBrief(input: string): Promise<Brief> {
  const slug = slugify(input);
  const result = await researchCompany({ data: input });

  if (result.ok) {
    return {
      ...result.brief,
      slug,
      website: input,
      generatedAt: "just now",
    };
  }

  // No key set, or the live call failed — fall back to a clearly-labeled mock
  // instead of breaking the UI. Check the server console for `result.reason`.
  console.warn(`[generateBrief] falling back to mock brief for "${input}": ${result.reason}`);
  return buildMockBrief(input, slug, result.reason);
}
