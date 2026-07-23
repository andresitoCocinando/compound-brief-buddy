import { createFileRoute, Link } from "@tanstack/react-router";
import { sampleBriefs } from "@/data/sampleBriefs";
import { Clock } from "lucide-react";

export const Route = createFileRoute("/recent")({
  head: () => ({
    meta: [
      { title: "Recent Briefs — Compound" },
      { name: "description", content: "Recently generated prospect briefs." },
    ],
  }),
  component: Recent,
});

function Recent() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex items-center gap-2 mb-1">
        <Clock className="h-5 w-5 text-muted-foreground" />
        <h1 className="text-2xl font-semibold text-foreground">Recent Briefs</h1>
      </div>
      <p className="text-sm text-muted-foreground mb-6">Everything the team has researched this week.</p>
      <div className="rounded-xl border border-border bg-card divide-y divide-border">
        {sampleBriefs.map((b) => (
          <Link
            key={b.slug}
            to="/brief/$slug"
            params={{ slug: b.slug }}
            className="flex items-center justify-between p-4 hover:bg-muted/40 transition-colors first:rounded-t-xl last:rounded-b-xl"
          >
            <div>
              <div className="text-sm font-medium text-foreground">{b.company}</div>
              <div className="text-xs text-muted-foreground">{b.snapshot.industry} · {b.snapshot.hq}</div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground bg-muted rounded-full px-2 py-0.5">
                score {b.buyingSignals.score}
              </span>
              <span className="text-xs text-muted-foreground">{b.generatedAt}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
