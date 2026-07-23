import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { BriefReport } from "@/components/BriefReport";
import { generateBrief } from "@/lib/generateBrief";
import type { Brief } from "@/data/sampleBriefs";

export const Route = createFileRoute("/brief/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug} — Compound Prospect Brief` },
      { name: "description", content: `AI-generated sales brief for ${params.slug} by Compound Law.` },
      { property: "og:title", content: `${params.slug} — Compound Prospect Brief` },
      { property: "og:description", content: `AI-generated sales brief for ${params.slug}.` },
    ],
  }),
  component: BriefPage,
});

const stages = [
  "Scanning company footprint…",
  "Reading recent news & filings…",
  "Detecting legal pain signals…",
  "Mapping decision makers…",
  "Drafting Compound outreach angle…",
];

function BriefPage() {
  const { slug } = Route.useParams();
  const [brief, setBrief] = useState<Brief | null>(null);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    setBrief(null);
    setStage(0);
    const interval = setInterval(() => {
      setStage((s) => Math.min(s + 1, stages.length - 1));
    }, 400);

    generateBrief(slug).then((b) => {
      clearInterval(interval);
      setBrief(b);
    });

    return () => clearInterval(interval);
  }, [slug]);

  if (!brief) {
    return (
      <div className="min-h-[80vh] grid place-items-center px-6">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto h-12 w-12 rounded-xl bg-foreground text-background grid place-items-center mb-5">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">Researching {slug}</h2>
          <p className="text-sm text-muted-foreground mt-1">This usually takes a few seconds.</p>
          <div className="mt-6 space-y-2 text-left">
            {stages.map((s, i) => (
              <div
                key={i}
                className={`flex items-center gap-2 text-sm transition-opacity duration-300 ${
                  i <= stage ? "opacity-100" : "opacity-30"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    i < stage ? "bg-emerald-500" : i === stage ? "bg-foreground animate-pulse" : "bg-muted-foreground/40"
                  }`}
                />
                <span className={i <= stage ? "text-foreground" : "text-muted-foreground"}>{s}</span>
              </div>
            ))}
          </div>
          <Link to="/" className="mt-8 inline-block text-xs text-muted-foreground hover:text-foreground">
            ← Cancel and search again
          </Link>
        </div>
      </div>
    );
  }

  return <BriefReport brief={brief} />;
}
