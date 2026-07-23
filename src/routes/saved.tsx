import { createFileRoute, Link } from "@tanstack/react-router";
import { sampleBriefs } from "@/data/sampleBriefs";
import { Bookmark } from "lucide-react";

export const Route = createFileRoute("/saved")({
  head: () => ({
    meta: [
      { title: "Saved Companies — Compound" },
      { name: "description", content: "Prospects saved for follow-up." },
    ],
  }),
  component: Saved,
});

function Saved() {
  const saved = sampleBriefs.slice(0, 2);
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex items-center gap-2 mb-1">
        <Bookmark className="h-5 w-5 text-muted-foreground" />
        <h1 className="text-2xl font-semibold text-foreground">Saved Companies</h1>
      </div>
      <p className="text-sm text-muted-foreground mb-6">Prospects you're actively working.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {saved.map((b) => (
          <Link
            key={b.slug}
            to="/brief/$slug"
            params={{ slug: b.slug }}
            className="rounded-xl border border-border bg-card p-4 hover:border-foreground/20 transition-all"
          >
            <div className="text-sm font-medium text-foreground">{b.company}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{b.snapshot.industry}</div>
            <div className="mt-3 text-xs text-foreground line-clamp-2">{b.opportunity.entryPoint}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
